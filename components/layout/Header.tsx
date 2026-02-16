"use client";

import React from "react";
import Link from "next/link";
import { useTranslation } from "@/hooks/useTranslation";

export const Header: React.FC = () => {
  const { t } = useTranslation();

  return (
    <header className="bg-white border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-black text-text-primary" style={{ fontWeight: 950, letterSpacing: '-0.02em' }}>dummy.</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-text-primary hover:text-primary transition-colors"
            >
              {t("navigation.home")}
            </Link>
            <Link
              href="/shop"
              className="text-text-primary hover:text-primary transition-colors"
            >
              {t("navigation.shop")}
            </Link>
            <Link
              href="/contact"
              className="text-text-primary hover:text-primary transition-colors"
            >
              {t("navigation.contact")}
            </Link>
            <Link
              href="/help"
              className="text-text-primary hover:text-primary transition-colors"
            >
              {t("navigation.help")}
            </Link>
          </nav>

          {/* Account and Cart */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 cursor-pointer group">
              <span className="text-text-primary group-hover:text-primary transition-colors">
                {t("navigation.account")}
              </span>
              <img 
                src="/arrow-down-s-fill.svg" 
                alt="dropdown"
                className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity"
              />
            </div>

            <div className="flex items-center gap-2">
              <svg
                className="w-6 h-6 text-text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <span className="text-text-primary">3 {t("navigation.items")}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
