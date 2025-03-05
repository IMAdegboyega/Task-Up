"use client"

import React from 'react'

const Sidebar = ({setActiveTab, activeTab} : {setActiveTab: (tab:string) => void, activeTab: string}) => {

  return (
    <div className="w-64 h-screen bg-blue-800 text-white flex flex-col fixed">
      <h2 className="text-xl font-bold mb-16">LOGO</h2>
      <nav className="space-y-2">
        
        {["Dashboard", "Projects", "Employees", "Reports", "Notification", "Calendar", "Messages", "Settings"].map((tab) => (
          <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`w-full text-center p-4 text-lg h-14 rounded-none transition-all duration-200 ${
              activeTab === tab ? "bg-white text-blue-800" : "bg-blue-800 hover:bg-white hover:text-blue-800"
            }`} 
        >
          {tab}
        </button>
        ))}

      </nav>

      <button
        onClick={() => console.log("Logging out...")}
        className="w-full p-2 hover:bg-red-700 text-white text-center mt-auto"
      >
        Log Out
      </button>

    </div>
  );
};

export default Sidebar