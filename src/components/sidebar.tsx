"use client";
import React from "react";
import { useRouter } from "next/navigation";

interface SidebarProps {
  setActiveTab: (tab: string) => void;
  activeTab: string;
  setUser: (user: any) => void;
}

const Sidebar = ({ setActiveTab, activeTab, setUser }: SidebarProps) => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null); // This clears user state in the layout/page
    router.replace("/greetingPage"); // Navigate to greeting page
  };

  return (
    <div className="w-64 h-screen bg-blue-800 text-white flex flex-col fixed">
      <h2 className="text-xl font-bold mb-16">LOGO</h2>
      <nav className="space-y-2">
        {[
          "Dashboard",
          "Projects",
          "Employees",
          "Reports",
          "Notification",
          "Calendar",
          "Messages",
          "Settings",
        ].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`w-full text-center p-4 text-lg h-14 rounded-none transition-all duration-200 ${
              activeTab === tab
                ? "bg-white text-blue-800 font-bold"
                : "bg-blue-800 hover:bg-blue-600 hover:text-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </nav>

      <button
        onClick={handleLogout}
        className="w-full p-2 hover:bg-red-700 text-white text-center mt-auto"
      >
        Log Out
      </button>
    </div>
  );
};

export default Sidebar;
