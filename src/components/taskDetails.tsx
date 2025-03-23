"use client";

import TaskCard from "@/components/taskCard";
import { tasks } from "@/lib/data/data";
import { useState, useMemo } from "react";

type TaskStatus = "Important" | "In Progress" | "Done" | "all";

interface TaskListProps {
  onSelectProject?: (id: string) => void;
}

export default function TaskList({ onSelectProject }: TaskListProps) {
  const [activeFilter, setActiveFilter] = useState<TaskStatus | "all">("all");

  // Categorize tasks properly
  const categorizedTasks = useMemo(() => {
    return tasks.map((task) => ({
      ...task,
      status:
        task.progress === 100
          ? "Done"
          : task.status === "Important"
          ? "Important"
          : "In Progress",
    }));
  }, []);

  const filteredTasks =
    activeFilter === "all"
      ? categorizedTasks
      : categorizedTasks.filter((task) => task.status === activeFilter);

  return (
    <div>
      {/* Filter Buttons */}
      <nav className="flex space-x-4 mb-4">
        {["all", "Important", "In Progress", "Done"].map((status) => (
          <button
            key={status}
            onClick={() => setActiveFilter(status as TaskStatus)}
            className={`px-4 py-2 rounded-lg text-md font-bold ${
              activeFilter === status ? "text-blue-900" : "bg-white text-black hover:text-gray-800"
            }`}
          >
            {status.toUpperCase()}
          </button>
        ))}
      </nav>

      {/* Task Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTasks.map((task) => (
          <div key={task.id} onClick={() => onSelectProject?.(task.id)}>
            <TaskCard {...task} />
          </div>
        ))}
      </div>
    </div>
  );
}

