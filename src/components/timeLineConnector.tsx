export default function TimelineConnector() {
  return (
    <div className="flex flex-col items-center">
      {/* Top Circle */}
      <div className="w-5 h-5 border-2 border-blue-700 rounded-full flex items-center justify-center">
        <div className="w-3 h-3 bg-blue-700 rounded-full"></div>
      </div>

      {/* Vertical Line */}
      <div className="w-1 bg-blue-700 h-16"></div>

      {/* Middle Circle */}
      <div className="w-3 h-3 bg-blue-700 rounded-full"></div>

      {/* Vertical Line */}
      <div className="w-1 bg-blue-700 h-16"></div>
    </div>
  );
}

