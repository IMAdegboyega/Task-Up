import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/lib/models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    await connectToDatabase();
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 403 });
    }

    // Generate access token (short-lived)
    const accessToken = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    ); 

    // Generate refresh token (longer-lived)
    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.REFRESH_TOKEN_SECRET!,
      { expiresIn: "7d" }
    );

    return NextResponse.json({
      message: "Sign-In successful",
      accessToken,
      refreshToken
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}
