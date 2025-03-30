// "use client";
// import { useState, useEffect } from "react";
// import io, { Socket } from "socket.io-client";

// interface Message {
//   id: string;
//   sender: string;
//   text: string;
//   timestamp: Date;
//   isGroup: boolean;
// }

// interface Conversation {
//   id: string;
//   name: string;
//   isGroup: boolean;
//   lastMessage?: string;
//   lastMessageTime?: Date;
//   participants?: string[];
// }

// const socket: Socket = io("http://localhost:5000");

// export default function Message() {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [input, setInput] = useState("");
//   const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
//   const [conversations, setConversations] = useState<Conversation[]>([]);
//   const [isTyping, setIsTyping] = useState(false);

//   // Sample data initialization
//   useEffect(() => {
//     const initialConversations: Conversation[] = [
//       {
//         id: "group1",
//         name: "UI/UX Community",
//         isGroup: true,
//         lastMessage: "We share about daily life as designer",
//         lastMessageTime: new Date(),
//         participants: ["Peter John", "Benny Kenn", "Samsudin", "Bella Poarch"]
//       },
//       {
//         id: "group2",
//         name: "Weekly Meet",
//         isGroup: true,
//         lastMessage: "Meeting scheduled for Friday",
//         lastMessageTime: new Date(),
//         participants: ["All Team Members"]
//       },
//       {
//         id: "user1",
//         name: "Peter John",
//         isGroup: false,
//         lastMessage: "Sed ut perspiciatis m...",
//         lastMessageTime: new Date("2021-10-10T05:30:00")
//       },
//       {
//         id: "user2",
//         name: "Chloe Simatupang",
//         isGroup: false,
//         lastMessage: "Hey, check my design update",
//         lastMessageTime: new Date("2021-10-24T04:30:00")
//       }
//     ];

//     setConversations(initialConversations);
//     setActiveConversation(initialConversations[1]); // Default to Weekly Meet
//   }, []);

//   // Socket event handlers
//   useEffect(() => {
//     const handleMessage = (message: Message) => {
//       setMessages(prev => [...prev, message]);
      
//       // Update conversation last message
//       setConversations(prev => prev.map(conv => 
//         conv.id === message.conversationId 
//           ? { ...conv, lastMessage: message.text, lastMessageTime: message.timestamp }
//           : conv
//       ));
//     };

//     const handleTyping = (isTyping: boolean) => {
//       setIsTyping(isTyping);
//     };

//     socket.on("message", handleMessage);
//     socket.on("typing", handleTyping);

//     return () => {
//       socket.off("message", handleMessage);
//       socket.off("typing", handleTyping);
//     };
//   }, []);

//   const sendMessage = () => {
//     if (input.trim() && activeConversation) {
//       const newMessage: Message = {
//         id: Date.now().toString(),
//         sender: "You",
//         text: input,
//         timestamp: new Date(),
//         isGroup: activeConversation.isGroup
//       };

//       socket.emit("message", {
//         ...newMessage,
//         conversationId: activeConversation.id
//       });

//       setMessages(prev => [...prev, newMessage]);
//       setInput("");
//     }
//   };

//   const loadConversation = (conversation: Conversation) => {
//     setActiveConversation(conversation);
//     // In a real app, you would fetch messages for this conversation
//     setMessages([]); // Reset messages for demo
//   };

//   return (
//     <div className="flex h-screen bg-gray-50">
//       {/* Sidebar */}
//       <aside className="w-64 bg-white border-r p-6">
//         <div className="mb-8">
//           <h1 className="text-2xl text-gray-800">GROUPS</h1>
//         </div>

//         <div className="space-y-1 mb-8">
//           {conversations.filter(c => c.isGroup).map(conv => (
//             <button
//               key={conv.id}
//               className={`w-full text-left p-3 rounded-lg ${activeConversation?.id === conv.id ? 'bg-blue-100 text-blue-600 font-medium' : 'hover:bg-gray-100'}`}
//               onClick={() => loadConversation(conv)}
//             >
//               {conv.name}
//             </button>
//           ))}
//         </div>

//         <div className="mb-4">
//           <h1 className="text-lg font-semibold text-gray-800">RECENT MESSAGES</h1>
//           <div className="space-y-1 mt-2">
//             {conversations.filter(c => !c.isGroup).map(conv => (
//               <button
//                 key={conv.id}
//                 className={`w-full text-left p-3 rounded-lg ${activeConversation?.id === conv.id ? 'bg-blue-100 text-blue-600 font-medium' : 'hover:bg-gray-100'}`}
//                 onClick={() => loadConversation(conv)}
//               >
//                 {conv.name}
//               </button>
//             ))}
//           </div>
//         </div>
//       </aside>

//       {/* Main Chat Area */}
//       <main className="flex-1 flex flex-col">
//         {activeConversation ? (
//           <>
//             <header className="p-4 border-b">
//               <h2 className="text-xl font-bold">{activeConversation.name}</h2>
//               {activeConversation.isGroup && (
//                 <p className="text-sm text-gray-500">
//                   {activeConversation.participants?.join(", ")}
//                 </p>
//               )}
//             </header>

//             <div className="flex-1 overflow-y-auto p-6 space-y-6">
//               {/* Recent Messages */}
//               <div className="space-y-4">
//                 {messages.map(msg => (
//                   <div key={msg.id} className="group">
//                     <div className="font-medium">{msg.sender}</div>
//                     <p className="text-gray-800">{msg.text}</p>
//                     <div className="text-xs text-gray-400 mt-1">
//                       {msg.timestamp.toLocaleDateString('en-US', { 
//                         weekday: 'long', 
//                         month: 'long', 
//                         day: 'numeric', 
//                         year: 'numeric',
//                         hour: '2-digit',
//                         minute: '2-digit'
//                       })}
//                     </div>
//                   </div>
//                 ))}

//                 {isTyping && (
//                   <div className="text-sm text-gray-500 italic">Typing...</div>
//                 )}
//               </div>
//             </div>

//             <div className="p-4 border-t">
//               <div className="flex items-center">
//                 <input
//                   type="text"
//                   value={input}
//                   onChange={(e) => setInput(e.target.value)}
//                   onKeyDown={() => socket.emit("typing", true)}
//                   onKeyUp={() => socket.emit("typing", false)}
//                   className="flex-1 border rounded-l-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder="Type your message..."
//                 />
//                 <button
//                   onClick={sendMessage}
//                   className="bg-blue-600 text-white px-6 py-3 rounded-r-lg hover:bg-blue-700 transition"
//                 >
//                   SEND
//                 </button>
//               </div>
//             </div>
//           </>
//         ) : (
//           <div className="flex-1 flex items-center justify-center">
//             <p className="text-gray-500">Select a conversation to start chatting</p>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }

export default function Message() {
  return(
    <div>
      <h1 className="text-8xl font-bold text-center mt-20">
        COMING SOON!
      </h1>
    </div>
  )
}

