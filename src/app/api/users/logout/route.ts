import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/users/logout
 * Handles user logout, optionally removing refresh token from client/database.
 */
export async function POST(req: NextRequest) {
  try {
    // 🧾 Get refresh token from the request body (if used)
    const { refreshToken } = await req.json();

    // 🔒 Optional: invalidate or delete refresh token from DB
    // Example:
    // await RefreshTokenModel.deleteOne({ token: refreshToken });

    // 🍪 Optional: clear cookies if you're using HttpOnly cookies
    // const response = NextResponse.json({ message: "Logged out successfully" });
    // response.cookies.set("accessToken", "", { maxAge: 0 });
    // response.cookies.set("refreshToken", "", { maxAge: 0 });
    // return response;

    return NextResponse.json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json({ message: "Logout failed" }, { status: 500 });
  }
}
