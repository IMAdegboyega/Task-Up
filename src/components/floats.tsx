import React from "react";

interface FloatWindowProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const FloatWindow: React.FC<FloatWindowProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4"
      onClick={onClose} // ✅ Click outside closes the modal
    >
      <div 
        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-5xl h-auto max-h-[90vh] overflow-y-auto relative flex flex-col"
        onClick={(e) => e.stopPropagation()} // ✅ Prevent closing when clicking inside
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-5 text-gray-600 hover:text-gray-900 text-lg"
        >
            ✕
        </button>

        {/* Modal Content */}
        {children}
      </div>
    </div>
  );
};

export default FloatWindow;
