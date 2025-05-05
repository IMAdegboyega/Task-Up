import React from "react";
import { SendHorizonal, Mic, Paperclip, Smile } from "lucide-react";

type ChatInputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSend: () => void;
  onTyping: () => void;
};

export default function ChatInput({ value, onChange, onSend, onTyping }: ChatInputProps) {
  return (
    <div className="flex items-center gap-3 border-t bg-white p-4">
      <input
        type="text"
        value={value}
        onChange={(e) => {
          onChange(e);
          onTyping();
        }}
        placeholder="Type your message..."
        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none"
      />
      <button onClick={onSend} className="bg-red-600 text-white rounded-lg px-4 py-2 flex items-center gap-1">
        <SendHorizonal size={16} />
        SEND
      </button>
      <Mic className="cursor-pointer text-gray-500" />
      <Paperclip className="cursor-pointer text-gray-500" />
      <Smile className="cursor-pointer text-gray-500" />
    </div>
  );
}
