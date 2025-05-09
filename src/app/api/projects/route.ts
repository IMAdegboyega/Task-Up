import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb"; // Function to connect to MongoDB
import Project from "@/lib/models/projects"; // Mongoose model for projects

/**
 * GET /api/projects
 * Fetches all projects from the database, sorted by creation date (newest first).
 */
export async function GET(req: NextRequest) {
  try {
    // 🔌 Establish MongoDB connection
    await connectToDatabase();

    // 📦 Retrieve all projects, sorted by most recent
    const projects = await Project.find().sort({ createdAt: -1 });

    // ✅ Return the list of projects in JSON format
    return NextResponse.json({ projects });
  } catch (error) {
    console.error("❌ Error fetching projects:", error);

    // ❌ Return error if something goes wrong
    return NextResponse.json(
      { message: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}
