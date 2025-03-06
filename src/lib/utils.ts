import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


// Global Constants
export const STATUS_OPTIONS = ["Not Started", "In Progress", "Completed"];
export const PRIORITY_LEVELS = ["Low", "Medium", "High"];

// Helper Functions
export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }); 
};

export const isTaskCompleted = (progress: number) => progress >= 100;

