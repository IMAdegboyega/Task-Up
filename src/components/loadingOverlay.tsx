import React from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";

interface LoadingOverlayProps {
  isOpen: boolean;
  message: string;
  status?: "loading" | "success" | "error";
}

const statusColors = {
  loading: "text-blue-600",
  success: "text-green-600",
  error: "text-red-600",
};

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  isOpen,
  message,
  status = "loading",
}) => {
  if (!isOpen) return null;

  const renderIcon = () => {
    if (status === "loading") {
      return <ImSpinner2 className="animate-spin text-4xl text-blue-600" />;
    } else if (status === "success") {
      return <FaCheckCircle className="text-4xl text-green-500 animate-pulse" />;
    } else {
      return <FaTimesCircle className="text-4xl text-red-500 animate-pulse" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center transition-opacity duration-300">
      <div className="bg-white rounded-xl shadow-xl p-8 flex flex-col items-center w-80 space-y-4 animate-fade-in">
        {renderIcon()}
        <p className={`text-center text-lg font-medium ${statusColors[status]}`}>
          {message}
        </p>
      </div>
    </div>
  );
};

export default LoadingOverlay;
