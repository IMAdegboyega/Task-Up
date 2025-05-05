import type { NextApiRequest, NextApiResponse } from 'next';
import {connectToDatabase} from '@/lib/mongodb';
import Message from '@/lib/models/message';
import { verifyToken } from '@/lib/authMiddleware';

export const config = {
  api: {
    bodyParser: true,
    externalResolver: true, // prevents "API resolved without sending" warning
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  try {
    const user = verifyToken(req); // Sender info from JWT
    const senderId = user.id;
    const { recipientId, content } = req.body;

    if (!recipientId || !content) {
      return res.status(400).json({ error: 'Missing recipient or content' });
    }

    await connectToDatabase();

    const newMessage = await Message.create({
      senderId: user.id,
      recipientId,
      content,
    });

    const io = (global as any).io;
    if (io) {
      const room = [senderId, recipientId].sort().join('-');
      io.to(room).emit('receiveMessage', Message);
    }


    return res.status(201).json(newMessage);
  } catch (err: any) {
    return res.status(401).json({ error: err.message });
  }
}
