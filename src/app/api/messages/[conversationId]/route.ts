import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Message from '@/lib/models/message';
import { verifyToken } from '@/lib/authMiddleware';

/**
 * Handles GET requests to fetch messages for a specific conversation.
 * URL format: /api/messages/{conversationId}?limit=20&skip=0
 */
export async function GET(req: NextRequest, { params }: { params: { conversationId: string } }) {
  try {
    // Verify the JWT token from the request headers (usually from cookies or Authorization header)
    const user = verifyToken(req);

    // Extract the conversation ID from the dynamic route
    const { conversationId } = params;

    // Parse pagination query parameters (`limit` and `skip`) from the URL
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get('limit') || '20', 10); // Default: 20 messages
    const skip = parseInt(searchParams.get('skip') || '0', 10);     // Default: skip 0

    // Validate the format of conversationId
    if (typeof conversationId !== 'string' || !conversationId.includes('-')) {
      return NextResponse.json({ error: 'Invalid conversation ID format.' }, { status: 400 });
    }

    // Split conversationId into two user IDs (e.g., "user1-user2")
    const [user1, user2] = conversationId.split('-');

    // Ensure that the logged-in user is a participant in the conversation
    if (user.id !== user1 && user.id !== user2) {
      return NextResponse.json({ error: 'Unauthorized access to this conversation.' }, { status: 403 });
    }

    // Connect to MongoDB (make sure this is only called once globally in your app)
    await connectToDatabase();

    // Fetch messages where sender and recipient match the conversation pair
    const messages = await Message.find({
      $or: [
        { senderId: user1, recipientId: user2 },
        { senderId: user2, recipientId: user1 },
      ],
    })
      .sort({ timestamp: 1 }) // Sort by oldest first
      .skip(skip)             // Skip messages (for pagination)
      .limit(limit);          // Limit the number of returned messages

    // Return the messages as JSON
    return NextResponse.json({ messages }, { status: 200 });

  } catch (err: any) {
    // Handle unexpected errors, such as token verification failure or DB issues
    return NextResponse.json({ error: err.message || 'Something went wrong.' }, { status: 401 });
  }
}
