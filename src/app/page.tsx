"use client";
import { useEffect, useState } from "react";
import Dashboard from "./dashboard/page";
import Projects from "./projects/page";
import Employees from "./employees/page";
import Reports from "./reports/page";
import Notification from "./notification/page";
import MyCalendar from "./calendar/page";
import Message from "./message/page";
import Settings from "./settings/page";
import Sidebar from "@/components/sidebar";
import SearchBar from "@/components/searchbar";
import { redirect, useRouter } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState("Dashboard"); // or null 
  const [user, setUser] = useState(null);
  const router = useRouter();
  // redirect("/greetingPage");
  // Redirect to the greeting page if the user is not authenticated 

  const pageTitles: Record<string, (user: any) => string> = {
    Dashboard: (user) => `Welcome back, ${user?.name || "User"}`,
    Projects: () => "Projects",
    Employees: () => "Employees",
    Reports: () => "Reports",
    Notification: () => "Notifications",
    Calendar: () => "Calendar",
    Messages: () => "Messages",
    Settings: () => "Settings",
  };



  useEffect(() => {
    const checkAuth = async () => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      // Prevent the fetch from happening without a token
      router.push("/sign-in");
      return;
    }

    try {
      const res = await fetch("/api/protected", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 403) {
        // Try to refresh token
        const refreshToken = localStorage.getItem("refreshToken");

        if (!refreshToken) {
          router.push("/sign-in");
          return;
        }

        const refreshRes = await fetch("/api/users/refresh", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refreshToken }),
        });

        if (refreshRes.ok) {
          const data = await refreshRes.json();
          localStorage.setItem("accessToken", data.accessToken);

          // Retry original request
          const retryRes = await fetch("/api/protected", {
            headers: { Authorization: `Bearer ${data.accessToken}` },
          });

          if (retryRes.ok) {
            const retryData = await retryRes.json();
            setUser(retryData.user);
            return;
          }
        }

        // If refresh also failed
        router.push("/sign-in");
      } else {
        const data = await res.json();
        console.log("User from protected route:", data.user);
        setUser(data.user);
      }
    } catch (err) {
      // In case fetch throws (e.g. network error)
      router.push("/sign-in");
    }
  };

    checkAuth();

  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar setActiveTab={setActiveTab} activeTab={activeTab} setUser={setUser}/>

      {/* Main Content Area */}
      <div className="ml-64 flex-1 flex flex-col text-blue-900 ">
        {/* Fixed Header */}
        <header className="flex justify-between items-center bg-gray-100 p-10 shadow-none">
          <h1 className="text-[25px] text-black/90 font-bold text-center">
            {typeof pageTitles[activeTab] === "function"
            ? pageTitles[activeTab](user)
            : pageTitles[activeTab]}
          </h1> 
          
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
        <main className="flex-1 p-10 bg-gray-100">
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
