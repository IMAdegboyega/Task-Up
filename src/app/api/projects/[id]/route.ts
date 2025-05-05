import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Project from "@/lib/models/projects";

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();

    if (!params?.id) {
      return NextResponse.json({ error: "Project ID is required" }, { status: 400 });
    }

    const deletedProject = await Project.findByIdAndDelete(params.id);

    if (!deletedProject) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Project deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("❌ Error deleting project:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
