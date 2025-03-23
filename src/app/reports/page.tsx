"use client";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Fullscreen } from "lucide-react";

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: { enabled: true },
  },
  scales: {
    y: { display: false }, // Hide y-axis
    x: { grid: { display: false }, ticks: { color: '#000' } }, // Black labels
  },
};

const stats = [
  { title: "Finished Projects", value: 150, color: "text-green-500" },
  { title: "Finished Tasks", value: 300, color: "text-yellow-500" },
  { title: "Delays", value: 5, color: "text-red-500" },
  { title: "Total Clients", value: 562, trend: "-2%", trendColor: "text-red-500" },
  { title: "New Projects", value: 892, trend: "+10%", trendColor: "text-green-500" },
];

const weeklyPerformance = [
    { day: "M", value: 80, color: "bg-sky-500" },
    { day: "T", value: 40, color: "bg-sky-500" },
    { day: "W", value: 60, color: "bg-sky-500" },
    { day: "T", value: 40, color: "bg-sky-500" },
    { day: "F", value: 90, color: "bg-sky-500" },
  ];

const departmentPerformance = [
  { name: "Design", value: 90, color: "bg-red-500" },
  { name: "Development", value: 80, color: "bg-blue-500" },
  { name: "Marketing", value: 60, color: "bg-indigo-500" },
  { name: "Advertising", value: 40, color: "bg-green-500" },
];

export default function Reports() {
  return (
    <div className="p-8 bg-white w-full h-full min-h-screen text-black">
      {/* Page Header */}
      <h1 className="text-2xl font-bold mb-4">Statistics</h1>

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
        <div className=" bg-white p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Team Monthly Performance</h3>
          <p className="text-sm text-gray-500 mb-4">Your contribution to team work</p>
          <div className="bg-gray-50 rounded-lg p-4 flex justify-around items-end h-60 w-80">
            {weeklyPerformance.map((day, index) => (
              <div key={index} className="flex flex-col items-center">
                {/* Bar Container */}
                <div className="w-3 h-44 bg-gray-200 rounded-lg flex items-end overflow-hidden">
                  {/* Vertical Bar */}
                  <div
                    className={`${day.color} w-full rounded-b-lg`}
                    style={{ height: `${day.value}%` }}
                  ></div>
                </div>
                {/* Day Label */}
                <span className="text-sm mt-2">{day.day}</span>
              </div>
            ))}
          </div>
        </div>


        {/* Department Performance (Progress Bars) */}
        <div className="bg-white p-6 rounded-lg shadow-none">
          <h3 className="font-semibold mb-6 text-gray-800">Department performance</h3>
          <div className="space-y-10 p-6 bg-gray-100 rounded-lg">
            {departmentPerformance.map((dept, index) => (
              <div key={index} className="flex items-center space-x-6">
                {/* Department Name */}
                <p className="w-32 text-gray-800 text-md font-semibold ">{dept.name}</p>
            
                {/* Progress Bar */}
                <div className="w-full bg-gray-200 h-4 rounded-full overflow-hidden">
                  <div
                    className={`${dept.color} h-full rounded-full`}
                    style={{ width: `${dept.value}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
