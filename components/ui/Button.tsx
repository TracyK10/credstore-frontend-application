"use client";

import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  disabled?: boolean;
  loading?: boolean;
  type?: "button" | "submit";
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = "primary",
  disabled = false,
  loading = false,
  type = "button",
  fullWidth = false,
}) => {
  const baseClasses = "px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2";
  
  const variantClasses = {
    primary: `bg-primary text-white hover:bg-primary-hover disabled:bg-gray-300 disabled:cursor-not-allowed`,
    secondary: `bg-white text-text-primary border border-input-border hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed`,
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${variantClasses[variant]} ${widthClass}`}
    >
      {loading && (
        <svg
          className="animate-spin h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  );
};
