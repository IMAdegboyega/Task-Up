import { connectToDatabase } from "@/lib/mongodb"; // adjust the path
import User from "@/lib/models/user"; // your Mongoose user model
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("Authorization");

  if (!authHeader) {
    return NextResponse.json({ message: "No token provided" }, { status: 403 });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };

    await connectToDatabase();
    const user = await User.findById(decoded.id).select("-password"); // hide password

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (err) {
    return NextResponse.json({ message: "Invalid token" }, { status: 403 });
  }
}
