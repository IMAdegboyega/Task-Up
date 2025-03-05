"use client";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Title } from "chart.js";
import { Fullscreen } from "lucide-react";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Title);

const stats = [
  { title: "Finished Projects", value: 150, color: "text-green-500" },
  { title: "Finished Tasks", value: 300, color: "text-yellow-500" },
  { title: "Delays", value: 5, color: "text-red-500" },
  { title: "Total Clients", value: 562, trend: "-2%", trendColor: "text-red-500" },
  { title: "New Projects", value: 892, trend: "+10%", trendColor: "text-green-500" },
];

const weeklyPerformanceData = {
  labels: ["M", "T", "W", "T", "F"],
  datasets: [
    {
      label: "Performance",
      data: [4, 3, 5, 2, 6],
      backgroundColor: "#3b82f6",
    },
  ],
};

const departmentPerformance = [
  { name: "Design", value: 90, color: "bg-red-500" },
  { name: "Development", value: 80, color: "bg-blue-500" },
  { name: "Marketing", value: 60, color: "bg-indigo-500" },
  { name: "Advertising", value: 40, color: "bg-green-500" },
];

export default function Reports() {
  return (
    <div className="p-6">
      {/* Page Header */}
      <h1 className="text-2xl font-bold mb-4">Reports</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-5 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md">
            <h3 className={`text-lg font-semibold ${stat.color}`}>{stat.value}</h3>
            <p className="text-gray-500">{stat.title}</p>
            {stat.trend && (
              <span className={`${stat.trendColor} text-sm`}>{stat.trend} than last month</span>
            )}
          </div>
        ))}
      </div>

      {/* Performance Charts */}
      <div className="grid grid-cols-2 gap-6 mt-6">
        {/* Team Monthly Performance (Bar Chart) */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="font-semibold mb-2">Team Monthly Performance</h3>
          <div className="h-[300px]"> {/* Set a fixed height */}
            <Bar 
              data={weeklyPerformanceData} 
              options={{ responsive: true, maintainAspectRatio: false }} 
            />
          </div>
        </div>


        {/* Department Performance (Progress Bars) */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="font-semibold mb-2">Department Performance</h3>
          {departmentPerformance.map((dept, index) => (
            <div key={index} className="mb-3">
              <p className="text-sm text-gray-700">{dept.name}</p>
              <div className="w-full bg-gray-200 h-3 rounded-md overflow-hidden">
                <div className={`${dept.color} h-3`} style={{ width: `${dept.value}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
