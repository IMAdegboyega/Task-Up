import React from "react";
import { MoreVertical, Search, Star } from "lucide-react";

export default function ChatHeader() {
  return (
    <div className="flex justify-between items-center p-4 border-b bg-white">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">Weekly Meet</h2>
        <p className="text-xs text-gray-500">We share about daily life as designer in the world</p>
      </div>
      <div className="flex items-center gap-4 text-gray-600">
        <Star className="w-5 h-5 cursor-pointer" />
        <Search className="w-5 h-5 cursor-pointer" />
        <MoreVertical className="w-5 h-5 cursor-pointer" />
      </div>
    </div>
  );
}