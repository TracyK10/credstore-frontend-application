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

  // Helper to determine if a transition node should be completed
  const isNodeCompleted = (nodeIndex: number) => {
    // Node 0 (after Account) is completed when currentStep > 1
    // Node 1 (after Shipping) is completed when currentStep > 2
    return currentStep > nodeIndex + 1;
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-center">
        {steps.map((step, stepIndex) => (
          <React.Fragment key={step.number}>
            {/* Step Label */}
            <div className="px-4">
              <span
                className={`text-lg font-semibold whitespace-nowrap ${
                  step.number <= currentStep
                    ? "text-[#3182CE]"
                    : "text-text-secondary"
                }`}
              >
                {step.label}
              </span>
            </div>

            {/* Connector Line + Node (if not last step) */}
            {stepIndex < steps.length - 1 && (
              <>
                {/* Line before node */}
                <div
                  className={`h-0.5 w-8 transition-all ${
                    isNodeCompleted(stepIndex) ? "bg-[#3182CE]" : "bg-gray-300"
                  }`}
                />

                {/* Tick Node - Always visible with spacing */}
                <div
                  className={`flex items-center justify-center w-6 h-6 rounded-full border-2 transition-all mx-2 ${
                    isNodeCompleted(stepIndex)
                      ? "bg-black border-black"
                      : "bg-transparent border-gray-300"
                  }`}
                >
                  {isNodeCompleted(stepIndex) && (
                    <svg
                      className="w-3.5 h-3.5 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>

                {/* Line after node */}
                <div
                  className={`h-0.5 w-8 transition-all ${
                    isNodeCompleted(stepIndex) ? "bg-[#3182CE]" : "bg-gray-300"
                  }`}
                />
              </>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
