import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req: Request) {
  const token = req.headers.get("cookie")?.split("token=")[1]?.split(";")[0];

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET!);
    return NextResponse.next();
  } catch (error) {
    return NextResponse.json({ message: "Invalid token" }, { status: 403 });
  }
}

// Apply middleware to protected routes
export const config = {
  matcher: ["/api/protected-route"], // Adjust this based on your needs
};
