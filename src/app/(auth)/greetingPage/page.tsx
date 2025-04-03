"use client";

import { useRouter } from 'next/navigation';
import React from 'react';

const TaskUp: React.FC = () => {
    const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-800 p-4">
      {/* Header Section */}
      <div className="text-center mb-20">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">TASK UP</h1>
        <p className="text-white max-w-xl text-4xl">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et id mi.
        </p>

        <div className="w-full max-w-xl h-px bg-gray-300 my-6"></div>
      </div>
      
      {/* Buttons Section */}
      <div className="flex flex-col space-y-4 w-full max-w-md">
        <button onClick={() => router.push('/sign-in')} className="px-6 py-3 bg-white border-2 border-white font-semibold text-blue-800 rounded-md hover:bg-gray-800 hover:text-white transition-colors duration-200">
          SIGN IN
        </button>
        <button onClick={() => router.push('/sign-up')} className="px-6 py-3 border-2 border-white font-semibold text-white rounded-md hover:bg-gray-800 hover:text-white transition-colors duration-200">
          SIGN UP
        </button>
      </div>
    </div>
  );
};

export default TaskUp;
