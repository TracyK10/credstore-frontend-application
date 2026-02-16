"use client";

import React, { useState, useEffect } from "react";
import { useCheckout } from "@/context/CheckoutContext";
import { useTranslation } from "@/hooks/useTranslation";
import { ValidatedInput } from "@/components/ui/ValidatedInput";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import {
  validateRequired,
  validateCardNumber,
  validateExpirationMonth,
  validateExpirationYear,
  validateCVC,
} from "@/lib/validation";

export const PaymentStep: React.FC = () => {
  const { paymentData, updatePaymentData, setCurrentStep } = useCheckout();
  const { t } = useTranslation();

  const [savedCard, setSavedCard] = useState(paymentData.savedCard);
  const [nameOnCard, setNameOnCard] = useState(paymentData.nameOnCard);
  const [cardNumber, setCardNumber] = useState(paymentData.cardNumber);
  const [expirationMonth, setExpirationMonth] = useState(paymentData.expirationMonth);
  const [expirationYear, setExpirationYear] = useState(paymentData.expirationYear);
  const [cvc, setCvc] = useState(paymentData.cvc);
  const [loading, setLoading] = useState(false);

  const [nameValid, setNameValid] = useState(false);
  const [cardNumberValid, setCardNumberValid] = useState(false);
  const [monthValid, setMonthValid] = useState(false);
  const [yearValid, setYearValid] = useState(false);
  const [cvcValid, setCvcValid] = useState(false);

  const [nameError, setNameError] = useState("");
  const [cardNumberError, setCardNumberError] = useState("");
  const [monthError, setMonthError] = useState("");
  const [yearError, setYearError] = useState("");
  const [cvcError, setCvcError] = useState("");

  // Validate name on card
  useEffect(() => {
    if (nameOnCard) {
      const result = validateRequired(nameOnCard, "Name");
      setNameValid(result.isValid);
      setNameError(result.errorMessage || "");
    }
  }, [nameOnCard]);

  // Validate card number (only allow numeric input)
  useEffect(() => {
    if (cardNumber) {
      const result = validateCardNumber(cardNumber);
      setCardNumberValid(result.isValid);
      setCardNumberError(result.errorMessage || "");
    }
  }, [cardNumber]);

  // Validate expiration month
  useEffect(() => {
    if (expirationMonth) {
      const result = validateExpirationMonth(expirationMonth);
      setMonthValid(result.isValid);
      setMonthError(result.errorMessage || "");
    }
  }, [expirationMonth]);

  // Validate expiration year
  useEffect(() => {
    if (expirationYear) {
      const result = validateExpirationYear(expirationYear);
      setYearValid(result.isValid);
      setYearError(result.errorMessage || "");
    }
  }, [expirationYear]);

  // Validate CVC
  useEffect(() => {
    if (cvc) {
      const result = validateCVC(cvc);
      setCvcValid(result.isValid);
      setCvcError(result.errorMessage || "");
    }
  }, [cvc]);

  const handleCardNumberChange = (value: string) => {
    // Only allow numeric characters
    const numericValue = value.replace(/\D/g, "");
    setCardNumber(numericValue);
  };

  const handleMonthChange = (value: string) => {
    // Only allow 2 digits
    const numericValue = value.replace(/\D/g, "").slice(0, 2);
    setExpirationMonth(numericValue);
  };

  const handleYearChange = (value: string) => {
    // Only allow 2 digits
    const numericValue = value.replace(/\D/g, "").slice(0, 2);
    setExpirationYear(numericValue);
  };

  const handleCvcChange = (value: string) => {
    // Only allow 3-4 digits
    const numericValue = value.replace(/\D/g, "").slice(0, 4);
    setCvc(numericValue);
  };

  const handleSavedCardChange = (value: string) => {
    setSavedCard(value);
    
    // Pre-fill fields with saved card
    if (value === "mastercard") {
      setNameOnCard("John Smith");
      setCardNumber("1234567890123456");
      setExpirationMonth("03");
      setExpirationYear("24");
      setCvc("123");
    }
  };

  const handleComplete = async () => {
    setLoading(true);
    
    // Save to context
    updatePaymentData({
      savedCard,
      nameOnCard,
      cardNumber,
      expirationMonth,
      expirationYear,
      cvc,
    });

    try {
      // Call API to complete order
      const response = await fetch("/api/checkout/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nameOnCard,
          cardNumber,
          expirationMonth,
          expirationYear,
          cvc,
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        alert("Order completed successfully!");
        // Reset checkout or redirect
      } else {
        alert("Order failed: " + data.message);
      }
    } catch (error) {
      alert("Error completing order");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = nameValid && cardNumberValid && monthValid && yearValid && cvcValid;

  return (
    <div className="bg-[#F7FAFC] p-8 rounded-lg">
      <h2 className="text-2xl font-semibold text-text-primary mb-6">
        {t("payment.title")}
      </h2>

      <Select
        label={t("payment.savedCard")}
        value={savedCard}
        onChange={handleSavedCardChange}
        options={[
          { value: "", label: "Select card" },
          { value: "mastercard", label: "Mastercard ending 234" },
        ]}
      />

      <ValidatedInput
        label={t("payment.nameOnCard")}
        value={nameOnCard}
        onChange={setNameOnCard}
        isValid={nameValid}
        errorMessage={nameError}
        placeholder="John Smith"
      />

      <ValidatedInput
        label={t("payment.cardNumber")}
        value={cardNumber}
        onChange={handleCardNumberChange}
        isValid={cardNumberValid}
        errorMessage={cardNumberError}
        placeholder="123 - 456 -"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-text-secondary mb-2">
            {t("payment.expiration")}
          </label>
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={expirationMonth}
              onChange={(e) => handleMonthChange(e.target.value)}
              placeholder="03"
              maxLength={2}
              className="w-20 px-4 py-3 bg-input-bg border border-input-border rounded-lg text-input-text focus:outline-none focus:ring-2 focus:ring-primary text-center"
            />
            <span className="text-text-secondary text-xl">/</span>
            <input
              type="text"
              value={expirationYear}
              onChange={(e) => handleYearChange(e.target.value)}
              placeholder="24"
              maxLength={2}
              className="w-20 px-4 py-3 bg-input-bg border border-input-border rounded-lg text-input-text focus:outline-none focus:ring-2 focus:ring-primary text-center"
            />
          </div>
          {(monthError || yearError) && (
            <p className="text-red-500 text-sm mt-1">
              {monthError || yearError}
            </p>
          )}
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <label className="text-sm text-text-secondary">{t("payment.cvc")}</label>
            <svg
              className="w-4 h-4 text-text-secondary cursor-help"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            value={cvc}
            onChange={(e) => handleCvcChange(e.target.value)}
            placeholder="123"
            maxLength={4}
            className="w-full px-4 py-3 bg-input-bg border border-input-border rounded-lg text-input-text focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {cvcError && <p className="text-red-500 text-sm mt-1">{cvcError}</p>}
        </div>
      </div>

      <div className="flex items-center justify-end gap-6 mt-8 pt-6 border-t border-gray-200">
        <button 
          onClick={() => setCurrentStep(2)}
          className="text-gray-600 hover:text-gray-800 transition-colors font-normal"
        >
          {t("common.cancelOrder")}
        </button>

        <Button
          variant="primary"
          onClick={handleComplete}
          disabled={!isFormValid}
          loading={loading}
        >
          {t("payment.completeButton")}
        </Button>
      </div>
    </div>
  );
};
