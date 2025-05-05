// /app/api/projects/route.ts

import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb"; // connects to your MongoDB
import Project from "@/lib/models/projects"; // your Project mongoose model

// Handle GET requests (fetch all projects)
export async function GET(req: NextRequest) {
  try {
    // Connect to MongoDB
    await connectToDatabase();

    // Find all projects in the database
    const projects = await Project.find().sort({ createdAt: -1 }); // newest first

    // Return the projects as JSON
    return NextResponse.json({projects});
  } catch (error) {
    console.error("❌ Error fetching projects:", error);
    return NextResponse.json(
      { message: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}
