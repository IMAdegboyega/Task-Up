import React from "react";
import { MoreVertical } from "lucide-react";

interface Message {
  name: string;
  text: string;
  time: string;
  status?: "online" | "read";
}

interface MessageListProps {
  messages: Message[];
}

const PortableMessage: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-bold text-blue-800">Messages</h2>
        <button className="bg-red-500 text-white px-3 py-1 rounded-full text-sm shadow-sm hover:bg-red-600">
          + New Messages
        </button>
      </div>
      <p className="text-gray-500 text-sm mb-4">Lorem ipsum dolor sit amet</p>

      {/* Messages List */}
      <div className="space-y-4 bg-gray-200">
        {messages.map((msg, index) => (
          <div key={index} className="flex bg-gray-200 items-center justify-between">
            <div className="flex items-center space-x-3">
              {/* Profile Icon (Placeholder) */}
              <div className="w-10 h-10 bg-gray-300 rounded-full relative">
                {msg.status === "online" && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                )}
                {msg.status === "read" && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-blue-500 rounded-full border-2 border-white"></span>
                )}
              </div>
              
              {/* Message Content */}
              <div>
                <h3 className="font-semibold">{msg.name}</h3>
                <p className="text-gray-500 text-sm">{msg.text}</p>
              </div>
            </div>

            {/* Timestamp & More Options */}
            <div className="flex items-center space-x-2">
              <span className="text-gray-400 text-sm">{msg.time}</span>
              <MoreVertical className="text-gray-400 cursor-pointer" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PortableMessage;

