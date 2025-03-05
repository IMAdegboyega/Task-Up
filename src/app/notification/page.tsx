"use client";
import { Badge } from "@/components/ui/badge";

const updates = [
  {
    text: "A new project has been created (Reservation Application Integrated with Desktop App - PushUp Studios)",
    link: "#",
  },
  {
    text: "A new project has been created (Reservation Application Integrated with Desktop App - PushUp Studios)",
    link: "#",
  },
];

const tasks = [
  {
    name: "Reservation Application Integrated...",
    teamLead: "Adams Evans",
    status: "In Progress",
    created: "19-10-2021",
    expires: "30 days",
    statusColor: "bg-yellow-500",
  },
  {
    name: "Reservation Application Integrated...",
    teamLead: "Adams Evans",
    status: "Paused",
    created: "20-10-2021",
    expires: "20 days",
    statusColor: "bg-red-500",
  },
  {
    name: "Reservation Application Integrated...",
    teamLead: "Adams Evans",
    status: "Completed",
    created: "18-10-2021",
    expires: "0 mins",
    statusColor: "bg-green-500",
  },
];

export default function Notification () {
  return (
    <div className="p-6">
      {/* Page Header */}
      <h1 className="text-2xl font-bold mb-4">Notifications</h1>

      {/* New Updates Section */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h3 className="font-semibold mb-2">New Updates:</h3>
        <ul className="list-disc pl-5 space-y-1">
          {updates.map((update, index) => (
            <li key={index} className="text-sm text-gray-700">
              {update.text}{" "}
              <a href={update.link} className="text-blue-500 hover:underline">
                Click to view
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Task Updates Table */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="font-semibold mb-2">Task Updates:</h3>
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left bg-gray-100">
              <th className="p-2">Task</th>
              <th className="p-2">Team Lead</th>
              <th className="p-2">Status</th>
              <th className="p-2">Created</th>
              <th className="p-2">Expires</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={index} className="border-t">
                <td className="p-2">{task.name}</td>
                <td className="p-2">{task.teamLead}</td>
                <td className="p-2">
                  <Badge className={`text-white ${task.statusColor}`}>{task.status}</Badge>
                </td>
                <td className="p-2">{task.created}</td>
                <td className="p-2">{task.expires}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
