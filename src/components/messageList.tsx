// components/MessageList.tsx
import React from 'react';

interface Message {
  _id: string;
  senderId: string;
  recipientId: string;
  content: string;
  timestamp: string;
}

interface MessageListProps {
  messages: Message[];
  currentUserId: string;
}

const MessageList: React.FC<MessageListProps> = ({ messages, currentUserId }) => {
  return (
    <div className="flex flex-col gap-2 p-4 overflow-y-auto h-full">
      {messages.map((msg) => (
        <div
          key={msg._id}
          className={`p-2 rounded-lg max-w-xs ${
            msg.senderId === currentUserId
              ? 'bg-blue-500 text-white self-end'
              : 'bg-gray-200 text-black self-start'
          }`}
        >
          <p>{msg.content}</p>
          <span className="text-xs text-gray-500 block mt-1">
            {new Date(msg.timestamp).toLocaleTimeString()}
          </span>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
