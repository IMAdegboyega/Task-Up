"use client";

import { useEffect, useState } from "react";
import DailyCard from "@/components/dailyCard";
import PortableMessage from "@/components/portableMessage";
import TaskCard from "@/components/taskCard";
import FloatWindow from "@/components/floats";
import AddNewProjectForm from "@/lib/data/addNewProjectForm";
import IncompleteProjectSummary from "@/components/incomplete";

export default function Dashboard() {
  const [isFloatWindowOpen, setIsFloatWindowOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const messages = [
    {
      name: "Kadin Aminoff",
      text: "Hey, don't forget to clear server cache!",
      time: "25min ago",
      status: "online",
    },
    {
      name: "Marcus Kenter",
      text: "I remember that project is due tomorrow.",
      time: "45min ago",
      status: "read",
    },
    {
      name: "Makenna Levin",
      text: "Maybe we should schedule that meeting",
      time: "Yesterday, 8:24 AM",
      status: "read",
    },
  ];

  const meetings = [
    {
      title: "Daily Standup Call",
      description: "Discuss team tasks for the day.",
      time: "9:00 AM",
      attendees: [
        "/images/user1.jpg",
        "/images/user2.jpg",
        "/images/user3.jpg",
        "/images/user4.jpg",
      ],
    },
    {
      title: "Brand Identity Meeting",
      description: "Discuss brand identity guidelines for print media.",
      time: "11:00 AM",
      attendees: [
        "/images/user1.jpg",
        "/images/user2.jpg",
        "/images/user3.jpg",
        "/images/user4.jpg",
      ],
    },
  ];

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

  const [projectList, setProjectList] = useState<Project[]>([]);

  const fetchProjects = async () => {
    const res = await fetch("/api/projects");
    const data = await res.json();
    setProjectList(data.projects);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const filteredTasks = projectList || [];

  const project = selectedProject
    ? projectList.find((project) => project._id === selectedProject)
    : null;

  return (
    <div className="p-0 -mt-14 space-y-6 min-h-screen">
      {selectedProject ? (
        <FloatWindow isOpen={true} onClose={() => setSelectedProject(null)}>
          <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg shadow-none relative left-0 right-0 top-0 bottom-0">
            <header className="mb-6 border-b pb-4">
              <h1 className="text-3xl font-bold">{project?.name}</h1>
              <p className="text-gray-500 mt-2">
                Created by <span className="font-medium">{project?.createdBy}</span> on{" "}
                {project && new Date(project.createdDate).toLocaleDateString()}
              </p>
            </header>

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
        </FloatWindow>
      ) : (
        <>
          <div className="relative flex items-center bg-blue-800 text-white rounded-xl p-4 shadow-md w-80 overflow-hidden">
            <div className="flex flex-col pl-4">
              <h1 className="text-lg font-bold">Create Task</h1>
              <p className="text-sm opacity-80">Create a new task</p>
            </div>
            <div className="absolute right-0 top-0 bottom-0 w-20 flex items-center justify-center rounded-l-full">
              <button
                className="bg-white text-blue-800 p-2 rounded-md"
                onClick={() => setIsFloatWindowOpen(true)}
              >
                ➕
              </button>
            </div>
          </div>

          <div className="bg-blue-800 text-white p-6 rounded-lg shadow-md">
            <p className="text-lg">
              <IncompleteProjectSummary /> tasks close to their due dates rush to finish them before it expires.
            </p>
            <button className="mt-4 bg-white text-blue-800 px-20 py-1 rounded-lg shadow-md">
              MY TASKS
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Project Updates</h2>
            <div className="flex gap-4 overflow-x-auto">
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
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-6">
              <PortableMessage messages={messages} />
            </div>
            <div className="text-white p-6 rounded-lg space-y-6">
              {meetings.map((meeting, index) => (
                <DailyCard key={index} {...meeting} />
              ))}
            </div>
          </div>

          <FloatWindow isOpen={isFloatWindowOpen} onClose={() => setIsFloatWindowOpen(false)}>
            <h2 className="text-lg font-bold mb-4">Add New Project</h2>
            <AddNewProjectForm
              onClose={() => setIsFloatWindowOpen(false)}
              onProjectCreated={fetchProjects}
            />
          </FloatWindow>
        </>
      )}
    </div>
  );
}
