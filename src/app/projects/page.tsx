"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import TaskCard from "@/components/taskCard";
import FloatWindow from "@/components/floats";
import { tasks } from "@/lib/data/data";

type TaskStatus = "Important" | "In Progress" | "Done";

const headerConfig = {
  all: { text: "ALL PROJECTS", color: "text-gray-900" },
  Important: { text: "IMPORTANT PROJECTS", color: "text-red-700" },
  "In Progress": { text: "IN PROGRESS", color: "text-blue-600" },
  Done: { text: "COMPLETED PROJECTS", color: "text-green-600" },
};

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState<TaskStatus | "all">("all");
  const [isFloatWindowOpen, setIsFloatWindowOpen] = useState(false);
  const router = useRouter();

  // Categorize tasks
  const categorizedTasks = tasks.map((task) => ({
    ...task,
    status:
      task.progress === 100
        ? "Done"
        : task.status === "Important"
        ? "Important"
        : "In Progress",
  }));

  const counts = {
    all: categorizedTasks.length,
    Important: categorizedTasks.filter((task) => task.status === "Important").length,
    "In Progress": categorizedTasks.filter((task) => task.status === "In Progress").length,
    Done: categorizedTasks.filter((task) => task.status === "Done").length,
  };

  const filteredTasks =
    activeFilter === "all"
      ? categorizedTasks
      : categorizedTasks.filter((task) => task.status === activeFilter);

  const { text: headerText, color: headerColor } = headerConfig[activeFilter];

  return (
    <div className="p-8 bg-white min-h-screen">
      {/* Header */}
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className={`text-3xl font-bold ${headerColor}`}>{headerText}</h1>
          <p className="text-sm text-gray-500">
            Reports as of today ({new Date().toLocaleDateString()})
          </p>
        </div>

        {/* Open Float Window Button */}
        <button
          onClick={() => setIsFloatWindowOpen(true)}
          className="px-4 py-2 rounded-sm bg-red-800 text-white"
        >
          + ADD NEW PROJECTS
        </button>
      </header>

      {/* Filters */}
      <nav className="flex space-x-4 mb-8">
        {Object.entries(counts).map(([key, count]) => (
          <button
            key={key}
            onClick={() => setActiveFilter(key as TaskStatus | "all")}
            className={`px-4 py-2 rounded-lg text-md font-bold ${
              activeFilter === key ? "text-blue-900" : "bg-white text-black hover:text-gray-800"
            }`}
          >
            {headerConfig[key as TaskStatus].text} ({count})
          </button>
        ))}
      </nav>

      {/* Task List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTasks.map((task) => (
          <div key={task.id} onClick={() => router.push(`/projects/${task.id}`)}>
            <TaskCard {...task} />
          </div>
        ))}
      </div>

      {/* Float Window (Modal) */}
      <FloatWindow isOpen={isFloatWindowOpen} onClose={() => setIsFloatWindowOpen(false)}>
        <h2 className="text-lg font-bold mb-4">Add New Project</h2>
        <p className="text-sm text-gray-700">Enter details of your new project here.</p>
        {/* TODO: Add a form here */}
      </FloatWindow>
    </div>
  );
};

export default Projects;
