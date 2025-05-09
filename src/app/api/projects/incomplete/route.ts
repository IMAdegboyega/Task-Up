import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Project from '@/lib/models/projects';

/**
 * GET /api/projects
 * Retrieves all projects that are not marked as "completed".
 */
export async function GET() {
  try {
    // 🔌 Connect to MongoDB
    await connectToDatabase();

    // 📦 Fetch projects where status is not 'completed'
    const incompleteProjects = await Project.find({ status: { $ne: 'completed' } });

    // ✅ Return list of incomplete projects
    return NextResponse.json({ projects: incompleteProjects });
  } catch (err) {
    console.error('❌ Error fetching projects:', err);

    // ❌ Return error response on failure
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
