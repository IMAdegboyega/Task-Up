import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Message from '@/lib/models/message';
import { verifyToken } from '@/lib/authMiddleware';

/**
 * GET /api/messages
 * Fetches all conversations for the logged-in user with the most recent message in each.
 */
export async function GET(req: NextRequest) {
  try {
    // 🔐 Authenticate the user using the JWT token
    const user = verifyToken(req);

    // 🧩 Connect to MongoDB
    await connectToDatabase();

    // 📨 Find all messages where the user is either sender or recipient, sorted by recent update
    const messages = await Message.find({
      $or: [{ senderId: user.id }, { recipientId: user.id }],
    }).sort({ updatedAt: -1 });

    // 🗂️ Group messages into conversations based on the other user's ID
    const conversationsMap = new Map<string, {
      userId: string;
      lastMessage: string;
      lastTimestamp: Date;
    }>();

    messages.forEach((msg) => {
      const otherUserId = msg.senderId === user.id ? msg.recipientId : msg.senderId;

      // 🧠 Keep only the latest message per conversation
      if (!conversationsMap.has(otherUserId)) {
        conversationsMap.set(otherUserId, {
          userId: otherUserId,
          lastMessage: msg.content,
          lastTimestamp: msg.updatedAt,
        });
      }
    });

    const conversations = Array.from(conversationsMap.values());

    // ✅ Return all grouped conversations
    return NextResponse.json({ conversations }, { status: 200 });
  } catch (err: any) {
    // ❌ Return error message if anything goes wrong
    return NextResponse.json({ error: err.message }, { status: 401 });
  }
}
