import { connectToDatabase } from "@/lib/mongodb";
import Project from "@/lib/models/projects";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await connectToDatabase();
  
  try {
    const { title, description, status, ownerId } = await req.json();

    const project = await Project.create({
      title,
      description,
      status: status || "incomplete",
      ownerId,
    });

    return NextResponse.json({ success: true, project }, { status: 201 });
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json({ success: false, message: "Project creation failed." }, { status: 500 });
  }
}
