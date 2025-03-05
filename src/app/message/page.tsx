"use client";
import { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000"); // Backend server

export default function Message() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => socket.off("message");
  }, []);

  const sendMessage = () => {
    if (input.trim()) {
      socket.emit("message", { text: input, sender: "You", timestamp: new Date() });
      setInput("");
    }
  };

  return (
    <div className="p-6 flex">
      {/* Sidebar */}
      <aside className="w-1/4 bg-gray-100 p-4">
        <h2 className="font-bold text-lg mb-2">Groups</h2>
        <ul>
          <li className="p-2 bg-blue-500 text-white rounded mb-1">Weekly Meet</li>
          <li className="p-2 bg-gray-200 rounded mb-1">UX/UI Community</li>
        </ul>
      </aside>

      {/* Chat Area */}
      <main className="w-3/4 bg-white p-4 shadow-lg">
        <h2 className="text-xl font-bold mb-4">Weekly Meet</h2>
        <div className="h-80 overflow-y-auto border p-4">
          {messages.map((msg, index) => (
            <p key={index} className="mb-2">
              <strong>{msg.sender}:</strong> {msg.text}
            </p>
          ))}
        </div>

        {/* Input Box */}
        <div className="mt-4 flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 border p-2 rounded-l"
            placeholder="Type a message..."
          />
          <button onClick={sendMessage} className="bg-blue-500 text-white p-2 rounded-r">Send</button>
        </div>
      </main>
    </div>
  );
}
