import type { NextApiRequest, NextApiResponse } from 'next';
import {connectToDatabase} from '@/lib/mongodb';
import Message from '@/lib/models/message';
import { verifyToken } from '@/lib/authMiddleware';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).end();

  try {
    const user = verifyToken(req);
    const { conversationId } = req.query;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = parseInt(req.query.skip as string) || 0;

    if (typeof conversationId !== 'string') {
      return res.status(400).json({ error: 'Invalid conversation ID' });
    }

    const [user1, user2] = conversationId.split('-');
    if (user.id !== user1 && user.id !== user2) {
      return res.status(403).json({ error: 'Unauthorized access' });
    }

    await connectToDatabase();

    const messages = await Message.find({
      $or: [
        { senderId: user1, recipientId: user2 },
        { senderId: user2, recipientId: user1 },
      ],
    }).sort({ timestamp: 1 }) .skip(skip) .limit(limit);

    return res.status(200).json({ messages });
  } catch (err: any) {
    return res.status(401).json({ error: err.message });
  }
}
