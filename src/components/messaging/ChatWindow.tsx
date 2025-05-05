"use client";

import ChatSidebar from "@/components/messaging/chatsidebar";
import ChatHeader from "@/components/messaging/chatheader";
import ChatBubble from "@/components/messaging/chatbubble";
import ChatInput from "@/components/messaging/chatinput";
import { useEffect, useState } from "react";
import io from "socket.io-client";

let socket: any;

export default function ChatWindow() {
  const [messages, setMessages] = useState<any[]>([]);  
  const [message, setMessage] = useState("");
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    socket = io("http://localhost:3001");

    socket.on("message", (msg: any) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on("typing", () => {
      setTyping(true);
      setTimeout(() => setTyping(false), 2000);
    });

    return () => socket.disconnect();
  }, []);

  const handleSend = (msg: string) => {
    const messageObj = {
      sender: "You",
      message: msg,
      time: new Date().toLocaleTimeString(),
    };
    socket.emit("message", messageObj);
    setMessages((prev) => [...prev, messageObj]);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <ChatSidebar />
      <div className="flex flex-col flex-1">
        <ChatHeader />
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map((msg, idx) => (
            <ChatBubble
              key={idx}
              sender={msg.sender}
              message={msg.message}
              time={msg.time}
              position={msg.sender === "You" ? "right" : "left"}
            />
          ))}
          {typing && <p className="text-sm text-gray-400">Typing...</p>}
        </div>
        <ChatInput
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onTyping={() => socket.emit("typing")}
            onSend={() => {
                if (message.trim()) {
                    const messageObj = {
                        sender: "You",
                        message: message,
                        time: new Date().toLocaleTimeString(),
                    };
                socket.emit("message", messageObj);
                setMessages((prev) => [...prev, messageObj]);
                setMessage("");
                }
            }}
        />

      </div>
    </div>
  );
}