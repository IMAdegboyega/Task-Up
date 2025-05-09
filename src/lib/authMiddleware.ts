import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!; // Make sure this is defined in your env

interface DecodedUser {
  id: string;
  email?: string;
  iat?: number;
  exp?: number;
}

/**
 * Extracts and verifies JWT from the request (App Router compatible)
 */
export function verifyToken(req: NextRequest): DecodedUser {
  // Try to get the token from cookies
  const token = req.cookies.get('token')?.value
    // Or from Authorization header: "Bearer <token>"
    || req.headers.get('authorization')?.split(' ')[1];

  if (!token) {
    throw new Error('No token provided');
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as DecodedUser;
    return decoded;
  } catch (err) {
    throw new Error('Invalid or expired token');
  }
}
