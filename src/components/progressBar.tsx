"use client";
import React from "react";

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  const getProgressColor = () => {
    if (progress < 50) return "bg-red-500"; // Red for beginning
    if (progress < 100) return "bg-blue-400"; // Blue for halfway
    return "bg-green-700"; // Green for complete 
  };

  return (
    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
      <div
        className={`h-full ${getProgressColor()} transition-all`}
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;

