import Image from "next/image";
import React from "react";

interface ButtonProps {
  text: string;
  variant?: "fill" | "border" | "footer" | "disabled";
  width?: number;
  height?: number;
  onClick?: () => void;
  disabled?: boolean;
  icon?: boolean;
}

const Button = ({
  text,
  variant = "fill",
  width = 11,
  height = 11,
  onClick,
  disabled,
  icon,
}: ButtonProps) => {
  const getButtonClass = () => {
    switch (variant) {
      case "fill":
        return "bg-neutral-8 text-neutral-2";
      case "border":
        return "border border-neutral-8 text-neutral-8";
      case "footer":
        return "border border-neutral-2 text-neutral-2";
      case "disabled":
        return "bg-neutral-3 text-neutral-6 cursor-not-allowed";
      default:
        return "border border-neutral-2 text-neutral-2";
    }
  };

  return (
    <button
      disabled={disabled || variant === "disabled"}
      onClick={onClick}
      className={`px-4 py-2 flex items-center justify-center gap-2 cursor-pointer ${getButtonClass()}`}
    >
      <span className="text-display-2 tracking-wide font-semibold">{text}</span>

      {icon && (
        <Image
          src="/icons/Arrow-Right.png"
          alt="arrow"
          width={width}
          height={height}
        />
      )}
    </button>
  );
};

export default Button;
