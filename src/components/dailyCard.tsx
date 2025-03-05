"use client";
import Image from "next/image";
import { CheckCircle, XCircle } from "lucide-react";

interface DailyCardProps {
  title: string;
  description: string;
  time: string;
  attendees: string[]; // Array of image URLs
  isCompleted: boolean;
  onAccept?: () => void;
  onDecline?: () => void;
}

export default function DailyCard({
  title,
  description,
  time,
  attendees,
  isCompleted,
  onAccept,
  onDecline,
}: DailyCardProps) {
  return (
    <div className="bg-blue-700 text-white p-6 rounded-2xl shadow-lg flex justify-between items-center w-full max-w-lg transition-all hover:scale-105">
      {/* Left Side: Meeting Details */}
      <div className="flex flex-col space-y-2">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-sm opacity-90">{description}</p>

        {/* Attendees Avatars */}
        <div className="flex -space-x-2 mt-2">
          {attendees.map((src, index) => (
            <div
              key={index}
              className="w-10 h-10 rounded-full overflow-hidden border-2 border-white"
            >
              <Image
                src={src}
                alt={`Attendee ${index}`}
                width={40}
                height={40}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Right Side: Time & Actions */}
      <div className="flex flex-col items-end">
        <p className="font-semibold text-lg">{time}</p>

        {/* Action Buttons */}
        <div className="mt-4 flex space-x-3">
          {!isCompleted ? (
            <>
              <button
                className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-all"
                onClick={onDecline}
              >
                <XCircle className="w-6 h-6" />
              </button>
              <button
                className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition-all"
                onClick={onAccept}
              >
                <CheckCircle className="w-6 h-6" />
              </button>
            </>
          ) : (
            <CheckCircle className="text-green-500 bg-white p-2 rounded-full w-8 h-8" />
          )}
        </div>
      </div>
    </div>
  );
}
