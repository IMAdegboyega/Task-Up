"use client";
import { useState } from "react";

export default function Settings() {
  const [notifications, setNotifications] = useState({
    email: false,
    desktop: true,
  });

  const toggleNotification = (type: "email" | "desktop") => {
    setNotifications((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  return (
    <div className="p-6 flex">
      {/* Sidebar */}
      <aside className="w-1/4 bg-gray-100 p-4 rounded-lg">
        <h2 className="font-bold text-lg mb-2">Settings</h2>
        <ul>
          <li className="p-2 bg-blue-500 text-white rounded mb-1">General</li>
          <li className="p-2 bg-gray-200 rounded mb-1">Customization</li>
          <li className="p-2 bg-gray-200 rounded mb-1">Profile</li>
        </ul>
      </aside>

      {/* Main Settings Content */}
      <main className="w-3/4 bg-white p-6 shadow-lg">
        <h2 className="text-xl font-bold mb-4">General Settings</h2>

        <div className="mb-4">
          <h3 className="text-lg font-semibold">Workspaces:</h3>
          <ul className="text-blue-500">
            <li>Design</li>
            <li>Marketing</li>
          </ul>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold">Push Notifications:</h3>
          <label className="flex items-center gap-2">
            Email
            <input
              type="checkbox"
              checked={notifications.email}
              onChange={() => toggleNotification("email")}
              className="cursor-pointer"
            />
          </label>
          <label className="flex items-center gap-2 mt-2">
            Desktop
            <input
              type="checkbox"
              checked={notifications.desktop}
              onChange={() => toggleNotification("desktop")}
              className="cursor-pointer"
            />
          </label>
        </div>
      </main>
    </div>
  );
}
