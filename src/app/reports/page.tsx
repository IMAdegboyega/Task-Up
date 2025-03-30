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
import { stats, weeklyPerformance, departmentPerformance } from "@/lib/data/data";

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

export default function Reports() {
  return (
    <div className="p-8 bg-white w-full h-full min-h-screen text-black">
      {/* Page Header */}
      <h1 className="text-2xl font-bold mb-4">Statistics</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {stats.map((stat, index) => (
        <div 
          key={index} 
          className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
        >
          <div className="flex flex-col h-full justify-between">
            {/* Main Value */}
            <h3 className={`text-3xl font-bold ${stat.color} mb-2`}>{stat.value}</h3>
        
            {/* Title */}
            <p className="text-gray-600 text-lg mb-3">{stat.title}</p>
        
            {/* Trend Indicator */}
            {stat.trend && (
            <div className="flex items-center mt-auto">
              <span className={`${stat.trendColor} text-sm font-medium`}>
                {stat.trend === 'up' ? (
                  <svg className="w-4 h-4 inline mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12 7a1 1 0 01-1.707-.707L12 4.586V7z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 inline mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12 13a1 1 0 01-.707.293L12 15.414V13z" clipRule="evenodd" />
                  </svg>
                )}
                {stat.trend || ''} than last month
              </span>
            </div>
            )}
          </div>
        </div>
      ))}
    </div>

      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
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
