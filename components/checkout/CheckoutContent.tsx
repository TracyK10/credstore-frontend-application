"use client";

import React, { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCheckout } from "@/context/CheckoutContext";
import { CheckoutLayout } from "@/components/layout/CheckoutLayout";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import { StepIndicator } from "@/components/checkout/StepIndicator";
import { AccountStep } from "@/components/checkout/steps/AccountStep";
import { ShippingStep } from "@/components/checkout/steps/ShippingStep";
import { PaymentStep } from "@/components/checkout/steps/PaymentStep";

export function CheckoutContent() {
  const { currentStep, setCurrentStep, accountData } = useCheckout();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isInitialMount = useRef(true);

  // Single useEffect: Handle ONLY browser history changes and initial mount
  useEffect(() => {
    const stepParam = searchParams.get("step");
    const stepMap: Record<string, 1 | 2 | 3> = {
      account: 1,
      shipping: 2,
      payment: 3,
    };

    // Default to account if no step param
    if (!stepParam || !(stepParam in stepMap)) {
      if (isInitialMount.current) {
        router.replace("/checkout?step=account");
        isInitialMount.current = false;
      }
      return;
    }

    const urlStep = stepMap[stepParam];
    
    // Routing guard: prevent jumping ahead without completing account
    if (urlStep > 1 && !accountData.email) {
      router.replace("/checkout?step=account");
      setCurrentStep(1);
      return;
    }

    // Only update state if URL step differs from current step
    // This handles browser back/forward navigation
    if (urlStep !== currentStep) {
      setCurrentStep(urlStep);
    }

    isInitialMount.current = false;
  }, [searchParams]); // Only depend on searchParams to avoid circular updates

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
