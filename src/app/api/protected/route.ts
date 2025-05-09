import { connectToDatabase } from "@/lib/mongodb"; // Connects to MongoDB
import User from "@/lib/models/user"; // Mongoose User model
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/user
 * Retrieves the authenticated user's information using JWT from the Authorization header.
 */
export async function GET(req: NextRequest) {
  // 🔐 Extract the Authorization header
  const authHeader = req.headers.get("Authorization");

  if (!authHeader) {
    return NextResponse.json({ message: "No token provided" }, { status: 403 });
  }

  // 🪙 Extract token from "Bearer <token>"
  const token = authHeader.split(" ")[1];

  try {
    // ✅ Verify the JWT and decode the payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };

    // 🔌 Connect to MongoDB
    await connectToDatabase();

    // 👤 Find user by ID and exclude password from result
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // ✅ Return user data
    return NextResponse.json({ user });
  } catch (err) {
    // ❌ Handle token errors
    return NextResponse.json({ message: "Invalid token" }, { status: 403 });
  }
}
