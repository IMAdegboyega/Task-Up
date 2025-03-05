import React from "react";
import ProgressBar from "./progressBar";
import Image from "next/image";

interface TaskCardProps {
  name: string;
  title?: string;
  tags?: string[];
  progress: number;
  tasksDone: number;
  dueDate?: string;
  userImage?: string;
  userName?: string;
  userRole?: string;
}

const TaskCard: React.FC<TaskCardProps> = ({
  name,
  title,
  tags = [],
  progress,
  tasksDone,
  dueDate,
  userImage,
  userName,
  userRole,
}) => {
  const tagColors: Record<string, string> = {
    "DESKTOP APP": "bg-white text-purple-700",
    "MOBILE": "bg-white text-red-700",
    "WEBSITE": "bg-white text-red-700",
    "WEB APP": "bg-white text-blue-800",
  };

  return (
    
    <div className="bg-gray-200 rounded-lg shadow-none p-4 w-80 border border-gray-300">
      {/* Project Name & Title */}
      <h1 className="text-md font-semibold text-gray-900">{name}</h1>
      {title && <h2 className="text-sm font-bold text-gray-700">({title})</h2>}

      {/* User Info */}
      {userImage && userName && (
        <div className="flex items-center mt-3">
          <Image src={userImage} alt={userName} width={30} height={30} className="rounded-full" />
          <div className="ml-2">
            <p className="text-sm font-medium text-gray-900">{userName}</p>
            {userRole && <p className="text-xs text-gray-500">{userRole}</p>}
          </div>
        </div>
      )}

      {/* Tags */}
      {tags.length > 0 && (
        <div className={`mt-2 inline-block px-3 py-1 text-xs font-bold rounded-md ${tagColors[tags[0]] || "bg-white text-gray-700"}`}>
          {tags[0]}
        </div>
      )}

      {/* Progress Bar */}
      <div className="mt-3">
        <ProgressBar progress={progress} />
      </div>

      {/* Footer - Task Count & Status */}
      <div className="flex justify-between items-center mt-3 text-sm">
        <p className="font-bold text-gray-700">
          {tasksDone} Task{tasksDone !== 1 ? "s" : ""} Done
        </p>
        {progress === 100 ? (
          <p className="text-green-700 font-semibold">Completed</p>
        ) : (
          dueDate && <p className="text-red-600 font-semibold">Due date: {dueDate}</p>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
