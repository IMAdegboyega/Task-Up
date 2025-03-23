import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BlueButtonProps {
  label: string;
  icon?: ReactNode;
  variant?: "filled" | "outlined" | "ghost";
  active?: boolean;
  onClick?: () => void;
}

export default function BlueButton({
  label,
  icon,
  variant = "filled",
  active = false,
  onClick,
}: BlueButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-transform duration-200 hover:scale-105",
        {
          "bg-blue-800 text-white hover:bg-blue-900": variant === "filled",
          "bg-blue-100 text-blue-900 hover:bg-blue-200": variant === "outlined",
          "border border-gray-300 text-gray-900 hover:bg-gray-100": variant === "ghost",
        }
      )}
    >
      {icon && <span className="text-lg">{icon}</span>}
      {label}
    </button>
  );
}
