"use client";

import { useState, useCallback } from "react";
import translations from "@/locales/translations.json";

type Locale = "en" | "sw";
type TranslationKey = string;

export const useTranslation = () => {
  const [locale, setLocale] = useState<Locale>("en");

  const t = useCallback(
    (key: TranslationKey): string => {
      const keys = key.split(".");
      let value: any = translations[locale];

      for (const k of keys) {
        if (value && typeof value === "object" && k in value) {
          value = value[k];
        } else {
          return key; // Return key if translation not found
        }
      }

      return typeof value === "string" ? value : key;
    },
    [locale]
  );

  const formatCurrency = useCallback(
    (amount: number): string => {
      const currency = locale === "en" ? "£" : "KSh";
      const formattedAmount = amount.toFixed(2);
      
      if (locale === "en") {
        return `${currency}${formattedAmount}`;
      } else {
        // Swahili format: KSh 320.45
        return `${currency} ${formattedAmount}`;
      }
    },
    [locale]
  );

  return {
    t,
    locale,
    setLocale,
    formatCurrency,
  };
};
