"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ImSpinner2 } from "react-icons/im";
import { HiMenu, HiX } from "react-icons/hi";

interface SidebarProps {
  setActiveTab: (tab: string) => void;
  activeTab: string;
  setUser: (user: any) => void;
}


const Sidebar = ({ setActiveTab, activeTab, setUser }: SidebarProps) => {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // Sidebar visibility for mobile

  const handleLogout = () => {
    setIsLoggingOut(true);
    setTimeout(() => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      setUser(null);
      router.replace("/greetingPage");
    }, 1200);
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
          disabled={isLoggingOut}
          className={`w-full flex items-center justify-center p-3 mt-auto transition-colors duration-200 ${
            isLoggingOut ? "bg-red-400 cursor-not-allowed" : "hover:bg-red-700"
          }`}
        >
          {isLoggingOut ? (
            <>
              <ImSpinner2 className="animate-spin mr-2 text-white" />
              <span className="animate-pulse">Logging out...</span>
            </>
          ) : (
            "Log Out"
          )}
      </button>
    </div>
  );
};

export default Sidebar;