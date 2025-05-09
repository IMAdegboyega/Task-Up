import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Message from '@/lib/models/message';
import { verifyToken } from '@/lib/authMiddleware';

// Define the expected context type for a dynamic segment like [conversationId]
interface Context {
  params: {
    conversationId: string;
  };
}

/**
 * Handles GET requests to fetch messages for a specific conversation.
 * URL format: /api/messages/{conversationId}?limit=20&skip=0
 */
export async function GET(req: NextRequest, context: Context) {
  try {
    const user = verifyToken(req);
    const { conversationId } = context.params;

    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get('limit') || '20', 10);
    const skip = parseInt(searchParams.get('skip') || '0', 10);

    if (typeof conversationId !== 'string' || !conversationId.includes('-')) {
      return NextResponse.json({ error: 'Invalid conversation ID format.' }, { status: 400 });
    }

    const [user1, user2] = conversationId.split('-');

    if (user.id !== user1 && user.id !== user2) {
      return NextResponse.json({ error: 'Unauthorized access to this conversation.' }, { status: 403 });
    }

    await connectToDatabase();

    const messages = await Message.find({
      $or: [
        { senderId: user1, recipientId: user2 },
        { senderId: user2, recipientId: user1 },
      ],
    })
      .sort({ timestamp: 1 })
      .skip(skip)
      .limit(limit);

    return NextResponse.json({ messages }, { status: 200 });

  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Something went wrong.' }, { status: 401 });
  }
}
