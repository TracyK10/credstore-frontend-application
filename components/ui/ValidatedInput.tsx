"use client";

import React from "react";

interface ValidatedInputProps {
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  isValid?: boolean;
  errorMessage?: string;
  placeholder?: string;
  disabled?: boolean;
}

export const ValidatedInput: React.FC<ValidatedInputProps> = ({
  label,
  type = "text",
  value,
  onChange,
  onBlur,
  isValid,
  errorMessage,
  placeholder,
  disabled = false,
}) => {
  const showCheckmark = isValid && value.trim().length > 0;

  return (
    <div className="mb-4">
      <label className="block text-sm text-text-secondary mb-2">{label}</label>
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full px-4 py-3 bg-input-bg border rounded-lg text-input-text focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
            showCheckmark ? "pr-12 border-success" : "border-input-border"
          } ${errorMessage && !isValid ? "border-red-500" : ""}`}
        />
        {showCheckmark && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <svg
              className="w-5 h-5 text-text-primary bg-white rounded-full"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <circle cx="10" cy="10" r="10" fill="black" />
              <path
                fill="white"
                d="M14.707 7.293a1 1 0 00-1.414 0L9 11.586 6.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l5-5a1 1 0 000-1.414z"
              />
            </svg>
          </div>
        )}
      </div>
      {errorMessage && !isValid && value.trim().length > 0 && (
        <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
      )}
    </div>
  );
};
