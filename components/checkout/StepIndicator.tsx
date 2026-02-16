"use client";

import React from "react";
import { useTranslation } from "@/hooks/useTranslation";

interface StepIndicatorProps {
  currentStep: 1 | 2 | 3;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
  const { t } = useTranslation();

  const steps = [
    { number: 1, label: t("steps.account") },
    { number: 2, label: t("steps.shipping") },
    { number: 3, label: t("steps.payment") },
  ];

  return (
    <div className="flex items-center justify-center gap-0 mb-8">
      {steps.map((step, index) => (
        <React.Fragment key={step.number}>
          <div className="flex flex-col items-center gap-2">
            {/* Step circle - positioned as node between lines */}
            <div
              className={`flex items-center justify-center w-7 h-7 rounded-full border-2 transition-all ${
                step.number < currentStep
                  ? "bg-black border-black"
                  : step.number === currentStep
                  ? "bg-transparent border-[#3182CE]"
                  : "bg-transparent border-gray-300"
              }`}
            >
              {step.number < currentStep ? (
                <svg
                  className="w-4 h-4 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : null}
            </div>

            {/* Step label */}
            <span
              className={`text-sm font-medium whitespace-nowrap ${
                step.number === currentStep
                  ? "text-[#3182CE]"
                  : step.number < currentStep
                  ? "text-text-primary"
                  : "text-text-secondary"
              }`}
            >
              {step.label}
            </span>
          </div>

          {/* Connecting line - between circles */}
          {index < steps.length - 1 && (
            <div
              className={`h-0.5 w-16 mb-7 transition-all ${
                step.number < currentStep ? "bg-[#3182CE]" : "bg-gray-300"
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
