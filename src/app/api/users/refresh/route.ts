import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    const { refreshToken } = await req.json();

    // 🔐 Validate input
    if (!refreshToken) {
      return NextResponse.json(
        { message: "Missing refresh token" },
        { status: 400 }
      );
    }

    // ✅ Verify the refresh token
    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET!
    ) as { id: string };

    // ♻️ Generate a new access token
    const accessToken = jwt.sign(
      { id: decoded.id },
      process.env.JWT_SECRET!,
      { expiresIn: "15m" }
    );

    return NextResponse.json({ accessToken });
  } catch (err: any) {
    console.error("❌ Refresh error:", err.message);
    return NextResponse.json(
      { message: "Invalid or expired refresh token" },
      { status: 403 }
    );
  }
}
