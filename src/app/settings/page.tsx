"use client";
import { useState } from "react";

type SettingsTab = "general" | "customization" | "profile" | "help-guide";

export default function Settings() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("general");
  const [notifications, setNotifications] = useState({
    email: false,
    desktop: true,
  });

  const toggleNotification = (type: "email" | "desktop") => {
    setNotifications((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  const renderContent = () => {
    switch (activeTab) {
      case "general":
        return (
          <>
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Workspaces:</h2>
              <ul className="space-y-2">
                <li className="text-blue-600">Design</li>
                <li className="text-blue-600">Marketing</li>
                <li className="text-blue-600">Development</li>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Push Notifications:</h3>
              <div className="space-y-3">
                <label className="flex items-center justify-between max-w-xs">
                  <span>Email</span>
                  <input
                    type="checkbox"
                    checked={notifications.email}
                    onChange={() => toggleNotification("email")}
                    className="h-5 w-5 cursor-pointer"
                  />
                </label>
                <label className="flex items-center justify-between max-w-xs">
                  <span>Desktop</span>
                  <input
                    type="checkbox"
                    checked={notifications.desktop}
                    onChange={() => toggleNotification("desktop")}
                    className="h-5 w-5 cursor-pointer"
                  />
                </label>
              </div>
            </div>
          </>
        );
      case "customization":
        return (
          <div>
            <h3 className="text-lg font-semibold mb-4">Mode: </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <p className="p-2 border-none">Light/Dark</p>
              </div>
            </div>
          </div>
        );
      case "profile":
        return (
          <div>
            <h3 className="text-lg font-semibold mb-4">Profile Information</h3>
            <div className="space-y-4 max-w-md">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input 
                  type="text" 
                  className="w-full p-2 border rounded" 
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input 
                  type="email" 
                  className="w-full p-2 border rounded" 
                  placeholder="your@email.com"
                />
              </div>
            </div>
          </div>
        );
      case "help-guide":
        return (
          <div>
            <h3 className="text-lg font-semibold mb-4">Help Resources</h3>
            <ul className="space-y-3">
              <li className="text-blue-600 hover:underline cursor-pointer">Documentation</li>
              <li className="text-blue-600 hover:underline cursor-pointer">FAQs</li>
              <li className="text-blue-600 hover:underline cursor-pointer">Contact Support</li>
            </ul>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-1 flex gap-8">
      {/* Sidebar Navigation */}
      <aside className="w-2/5 h-screen bg-white p-2 flex flex-col rounded-none border-blue-200 border">
        <h2 className="font-semibold p-2 text-2xl mb-4">Settings</h2>
        <p className="flex text-black p-2 text-sm mb-4">ALL</p>
        <nav>
          <ul className="space-y-2"> 
            <li>
              <button
                onClick={() => setActiveTab("general")}
                className={`w-full text-left p-3 rounded-lg ${activeTab === "general" ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}
              >
                General
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("customization")}
                className={`w-full text-left p-3 rounded-none ${activeTab === "customization" ? 'bg-gray-50 text-black' : 'hover:bg-gray-200'}`}
              >
                Customization
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("profile")}
                className={`w-full text-left p-3 rounded-lg ${activeTab === "profile" ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}
              >
                Profile
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("help-guide")}
                className={`w-full text-left p-3 rounded-lg ${activeTab === "help-guide" ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}
              >
                Help Guide
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 bg-white p-6 rounded-lg shadow-sm">
        {renderContent()}
      </main>
    </div>
  );
}