import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

const groups = [
  "Kleon Team",
  "UI/UX Community",
  "Weekly Meet",
  "We Are Designer",
];

const recentMessages = [
  { name: "Peter John", message: "Maybe we should schedule that meeting", status: "new" },
  { name: "Benny Kenn", message: "Hey, don’t forget to clear server cache!", status: "new" },
  { name: "Samsudin", message: "Ok sir. I will fix it as soon as possible", status: "online" },
  { name: "Bella Paorch", message: "I don’t know where that flies saved dude.", status: "offline" },
];

export default function ChatSidebar() {
  return (
    <div className="bg-white w-72 p-4 border-r space-y-6">
      <div>
        <h2 className="text-sm font-bold text-gray-700 mb-2">GROUP</h2>
        <ul className="space-y-2">
          {groups.map((group, idx) => (
            <li key={idx} className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 p-2 rounded">
              <div className="bg-gray-200 rounded-full h-8 w-8" />
              <span className="text-sm text-gray-800 font-medium">{group}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="text-sm font-bold text-gray-700 mb-2">RECENT MESSAGE</h2>
        <ScrollArea className="h-64 pr-2">
          {recentMessages.map((msg, idx) => (
            <div key={idx} className="flex items-center justify-between p-2 hover:bg-gray-100 rounded cursor-pointer">
              <div className="flex items-center space-x-2">
                <div className="bg-gray-300 rounded-full h-8 w-8" />
                <div>
                  <p className="text-sm font-bold text-gray-800">{msg.name}</p>
                  <p className="text-xs text-gray-500 line-clamp-1">{msg.message}</p>
                </div>
              </div>
              {msg.status === "new" && <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">NEW</span>}
            </div>
          ))}
        </ScrollArea>
      </div>
    </div>
  );
}