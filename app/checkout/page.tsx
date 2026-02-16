"use client";

import React from "react";
import { useCheckout } from "@/context/CheckoutContext";
import { CheckoutLayout } from "@/components/layout/CheckoutLayout";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import { StepIndicator } from "@/components/checkout/StepIndicator";
import { AccountStep } from "@/components/checkout/steps/AccountStep";
import { ShippingStep } from "@/components/checkout/steps/ShippingStep";
import { PaymentStep } from "@/components/checkout/steps/PaymentStep";
import { Button } from "@/components/ui/Button";
import { useTranslation } from "@/hooks/useTranslation";

export default function CheckoutPage() {
  const { currentStep, resetCheckout } = useCheckout();
  const { t } = useTranslation();

  const handleCancelOrder = () => {
    if (confirm("Are you sure you want to cancel this order?")) {
      resetCheckout();
      window.location.href = "/";
    }
  };

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
