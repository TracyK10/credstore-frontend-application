"use client";

import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCheckout } from "@/context/CheckoutContext";
import { CheckoutLayout } from "@/components/layout/CheckoutLayout";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import { StepIndicator } from "@/components/checkout/StepIndicator";
import { AccountStep } from "@/components/checkout/steps/AccountStep";
import { ShippingStep } from "@/components/checkout/steps/ShippingStep";
import { PaymentStep } from "@/components/checkout/steps/PaymentStep";

export function CheckoutContent() {
  const { currentStep, setCurrentStep, resetCheckout, accountData } = useCheckout();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Sync URL with current step
  useEffect(() => {
    const stepParam = searchParams.get("step");
    const stepMap: Record<string, 1 | 2 | 3> = {
      account: 1,
      shipping: 2,
      payment: 3,
    };

    if (stepParam && stepParam in stepMap) {
      const newStep = stepMap[stepParam];
      
      // Routing guard: prevent jumping ahead without completing account
      if (newStep > 1 && !accountData.email) {
        router.replace("/checkout?step=account");
        setCurrentStep(1);
      } else if (newStep !== currentStep) {
        setCurrentStep(newStep);
      }
    } else {
      // Default to account step if no valid step param
      router.replace("/checkout?step=account");
      setCurrentStep(1);
    }
  }, [searchParams, accountData.email, currentStep, router, setCurrentStep]);

  // Update URL when step changes programmatically
  useEffect(() => {
    const stepNames = ["account", "shipping", "payment"];
    const currentStepName = stepNames[currentStep - 1];
    const stepParam = searchParams.get("step");
    
    if (stepParam !== currentStepName) {
      router.push(`/checkout?step=${currentStepName}`, { scroll: false });
    }
  }, [currentStep, searchParams, router]);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <AccountStep />;
      case 2:
        return <ShippingStep />;
      case 3:
        return <PaymentStep />;
      default:
        return <AccountStep />;
    }
  };

  return (
    <CheckoutLayout sidebar={<OrderSummary />}>
      <StepIndicator currentStep={currentStep} />
      {renderStep()}
    </CheckoutLayout>
  );
}
