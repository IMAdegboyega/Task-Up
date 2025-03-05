import { MoreHorizontal, Clock } from "lucide-react";
import Link from "next/link";
import ProgressBar from "./ProgressBar";

interface ProjectCardProps {
  id: string;
  name: string;
  tags: string[];
  progress: number;
  dueDate: string;
}

export default function ProjectCard({ id, name, tags, progress, dueDate }: ProjectCardProps) {
  const tagColors: Record<string, string> = {
    Design: "text-red-500",
    Important: "text-orange-500",
    Database: "text-green-500",
  };

  return (
    <Link href={`/projects/${id}`} passHref>
      <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-200 cursor-pointer hover:shadow-xl transition">
        {/* Header */}
        <div className="flex justify-between items-center mb-2">
          <span className={`text-sm font-semibold ${tagColors[tags[0]]}`}>
            ● {tags[0]}
          </span>
          <MoreHorizontal className="text-gray-400 cursor-pointer" size={18} />
        </div>

        {/* Title */}
        <h3 className="font-semibold text-lg text-gray-900">{name}</h3>

        {/* Progress Bar */}
        <ProgressBar progress={progress} />

        {/* Due Date */}
        <div className="flex items-center text-gray-500 text-sm mt-2">
          <Clock size={14} className="mr-1" />
          {progress === 100 ? <span className="text-green-700 font-semibold">Completed</span> : dueDate}
        </div>
      </div>
    </Link>
  );
}
