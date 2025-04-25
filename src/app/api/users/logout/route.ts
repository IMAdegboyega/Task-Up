// /api/users/logout/route.ts

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // Get refreshToken if needed (e.g., from body or cookies)
  const { refreshToken } = await req.json();

  // Optional: remove refresh token from DB or blacklist it
  // e.g., await db.collection("tokens").deleteOne({ token: refreshToken });

  return NextResponse.json({ message: "Logged out successfully" });
}
