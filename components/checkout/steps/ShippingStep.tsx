"use client";

import React, { useState, useEffect } from "react";
import { useCheckout } from "@/context/CheckoutContext";
import { useTranslation } from "@/hooks/useTranslation";
import { ValidatedInput } from "@/components/ui/ValidatedInput";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { validateRequired, validatePostcode } from "@/lib/validation";

export const ShippingStep: React.FC = () => {
  const { shippingData, updateShippingData, setCurrentStep } = useCheckout();
  const { t } = useTranslation();

  const [savedAddress, setSavedAddress] = useState(shippingData.savedAddress);
  const [firstLine, setFirstLine] = useState(shippingData.firstLine);
  const [streetName, setStreetName] = useState(shippingData.streetName);
  const [postcode, setPostcode] = useState(shippingData.postcode);
  const [shippingMethod, setShippingMethod] = useState(shippingData.shippingMethod);

  const [firstLineValid, setFirstLineValid] = useState(false);
  const [streetNameValid, setStreetNameValid] = useState(false);
  const [postcodeValid, setPostcodeValid] = useState(false);

  const [firstLineError, setFirstLineError] = useState("");
  const [streetNameError, setStreetNameError] = useState("");
  const [postcodeError, setPostcodeError] = useState("");

  // Validate first line
  useEffect(() => {
    if (firstLine) {
      const result = validateRequired(firstLine, "First line");
      setFirstLineValid(result.isValid);
      setFirstLineError(result.errorMessage || "");
    }
  }, [firstLine]);

  // Validate street name
  useEffect(() => {
    if (streetName) {
      const result = validateRequired(streetName, "Street name");
      setStreetNameValid(result.isValid);
      setStreetNameError(result.errorMessage || "");
    }
  }, [streetName]);

  // Validate postcode
  useEffect(() => {
    if (postcode) {
      const result = validatePostcode(postcode);
      setPostcodeValid(result.isValid);
      setPostcodeError(result.errorMessage || "");
    }
  }, [postcode]);

  const handleSavedAddressChange = (value: string) => {
    setSavedAddress(value);
    
    // Pre-fill fields with saved address
    if (value === "electric") {
      setFirstLine("123");
      setStreetName("Electric avenue");
      setPostcode("ABC - 123");
    }
  };

  const handleNext = async () => {
    // Save to context
    updateShippingData({
      savedAddress,
      firstLine,
      streetName,
      postcode,
      shippingMethod,
    });
    
    // Move to next step
    setCurrentStep(3);
  };

  const isFormValid = firstLineValid && streetNameValid && postcodeValid;

  return (
    <div>
      <h2 className="text-2xl font-semibold text-text-primary mb-6">
        {t("shipping.title")}
      </h2>

      <Select
        label={t("shipping.savedAddress")}
        value={savedAddress}
        onChange={handleSavedAddressChange}
        options={[
          { value: "", label: "Select address" },
          { value: "electric", label: "123 , Electric avenue" },
        ]}
      />

      <ValidatedInput
        label={t("shipping.firstLine")}
        value={firstLine}
        onChange={setFirstLine}
        isValid={firstLineValid}
        errorMessage={firstLineError}
        placeholder="123"
      />

      <ValidatedInput
        label={t("shipping.streetName")}
        value={streetName}
        onChange={setStreetName}
        isValid={streetNameValid}
        errorMessage={streetNameError}
        placeholder="Electric avenue"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ValidatedInput
          label={t("shipping.postcode")}
          value={postcode}
          onChange={setPostcode}
          isValid={postcodeValid}
          errorMessage={postcodeError}
          placeholder="ABC - 123"
        />

        <Select
          label={t("shipping.selectShipping")}
          value={shippingMethod}
          onChange={setShippingMethod}
          options={[
            { value: "free", label: t("shipping.freeDelivery") },
            { value: "express", label: "Express delivery - £5.00" },
          ]}
        />
      </div>

      <div className="flex items-center justify-end gap-6 mt-8 pt-6 border-t border-gray-200">
        <button 
          onClick={() => setCurrentStep(1)}
          className="text-gray-600 hover:text-gray-800 transition-colors font-normal"
        >
          {t("common.cancelOrder")}
        </button>

        <Button
          variant="primary"
          onClick={handleNext}
          disabled={!isFormValid}
        >
          {t("shipping.nextButton")}
        </Button>
      </div>
    </div>
  );
};
