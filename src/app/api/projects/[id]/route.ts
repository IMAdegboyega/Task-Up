import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Project from '@/lib/models/projects';

/**
 * DELETE /api/projects/[id]
 * Deletes a project by its ID from the database.
 */
export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    // 🛠️ Connect to MongoDB
    await connectToDatabase();

    const projectId = context.params?.id;

    // ❌ Validate that ID is provided
    if (!projectId) {
      return NextResponse.json({ error: 'Project ID is required' }, { status: 400 });
    }

    // 🗑️ Attempt to delete the project by its ID
    const deletedProject = await Project.findByIdAndDelete(projectId);

    if (!deletedProject) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    // ✅ Return success response
    return NextResponse.json({ message: 'Project deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('❌ Error deleting project:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
