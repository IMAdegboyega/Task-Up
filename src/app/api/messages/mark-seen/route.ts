import type { NextApiRequest, NextApiResponse } from 'next';
import {connectToDatabase} from '@/lib/mongodb';
import Message from '@/lib/models/message';
import { verifyToken } from '@/lib/authMiddleware';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PATCH') return res.status(405).end();

  try {
    const user = verifyToken(req);
    const { conversationWithId } = req.body;

    if (!conversationWithId) {
      return res.status(400).json({ error: 'conversationWithId is required' });
    }

    await connectToDatabase();

    await Message.updateMany(
      { senderId: conversationWithId, recipientId: user.id, seen: false },
      { $set: { seen: true } }
    );

    return res.status(200).json({ message: 'Messages marked as seen' });
  } catch (err: any) {
    return res.status(401).json({ error: err.message });
  }
}
