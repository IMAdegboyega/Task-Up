"use client";

import { useMemo, useState, useEffect } from "react";
import TaskCard from "@/components/taskCard";
import FloatWindow from "@/components/floats";
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
  type Project = {
    _id: string;
    name: string;
    status: string;
    createdBy: string;
    createdDate: string;
    dueDate: string;
    progress: number;
    description: string;
  };

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/projects");
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const data = await res.json();
      console.log("🧠 Projects data from API:", data);
      if (!data.projects) {
        throw new Error("Malformed API response: 'projects' field missing.");
      }
      setProjects(data.projects);
    } catch (error) {
      console.error("❌ Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<TaskStatus | "all">("all");
  const [isFloatWindowOpen, setIsFloatWindowOpen] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [currentDate, setCurrentDate] = useState("");

  const categorizedTasks = useMemo(() => {
    return projects.map((project: any) => ({
      ...project,
      status:
        project.status === "completed"
          ? "Done"
          : project.status === "important"
          ? "Important"
          : "In Progress",
    }));
  }, [projects]);

  const counts = useMemo(
    () => ({
      all: categorizedTasks.length,
      Important: categorizedTasks.filter((task) => task.status === "Important").length,
      "In Progress": categorizedTasks.filter((task) => task.status === "In Progress").length,
      Done: categorizedTasks.filter((task) => task.status === "Done").length,
    }),
    [categorizedTasks]
  );

  const filteredTasks = useMemo(() => {
    return activeFilter === "all"
      ? categorizedTasks
      : categorizedTasks.filter((task) => task.status === activeFilter);
  }, [activeFilter, categorizedTasks]);

  const { text: headerText, color: headerColor } = headerConfig[activeFilter];
  const project = selectedProject ? projects.find((project) => project._id === selectedProject) : null;

  return (
    <div className="p-8 bg-white min-h-screen">
      {project ? (
        <div className="max-w-6xl mx-auto bg-white p-8 pt-6 rounded-lg shadow-none relative left-0 right-0 top-0 bottom-0 flex flex-col min-h-screen">
          <div className="flex-grow">
            <button
              onClick={() => setSelectedProject(null)}
              className="mb-4 flex items-center text-gray-600 hover:text-black"
            >
              ← Back to Projects
            </button>
            <header className="mb-6 border-b pb-4">
              <h1 className="text-3xl font-bold">{project?.name} (Project)</h1>
              <p className="text-gray-500 mt-2">
                Created by <span className="font-medium">{project?.createdBy}</span> on{" "}
                {project && new Date(project.createdDate).toLocaleDateString()}
              </p>
            </header>
            <div className="flex items-center gap-4 mb-6">
              <BlueButton label="New Task" variant="filled" active onClick={() => setIsFloatWindowOpen(true)} />
              <BlueButton label="Invite People" icon={<FaUsers className="text-blue-800" />} variant="outlined" />
              <BlueButton label="45 Comments" icon={<FaCommentDots className="text-blue-800" />} variant="ghost" />
            </div>
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
            <h2 className="text-2xl font-bold mb-3">Project Description</h2>
            <p className="text-gray-600 leading-relaxed">{project?.description}</p>
          </div>
          <div className="w-full max-w-md h-px bg-black mx-auto mb-3"></div>
          <div
            onClick={() => {
              setDeleteConfirmation(true);
              setIsFloatWindowOpen(true);
            }}
            className="text-red-600 text-center font-medium mt-auto cursor-pointer hover:text-red-800 transition-colors"
          >
            DELETE PROJECT
          </div>

        </div>
      ) : (
        <>
          <header className="mb-8 flex justify-between items-center">
            <div>
              <h1 className={`text-3xl font-bold ${headerColor}`}>{headerText}</h1>
              <p className="text-sm text-gray-500">Reports as of today ({currentDate})</p>
            </div>
            <button
              onClick={() => setIsFloatWindowOpen(true)}
              className="px-4 py-2 rounded-sm bg-red-600 text-white hover:bg-red-900"
            >
              + ADD NEW PROJECTS
            </button>
          </header>
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
          {loading ? (
            <p>Loading projects...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTasks.length > 0 ? (
                filteredTasks.map((project: any) => (
                  <TaskCard
                    key={project._id}
                    id={project._id}
                    name={project.projectName || project.name}
                    title={project.description}
                    progress={0}
                    tasksDone={0}
                    dueDate={new Date(project.dueDate).toLocaleDateString()}
                    createdBy={project.createdBy}
                    onClick={(id) => setSelectedProject(id)}
                  />
                ))
              ) : (
                <p>No projects found.</p>
              )}
            </div>
          )}
        </>
      )}

      {/* Floating window for adding new project and deleteConfirmation */}

      <FloatWindow
        isOpen={isFloatWindowOpen}
        onClose={() => {
          setIsFloatWindowOpen(false);
          setDeleteConfirmation(false);
        }}
      >
        {deleteConfirmation ? (
          <div className="space-y-4">
            <h2 className="text-lg font-bold">Are you sure you want to delete this project?</h2>
            <div className="flex justify-end gap-4">
              <button
                onClick={async () => {
                  if (project) {
                    const res = await fetch(`/api/projects/${project._id}`, { method: "DELETE" });
                    if (res.ok) {
                      await fetchProjects();
                      setSelectedProject(null);
                      setIsFloatWindowOpen(false);
                      setDeleteConfirmation(false);
                      router.push("/");
                    }
                  }
                }}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-800"
              >
                Delete
              </button>
              <button
                onClick={() => {
                  setIsFloatWindowOpen(false);
                  setDeleteConfirmation(false);
                }}
                className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <h2 className="text-lg font-bold mb-4">Add New Project</h2>
            <AddNewProjectForm
              onClose={() => setIsFloatWindowOpen(false)}
              onProjectCreated={fetchProjects}
            />
          </>
        )}
      </FloatWindow>

    </div>
  );
};

export default Projects;
