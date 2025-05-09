import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/lib/models/user";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    // 📥 Parse JSON body
    const { name, email, password } = await req.json();

    // 🔍 Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Missing name, email, or password" },
        { status: 400 }
      );
    }

    // 🧠 Connect to DB
    await connectToDatabase();

    // 🔎 Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      );
    }

    // 🔐 Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 🆕 Create new user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // ✅ Respond with user info (without password)
    const userWithoutPassword = {
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
    };

    return NextResponse.json(
      { message: "User created successfully", user: userWithoutPassword },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("❌ Signup error:", error);
    return NextResponse.json(
      { message: "Something went wrong", error: error.message },
      { status: 500 }
    );
  }
}
