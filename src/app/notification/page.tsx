"use client";

import { Badge } from "@/components/ui/badge";
import { notificationTasks, notificationUpdates } from "@/lib/data/data";

const statusColors = {
  Completed: "text-green-500",
  Paused: "text-blue-400",
  Stuck: "text-yellow-500",
  "In Progress": "text-pink-500",
} as const;

type TaskStatus = keyof typeof statusColors;

interface Task {
  name: string;
  teamLead: string;
  status: TaskStatus;
  created: string;
  expires: string;
}

function isTaskStatus(status: string): status is TaskStatus {
  return status in statusColors;
}

function getStatusColor(status: string): string {
  return isTaskStatus(status) ? statusColors[status] : "text-gray-500";
}

export default function Notification() {
  return (
    <div className="p-2 mx-auto">
      {/* New Updates Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-8 text-black">
        <h2 className="text-lg font-semibold mb-4">New Updates:</h2>
        <div className="space-y-4 bg-gray-100 p-6 rounded-lg mb-8">
          {notificationUpdates.map((update, index) => (
            <div key={index} className="flex items-start p-2">
              <div className="flex justify-between items-center w-full">
                <p className="text-gray-800">{update.text}</p>
                <a
                  href={update.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-800 hover:underline hover:text-blue-600 whitespace-nowrap ml-4"
                >
                  Click to view
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Task Updates Section */}
        <div className="bg-white p-0 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Task updates:</h2>

          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 mb-3 px-2 font-medium text-gray-500 text-sm">
            <div className="col-span-5">Project title</div>
            <div className="col-span-2">Team lead</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2">Created</div>
            <div className="col-span-1">Expires</div>
          </div>

          {/* Task Items */}
          <div className="space-y-3 bg-gray-100 rounded-lg">
            {notificationTasks.map((task, index) => (
              <div
                key={index}
                className="grid grid-cols-12 gap-4 items-center p-4 hover:bg-gray-50 rounded-lg"
              >
                <div className="col-span-5 font-medium text-gray-900 truncate">
                  {task.name}
                </div>
                <div className="col-span-2 flex items-center">
                  <img
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                      task.teamLead
                    )}&background=random`}
                    alt={task.teamLead}
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <span>{task.teamLead}</span>
                </div>
                <div className="col-span-2">
                  <Badge
                    className={`text-white ${getStatusColor(
                      task.status
                    )} bg-transparent shadow-none border-none px-2 py-1 rounded-md text-md`}
                  >
                    {task.status}
                  </Badge>
                </div>
                <div className="col-span-2 text-sm text-gray-600">
                  {task.created}
                </div>
                <div className="col-span-1 text-sm text-gray-600">
                  {task.expires}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
