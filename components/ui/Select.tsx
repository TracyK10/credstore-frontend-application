"use client";

import React from "react";

interface SelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  disabled?: boolean;
  horizontal?: boolean;
}

export const Select: React.FC<SelectProps> = ({
  label,
  value,
  onChange,
  options,
  disabled = false,
  horizontal = false,
}) => {
  const selectElement = (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="w-full px-4 py-3 bg-[#E2E8F0] rounded-md text-input-text outline-none focus:outline-none appearance-none cursor-pointer"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
        <svg
          className="w-4 h-4 text-text-secondary"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );

  if (horizontal) {
    return (
      <div className="flex items-center justify-between gap-4 mb-4">
        <label className="text-sm text-text-secondary whitespace-nowrap">
          {label}
        </label>
        <div className="flex-1 max-w-md">
          {selectElement}
        </div>
      </div>
    );
  }

  return (
    <div className="mb-4">
      <label className="block text-sm text-text-secondary mb-2">{label}</label>
      {selectElement}
    </div>
  );
};
