import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// /utils.ts
export const tasks = [
  {
    name: "Reservation System",
    title: "Pushup Studios",
    userImage: "/path/to/image1.jpg",
    userName: "Abigail Lucky",
    userRole: "Team Lead",
    tags: ["DESKTOP APP"],
    progress: 60,
    tasksDone: 12,
    dueDate: "12/05/2020",
  },
  {
    name: "E-commerce Website",
    title: "Tech Innovations",
    userImage: "/path/to/image2.jpg",
    userName: "John Doe",
    userRole: "Developer",
    tags: ["WEB APP"],
    progress: 80,
    tasksDone: 15,
    dueDate: "15/06/2020",
  },
];


// Global Constants
export const STATUS_OPTIONS = ["Not Started", "In Progress", "Completed"];
export const PRIORITY_LEVELS = ["Low", "Medium", "High"];

// Helper Functions
export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
};

export const isTaskCompleted = (progress: number) => progress >= 100;

