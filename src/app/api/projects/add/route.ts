import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Project from "@/lib/models/projects";

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const body = await req.json();

    console.log("📦 Incoming project body:", body);

    const newProject = await Project.create(body);

    return NextResponse.json({ success: true, project: newProject }, { status: 201 });
  } catch (err) {
    console.error("❌ Error creating project:", err);
    return NextResponse.json({ success: false, message: "Failed to create project" }, { status: 500 });
  }
}
