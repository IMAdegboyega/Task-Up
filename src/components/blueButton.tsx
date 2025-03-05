import { ReactNode } from "react";
import { cn } from "@/lib/utils"; // Utility for handling classNames

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
        "flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-colors hover:scale-105",
        {
          "bg-blue-800 text-white hover:bg-blue-900": variant === "filled" && active,
          "bg-blue-100 text-black hover:bg-gray-200": variant === "outlined",
          "border border-gray-300 text-black hover:bg-gray-100": variant === "ghost",
        }
      )}
    >
      {icon && <span className="text-lg">{icon}</span>}
      {label}
    </button>
  );
}

