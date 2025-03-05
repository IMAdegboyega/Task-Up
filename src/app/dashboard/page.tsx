"use client";
import DailyCard from "@/components/dailyCard";
import PortableMessage from "@/components/portableMessage";
import TaskCard from "@/components/taskCard";
import TimelineConnector from "@/components/timeLineConnector";
import { useState } from "react";

export default function Dashboard() {
  const [projects, setProjects] = useState([
    {
      id: "1",
      name: "Reservation Application integrated with Desktop App",
      title: "Pushup Studios",
      userImage: "/path/to/image1.jpg",
      tags: ["DESKTOP APP"],
      progress: 60,
      tasksDone: 12,
      dueDate: "12/05/2020",
      status: "In Progress",
    },
    {
      id: "2",
      name: "Reservation Application integrated with Google Maps",
      title: "Tech Innovations",
      userImage: "/path/to/image2.jpg",
      tags: ["WEB APP"],
      progress: 12,
      tasksDone: 15,
      dueDate: "15/06/2020",
      status: "Important",
    },
    {
      id: "3",
      name: "E-commerce Website with Payment Gateway",
      title: "Tech Innovations",
      userImage: "/path/to/image2.jpg",
      tags: ["WEB APP"],
      progress: 100,
      tasksDone: 15,
      dueDate: "15/06/2020",
      status: "Done",
    },
  ]);

  const skeletonCount = Math.max(0, 3 - projects.length);

  const messages = [
    { name: "Kadin Aminoff", 
      text: "Hey, don't forget to clear server cache!", 
      time: "25min ago", 
      status: "online" },
    { name: "Marcus Kenter", 
      text: "I remember that project is due tomorrow.", 
      time: "45min ago", 
      status: "read" },
    { name: "Makenna Levin", 
      text: "Maybe we should schedule that meeting", 
      time: "Yesterday, 8:24 AM", 
      status: "read" },
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

  return (
    <div className="p-6 space-y-6">
      {/* Create Task */}
      <div className="relative flex items-center bg-blue-800 text-white rounded-xl p-4 shadow-md w-80 overflow-hidden">
      {/* Left Section: Text */}
      <div className="flex flex-col pl-4">
        <h1 className="text-lg font-bold">Create Task</h1>
        <p className="text-sm opacity-80">Create a new task</p>
      </div>

      {/* Right Section: Icon with Curve */}
      <div className="absolute right-0 top-0 bottom-0 w-20 flex items-center justify-center rounded-l-full">
        <button className="bg-white text-blue-800 p-2 rounded-md">
          ➕
        </button>
      </div>
    </div>


      {/* Task Summary */}
      <div className="bg-blue-800 text-white p-6 rounded-lg shadow-md">
        <p className="text-lg">
          You have2 tasks close to their due dates rush to finish them before it expires.
        </p>
        <button className="mt-4 bg-white text-blue-800 px-20 py-1 rounded-lg shadow-md">
          MY TASKS
        </button>
      </div>

      {/* Project Updates */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Project Updates</h2>
        <div className="flex gap-4 overflow-x-auto">
          {/* Render actual tasks */}
          {projects.map((task, index) => (
            <TaskCard key={index} {...task} />
          ))}

          {/* Render skeletons for missing tasks */}
          {[...Array(skeletonCount)].map((_, index) => (
            <TaskCard key={`skeleton-${index}`}
              title=""
              description=""
              tags={[]} 
              tasksDone={0} 
              dueDate=""
              isLoading />
          ))} 

        </div>
      </div>

      {/* Messages & Meetings */}
      <div className="grid grid-cols-2 gap-4">
        {/* Messages */}
        <div className="p-6">
          <PortableMessage messages={messages} />
        </div>

        {/* Meeting Schedule */}
        <div className="text-white p-6 rounded-lg space-y-6">
          {meetings.map((meeting, index) => (
            <DailyCard key={index} {...meeting} />
          ))}
        </div>
      </div>
    </div>
  );
}
