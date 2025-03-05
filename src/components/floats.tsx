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
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose} // ✅ Click outside closes the modal
    >
      <div 
        className="bg-white rounded-lg shadow-lg p-6 w-96 relative"
        onClick={(e) => e.stopPropagation()} // ✅ Prevent closing when clicking inside
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-600 hover:text-gray-900"
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
