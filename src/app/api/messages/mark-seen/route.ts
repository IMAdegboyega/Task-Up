import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Message from '@/lib/models/message';
import { verifyToken } from '@/lib/authMiddleware';

/**
 * PATCH /api/messages/seen
 * Marks all messages from a specific conversation partner as seen.
 */
export async function PATCH(req: NextRequest) {
  try {
    // 🔐 Verify and extract the user from the JWT token
    const user = verifyToken(req);

    // 🧾 Parse the request body (must be called on NextRequest)
    const body = await req.json();
    const { conversationWithId } = body;

    if (!conversationWithId || typeof conversationWithId !== 'string') {
      return NextResponse.json({ error: 'conversationWithId is required' }, { status: 400 });
    }

    // 🧩 Connect to MongoDB
    await connectToDatabase();

    // ✅ Mark all unseen messages from the other user as seen
    await Message.updateMany(
      { senderId: conversationWithId, recipientId: user.id, seen: false },
      { $set: { seen: true } }
    );

    return NextResponse.json({ message: 'Messages marked as seen' }, { status: 200 });
  } catch (err: any) {
    // ❌ Handle token errors or database issues
    return NextResponse.json({ error: err.message }, { status: 401 });
  }
}
