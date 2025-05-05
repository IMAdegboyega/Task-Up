import React from "react";

type Props = {
  message: string;
  sender?: string;
  time?: string;
  position: "left" | "right";
};

export default function ChatBubble({ message, sender, time, position }: Props) {
  const isLeft = position === "left";

  return (
    <div className={`flex ${isLeft ? "justify-start" : "justify-end"} mb-2`}>
      <div
        className={`max-w-xs px-4 py-2 rounded-lg text-sm shadow-sm ${
          isLeft ? "bg-gray-100 text-gray-900" : "bg-green-700 text-white"
        }`}
      >
        {sender && <p className="font-medium mb-1">{sender}</p>}
        <p>{message}</p>
        {time && <p className="text-[10px] mt-1 opacity-70">{time}</p>}
      </div>
    </div>
  );
}