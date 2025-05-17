// /app/api/search/route.ts
import { NextResponse } from "next/server";
import {connectToDatabase} from "@/lib/mongodb";
import Project from "@/lib/models/projects";
import Message from "@/lib/models/message";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");

  if (!query) return NextResponse.json({ projects: [], messages: [] });

  await connectToDatabase();

  const regex = new RegExp(query, "i"); // case-insensitive

  const projects = await Project.find({
    $or: [{ name: regex }, { description: regex }, { createdBy: regex }],
  });

  const messages = await Message.find({
    $or: [{ sender: regex }, { content: regex }],
  });

  return NextResponse.json({ projects, messages });
}
