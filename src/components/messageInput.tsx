// components/MessageInput.tsx
import React, { useState } from 'react';

interface MessageInputProps {
  onSend: (message: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSend }) => {
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    onSend(content.trim());
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center p-2 border-t gap-2">
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="flex-1 px-4 py-2 border rounded-lg"
        placeholder="Type a message..."
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        Send
      </button>
    </form>
  );
};

export default MessageInput;
