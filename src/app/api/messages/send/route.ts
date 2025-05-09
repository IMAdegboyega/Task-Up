import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Message from '@/lib/models/message';
import { verifyToken } from '@/lib/authMiddleware';

/**
 * POST /api/messages/send
 * Sends a new message from the authenticated user to a recipient.
 */
export async function POST(req: NextRequest) {
  try {
    // 🔐 Authenticate user and extract ID from JWT
    const user = verifyToken(req);
    const senderId = user.id;

    // 🧾 Parse request body
    const { recipientId, content } = await req.json();

    if (!recipientId || !content || typeof recipientId !== 'string' || typeof content !== 'string') {
      return NextResponse.json({ error: 'Missing or invalid recipient or content' }, { status: 400 });
    }

    // 📦 Connect to MongoDB
    await connectToDatabase();

    // 📨 Save new message to DB
    const newMessage = await Message.create({
      senderId,
      recipientId,
      content,
    });

    // 📡 Emit socket event to the shared room (if socket server is running)
    const io = (globalThis as any).io;
    if (io) {
      const room = [senderId, recipientId].sort().join('-');
      io.to(room).emit('receiveMessage', newMessage);
    }

    // ✅ Respond with created message
    return NextResponse.json(newMessage, { status: 201 });
  } catch (err: any) {
    // ❌ Token error or database issue
    return NextResponse.json({ error: err.message }, { status: 401 });
  }
}
