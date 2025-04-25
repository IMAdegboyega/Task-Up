import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb"; // Update this to your actual path
import Project from "@/lib/models/projects"; // Make sure this model exists and points to your projects collection

export async function GET() {
  try {
    await connectToDatabase();

    const incompleteProjects = await Project.find({ status: { $ne: "completed" } });

    return NextResponse.json({ projects: incompleteProjects });
  } catch (err) {
    console.error("Error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
