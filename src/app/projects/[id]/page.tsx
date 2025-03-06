import { notFound } from "next/navigation";
import { tasks } from "@/lib/data/data";

export default function ProjectDetail({ params }: { params: { id: string } }) {
  const project = tasks.find((task) => task.id === params.id);

  if (!project) return notFound(); 

  return (
    <div className="p-8 bg-white min-h-screen">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">{project.name} (Project)</h1>
        <p className="text-gray-500">
          Created by {project.createdBy} on {new Date(project.createdDate).toLocaleDateString()}
        </p>
      </header>

      <div className="flex gap-4 mb-6">
        <button className="px-4 py-2 bg-blue-700 text-white rounded">New Task</button>
        <button className="px-4 py-2 bg-gray-300 text-black rounded">Invite People</button>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-gray-600">📅 Date Created: {new Date(project.createdDate).toLocaleDateString()}</p>
          <p className="text-gray-600">📅 Due Date: {new Date(project.dueDate).toLocaleDateString()}</p>
        </div>
        <p className="text-green-600 font-bold">Total Progress: {project.progress}%</p>
      </div>

      <h2 className="text-2xl font-bold">Project Description</h2>
      <p className="text-gray-600">{project.description}</p>
    </div>
  );
}

