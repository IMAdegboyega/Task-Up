// pages/messages.tsx
"use client";

import ChatBubble from "@/components/messaging/chatbubble";
import ChatHeader from "@/components/messaging/chatheader";
import ChatInput from "@/components/messaging/chatinput";
import ChatSidebar from "@/components/messaging/chatsidebar";
import { useEffect, useState } from "react";
import io from "socket.io-client";

let socket: any;  

export default function MessagesPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [typing, setTyping] = useState(false);

  const currentUserId = "You";

  useEffect(() => { 
    socket = io("http://localhost:3001"); // Point this to your backend

    socket.on("message", (msg: any) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on("typing", () => {
      setTyping(true);
      setTimeout(() => setTyping(false), 2000);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSend = () => {
    if (newMessage.trim()) {
      const messageObj = {
        sender: "You",
        text: newMessage,
        time: new Date().toLocaleTimeString(),
      };
      socket.emit("message", messageObj);
      setMessages((prev) => [...prev, messageObj]);
      setNewMessage("");
    }
  };

  const handleTyping = () => {
    socket.emit("typing");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <ChatSidebar />
      <div className="flex flex-col flex-1">
        <ChatHeader />
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map((msg, idx) => (
            <ChatBubble key={idx} sender={msg.sender} message={msg.text} time={msg.time} position={msg.sender === currentUserId ? "right" : "left"}/>
          ))}
          {typing && <p className="text-sm text-gray-400">Typing...</p>}
        </div>
        <ChatInput
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onSend={handleSend}
          onTyping={handleTyping}
        />
      </div>
    </div>
  );
}
