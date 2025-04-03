"use client";

import { useMemo, useState, useEffect } from "react";
import TaskCard from "@/components/taskCard";
import FloatWindow from "@/components/floats";
import { tasks } from "@/lib/data/data";
import { useRouter } from "next/navigation";
import BlueButton from "@/components/blueButton";
import { FaCommentDots, FaUsers } from "react-icons/fa";
import AddNewProjectForm from "@/lib/data/addNewProjectForm";

type TaskStatus = "Important" | "In Progress" | "Done";

const headerConfig = {
  all: { text: "ALL PROJECTS", color: "text-gray-900" },
  Important: { text: "IMPORTANT PROJECTS", color: "text-red-700" },
  "In Progress": { text: "IN PROGRESS", color: "text-blue-600" },
  Done: { text: "COMPLETED PROJECTS", color: "text-green-600" },
};

const Projects = () => {
  const router = useRouter();

  const [activeFilter, setActiveFilter] = useState<TaskStatus | "all">("all");
  const [isFloatWindowOpen, setIsFloatWindowOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [currentDate, setCurrentDate] = useState(""); // Fix SSR date issue

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

  const counts = useMemo(() => ({
    all: categorizedTasks.length,
    Important: categorizedTasks.filter((task) => task.status === "Important").length,
    "In Progress": categorizedTasks.filter((task) => task.status === "In Progress").length,
    Done: categorizedTasks.filter((task) => task.status === "Done").length,
  }), [categorizedTasks]);

  const filteredTasks = useMemo(() => {
    return activeFilter === "all"
      ? categorizedTasks
      : categorizedTasks.filter((task) => task.status === activeFilter);
  }, [activeFilter, categorizedTasks]);

  const { text: headerText, color: headerColor } = headerConfig[activeFilter];

  // Get selected project details
  const project = selectedProject ? tasks.find((task) => task.id === selectedProject) : null;

  return (
    <div className="p-8 bg-white min-h-screen">
      {project ? (
        /* Project Details View */
        <div className="max-w-6xl mx-auto bg-white p-8 pt-6 rounded-lg shadow-none relative left-0 right-0 top-0 bottom-0 flex flex-col min-h-screen">
          {/* Content Wrapper to push "DELETE PROJECT" down */}
          <div className="flex-grow">
            {/* Back Button */}
            <button       
              onClick={() => setSelectedProject(null)}
      className="mb-4 flex items-center text-gray-600 hover:text-black"
            >
              ← Back to Projects
            </button>

            {/* Project Details Header */}
            <header className="mb-6 border-b pb-4">
              <h1 className="text-3xl font-bold">{project?.name} (Project)</h1>
              <p className="text-gray-500 mt-2">
        Created by <span className="font-medium">{project?.createdBy}</span> on{" "}
        {project && new Date(project.createdDate).toLocaleDateString()}
              </p>
            </header>

            {/* Buttons */}
            <div className="flex items-center gap-4 mb-6">
              <BlueButton label="New Task" variant="filled" active onClick={() => setIsFloatWindowOpen        (true)} />
              <BlueButton
                label="Invite People"
                icon={<FaUsers className="text-blue-800" />}
                variant="outlined"
              />
              <BlueButton
                label="45 Comments"
                icon={<FaCommentDots className="text-blue-800" />}
                variant="ghost"
              />
            </div>

            {/* Project Info */}
            <div className="grid grid-cols-3 gap-6 items-center mb-6 bg-white p-4 rounded-lg shadow-sm">
              <div>
                <p className="text-sm text-gray-500">📅 Date Created</p>
                <p className="text-gray-800 font-medium">
                  {project && new Date(project.createdDate).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">📅 Due Date</p>
                <p className="text-gray-800 font-medium">
          {project && new Date(project.dueDate).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">📊 Total Progress</p>
                <div className="relative w-full h-2 bg-gray-200 rounded-full">
          <div
            className="absolute top-0 left-0 h-full bg-green-700 rounded-full"
            style={{ width: `${project?.progress}%` }}
          ></div>
                </div>
                <p className="text-gray-800 font-medium mt-1">{project?.progress}%</p>
              </div>
            </div>

            {/* Project Description */}
            <h2 className="text-2xl font-bold mb-3">Project Description</h2>
            <p className="text-gray-600 leading-relaxed">{project?.description}</p>
          </div>

          {/* DELETE PROJECT Button at the Bottom */}
          <div className="w-full max-w-md h-px bg-black mx-auto mb-3"></div>
          <div onClick={() => {}} className="text-red-600 text-center font-medium mt-auto cursor-pointer hover:text-red-800 transition-colors">
            DELETE PROJECT
          </div>
        </div>

      ) : (
        /* Projects List View */
        <>
          {/* Header */}
          <header className="mb-8 flex justify-between items-center">
            <div>
              <h1 className={`text-3xl font-bold ${headerColor}`}>{headerText}</h1>
              <p className="text-sm text-gray-500">Reports as of today ({currentDate})</p>
            </div>

            {/* Open Float Window Button */}
            <button
              onClick={() => setIsFloatWindowOpen(true)}
              className="px-4 py-2 rounded-sm bg-red-600 text-white hover:bg-red-900"
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
              <div key={task.id}>
                <TaskCard 
                  {...task}
                  onClick={() => setSelectedProject(task.id)} // Add this line
                />
              </div>
            ))}
          </div>
        </>
      )}

      {/* Float Window (Modal) */}
      <FloatWindow isOpen={isFloatWindowOpen} onClose={() => setIsFloatWindowOpen(false)}>
        <h2 className="text-lg font-bold mb-4">Add New Project</h2>
        <AddNewProjectForm onClose={() => setIsFloatWindowOpen(false)} />
      </FloatWindow>
    </div>
  ); 
};

export default Projects;
