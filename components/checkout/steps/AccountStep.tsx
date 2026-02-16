"use client";

import React, { useState, useEffect } from "react";
import { useCheckout } from "@/context/CheckoutContext";
import { useTranslation } from "@/hooks/useTranslation";
import { ValidatedInput } from "@/components/ui/ValidatedInput";
import { Button } from "@/components/ui/Button";
import { validateEmail, validatePassword } from "@/lib/validation";

export const AccountStep: React.FC = () => {
  const { accountData, updateAccountData, setCurrentStep } = useCheckout();
  const { t } = useTranslation();

  const [email, setEmail] = useState(accountData.email);
  const [password, setPassword] = useState(accountData.password);
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Validate email
  useEffect(() => {
    if (email) {
      const result = validateEmail(email);
      setEmailValid(result.isValid);
      setEmailError(result.errorMessage || "");
    }
  }, [email]);

  // Validate password
  useEffect(() => {
    if (password) {
      const result = validatePassword(password);
      setPasswordValid(result.isValid);
      setPasswordError(result.errorMessage || "");
    }
  }, [password]);

  const handleNext = async () => {
    // Save to context
    updateAccountData({ email, password });
    
    // Move to next step
    setCurrentStep(2);
  };

  const isFormValid = emailValid && passwordValid;

  return (
    <div>
      <h2 className="text-2xl font-semibold text-text-primary mb-6">
        {t("account.title")}
      </h2>

      <ValidatedInput
        label={t("account.email")}
        type="email"
        value={email}
        onChange={setEmail}
        isValid={emailValid}
        errorMessage={emailError}
        placeholder="Email@myemail.com"
      />

      <ValidatedInput
        label={t("account.password")}
        type="password"
        value={password}
        onChange={setPassword}
        isValid={passwordValid}
        errorMessage={passwordError}
        placeholder="••••••••"
      />

      <div className="flex items-center justify-end gap-4 mt-6">
        <button className="text-text-secondary hover:text-primary transition-colors">
          {t("account.register")}
        </button>
        
        <Button variant="primary">
          {t("account.login")}
        </Button>
      </div>

      <div className="flex items-center justify-end gap-6 mt-8 pt-6 border-t border-gray-200">
        <button 
          onClick={() => {}}
          className="text-gray-600 hover:text-gray-800 transition-colors font-normal"
        >
          {t("common.cancelOrder")}
        </button>
        
        <Button
          variant="primary"
          onClick={handleNext}
          disabled={!isFormValid}
        >
          {t("account.nextButton")}
        </Button>
      </div>
    </div>
  );
};
