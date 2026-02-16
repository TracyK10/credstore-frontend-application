"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import type {
  CheckoutContextType,
  CheckoutState,
  AccountData,
  ShippingData,
  PaymentData,
  OrderSummaryData,
} from "@/types/checkout";

const initialState: CheckoutState = {
  currentStep: 1,
  accountData: {
    email: "",
    password: "",
  },
  shippingData: {
    savedAddress: "",
    firstLine: "",
    streetName: "",
    postcode: "",
    shippingMethod: "free",
  },
  paymentData: {
    savedCard: "",
    nameOnCard: "",
    cardNumber: "",
    expirationMonth: "",
    expirationYear: "",
    cvc: "",
  },
  orderSummary: {
    productName: "Sony wireless headphones",
    productImage: "/headphones.jpg",
    productPrice: 320.45,
    quantity: 1,
    subtotal: 316.55,
    tax: 3.45,
    shipping: 0,
    total: 320.45,
  },
};

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

export const CheckoutProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<CheckoutState>(initialState);

  const setCurrentStep = (step: 1 | 2 | 3) => {
    setState((prev) => ({ ...prev, currentStep: step }));
  };

  const nextStep = () => {
    setState((prev) => ({
      ...prev,
      currentStep: Math.min(3, prev.currentStep + 1) as 1 | 2 | 3,
    }));
  };

  const prevStep = () => {
    setState((prev) => ({
      ...prev,
      currentStep: Math.max(1, prev.currentStep - 1) as 1 | 2 | 3,
    }));
  };

  const updateAccountData = (data: Partial<AccountData>) => {
    setState((prev) => ({
      ...prev,
      accountData: { ...prev.accountData, ...data },
    }));
  };

  const updateShippingData = (data: Partial<ShippingData>) => {
    setState((prev) => ({
      ...prev,
      shippingData: { ...prev.shippingData, ...data },
    }));
  };

  const updatePaymentData = (data: Partial<PaymentData>) => {
    setState((prev) => ({
      ...prev,
      paymentData: { ...prev.paymentData, ...data },
    }));
  };

  const updateOrderSummary = (data: Partial<OrderSummaryData>) => {
    setState((prev) => ({
      ...prev,
      orderSummary: { ...prev.orderSummary, ...data },
    }));
  };

  const resetCheckout = () => {
    setState(initialState);
  };

  const value: CheckoutContextType = {
    ...state,
    setCurrentStep,
    nextStep,
    prevStep,
    updateAccountData,
    updateShippingData,
    updatePaymentData,
    updateOrderSummary,
    resetCheckout,
  };

  return (
    <CheckoutContext.Provider value={value}>
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckout = (): CheckoutContextType => {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error("useCheckout must be used within CheckoutProvider");
  }
  return context;
};
