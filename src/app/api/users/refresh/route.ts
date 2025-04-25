import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    const { refreshToken } = await req.json(); // ✅ declare this first

    if (!refreshToken) {
      return NextResponse.json({ message: "Missing refresh token" }, { status: 400 });
    }

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!); // ✅ now safe to use

    const accessToken = jwt.sign(
      { id: (decoded as any).id },
      process.env.JWT_SECRET!,
      { expiresIn: "15m" }
    );

    return NextResponse.json({ accessToken });
  } catch (err) {
    return NextResponse.json({ message: "Invalid refresh token" }, { status: 403 });
  }
}
