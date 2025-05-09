"use client";

import { useEffect, useRef, useState } from "react";
import io, { Socket } from "socket.io-client";

import ChatBubble from "@/components/messaging/ChatBubble";
import ChatHeader from "@/components/messaging/ChatHeader";
import ChatInput from "@/components/messaging/ChatInput";
import ChatSidebar from "@/components/messaging/ChatSidebar";

// Define the shape of a chat message
type Message = {
  sender: string;
  text: string;
  time: string;
};

export default function MessagesPage() {
  // State to track all messages in the chat
  const [messages, setMessages] = useState<Message[]>([]);

  // State to track current user input
  const [newMessage, setNewMessage] = useState<string>("");

  // State to show if someone is typing
  const [typing, setTyping] = useState<boolean>(false);

  // Ref to hold the socket instance
  const socketRef = useRef<Socket | null>(null);

  // Simulate a current user ID (can be replaced with real user auth later)
  const currentUserId = "You";

  useEffect(() => {
    // Connect to the Socket.io server
    const socket = io("http://localhost:3001");

    socketRef.current = socket;

    // Listen for incoming messages
    socket.on("message", (msg: Message) => {
      setMessages((prev) => [...prev, msg]);
    });

    // Listen for typing indicator
    socket.on("typing", () => {
      setTyping(true);
      // Hide "typing..." after 2 seconds
      setTimeout(() => setTyping(false), 2000);
    });

    // Clean up socket connection on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  // Function to send a message
  const handleSend = () => {
    if (newMessage.trim() && socketRef.current) {
      const messageObj: Message = {
        sender: currentUserId,
        text: newMessage,
        time: new Date().toLocaleTimeString(),
      };

      socketRef.current.emit("message", messageObj); // Emit message to server
      setMessages((prev) => [...prev, messageObj]);  // Add to local state
      setNewMessage("");                             // Clear input
    }
  };

  // Function to notify server the user is typing
  const handleTyping = () => {
    if (socketRef.current) {
      socketRef.current.emit("typing");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar with list of conversations or users */}
      <ChatSidebar />

      {/* Main chat area */}
      <div className="flex flex-col flex-1">
        <ChatHeader />

        {/* Chat messages area */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map((msg, idx) => (
            <ChatBubble
              key={idx}
              sender={msg.sender}
              message={msg.text}
              time={msg.time}
              position={msg.sender === currentUserId ? "right" : "left"}
            />
          ))}

          {/* Typing indicator */}
          {typing && (
            <p className="text-sm text-gray-400">Typing...</p>
          )}
        </div>

        {/* Input field for typing and sending messages */}
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
