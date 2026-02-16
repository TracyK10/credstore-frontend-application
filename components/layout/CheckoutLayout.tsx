"use client";

import React from "react";
import { Header } from "./Header";

interface CheckoutLayoutProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}

export const CheckoutLayout: React.FC<CheckoutLayoutProps> = ({
  children,
  sidebar,
}) => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-[#F7FAFC] rounded-lg px-16 py-8">
              {children}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {sidebar}
          </div>
        </div>
      </main>
    </div>
  );
};
