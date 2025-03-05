"use client";
import { useState } from "react";
import Dashboard from "../dashboard/page";
import Projects from "../projects/page";
import Employees from "../employees/page";
import Reports from "../reports/page";
import Notification from "../notification/page";
import MyCalendar from "../calendar/page";
import Message from "../message/page";
import Settings from "../settings/page";
import Sidebar from "@/components/sidebar";
import SearchBar from "@/components/searchbar";

export default function Layout() {
  const [activeTab, setActiveTab] = useState("Dashboard");

  const pageTitles: Record<string, string> = {
    Dashboard: "Welcome back, Abigail",
    Projects: "Projects",
    Employees: "Employees",
    Reports: "Reports",
    Notification: "Notifications",
    Calender: "Calender",
    Messages: "Message",
    Settings: "Settings",
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar setActiveTab={setActiveTab} activeTab={activeTab} />

      {/* Main Content Area */}
      <div className="ml-64 flex-1 flex flex-col text-blue-900 ">
        {/* Fixed Header */}
        <header className="flex justify-between items-center bg-gray-100 p-4 shadow-none">
          <h1 className="text-[23px] text-black/90 font-semibold text-center">{pageTitles[activeTab] || "Dashboard"}</h1> 
          
          <div className="flex items-center space-x-4">
            <SearchBar/>

            <div className="flex items-center space-x-4">
              <span>User Name</span>
              <img
                src="/user-avatar.png"
                alt="User"
                className="w-10 h-10 rounded-full"
              />
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <main className="flex-1 p-6 bg-gray-100">
          {activeTab === "Dashboard" && <Dashboard />}
          {activeTab === "Projects" && <Projects />}
          {activeTab === "Employees" && <Employees />}
          {activeTab === "Reports" && <Reports />}
          {activeTab === "Notification" && <Notification />}
          {activeTab === "Calendar" && <MyCalendar />}
          {activeTab === "Messages" && <Message />}
          {activeTab === "Settings" && <Settings />}
        </main>
      </div>
    </div>
  );
}
