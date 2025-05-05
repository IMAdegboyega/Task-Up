import type { NextApiRequest, NextApiResponse } from 'next';
import {connectToDatabase} from '@/lib/mongodb';
import Message from '@/lib/models/message';
import { verifyToken } from '@/lib/authMiddleware';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).end();

  try {
    const user = verifyToken(req);
    await connectToDatabase();

    // Find all messages involving the user
    const messages = await Message.find({
      $or: [{ senderId: user.id }, { recipientId: user.id }],
    }).sort({ updatedAt: -1 });

    const conversationsMap = new Map<string, any>();

    messages.forEach((msg) => {
      const otherUserId = msg.senderId === user.id ? msg.recipientId : msg.senderId;
      if (!conversationsMap.has(otherUserId)) {
        conversationsMap.set(otherUserId, {
          userId: otherUserId,
          lastMessage: msg.content,
          lastTimestamp: msg.updatedAt,
        });
      }
    });

    const conversations = Array.from(conversationsMap.values());

    return res.status(200).json({ conversations });
  } catch (err: any) {
    return res.status(401).json({ error: err.message });
  }
}
