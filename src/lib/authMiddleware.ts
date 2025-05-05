import jwt from 'jsonwebtoken';
import { NextApiRequest } from 'next';

interface DecodedToken {
  id: string;
  email?: string;
  iat: number;
  exp: number;
}

export function verifyToken(req: NextApiRequest): DecodedToken {
  const authHeader = req.headers.authorization;
  if (!authHeader) throw new Error('No token provided');

  const token = authHeader.split(' ')[1]; // Format: "Bearer <token>"
  if (!token) throw new Error('Invalid authorization header');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
    return decoded;
  } catch (err) {
    throw new Error('Invalid or expired token');
  }
}
