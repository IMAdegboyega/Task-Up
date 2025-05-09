import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Project from '@/lib/models/projects';

/**
 * POST /api/projects
 * Creates a new project in the database.
 */
export async function POST(req: NextRequest) {
  try {
    // 🔌 Connect to MongoDB
    await connectToDatabase();

    // 🧾 Parse incoming JSON body
    const body = await req.json();

    console.log('📦 Incoming project body:', body);

    // 🛠️ Create the new project using the schema
    const newProject = await Project.create(body);

    // ✅ Respond with the newly created project
    return NextResponse.json(
      { success: true, project: newProject },
      { status: 201 }
    );
  } catch (err) {
    console.error('❌ Error creating project:', err);

    // ❌ Internal server error response
    return NextResponse.json(
      { success: false, message: 'Failed to create project' },
      { status: 500 }
    );
  }
}
