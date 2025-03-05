"use client";
import { useState } from "react";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search here..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 border rounded-full bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
