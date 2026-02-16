"use client";

import React, { useState } from "react";
import { useCheckout } from "@/context/CheckoutContext";
import { useTranslation } from "@/hooks/useTranslation";
import { Button } from "@/components/ui/Button";

export const OrderSummary: React.FC = () => {
  const { orderSummary, updateOrderSummary } = useCheckout();
  const { t, formatCurrency } = useTranslation();
  const [discountCode, setDiscountCode] = useState("");

  const handleQuantityChange = (delta: number) => {
    const newQuantity = Math.max(1, orderSummary.quantity + delta);
    const newSubtotal = orderSummary.productPrice * newQuantity - orderSummary.tax;
    const newTotal = newSubtotal + orderSummary.tax + orderSummary.shipping;
    
    updateOrderSummary({
      quantity: newQuantity,
      subtotal: newSubtotal,
      total: newTotal,
    });
  };

  const handleApplyDiscount = () => {
    // Mock discount application
    console.log("Applying discount:", discountCode);
  };

  return (
    <div className="bg-white p-6 rounded-lg h-fit sticky top-6">
      <h2 className="text-xl font-semibold text-text-primary mb-6">
        {t("orderSummary.title")}
      </h2>

      {/* Product Image */}
      <div className="mb-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg overflow-hidden">
        <img 
          src="/headphone.png" 
          alt="Sony wireless headphones"
          className="w-full h-auto object-cover"
        />
      </div>

      {/* Product Details */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-text-primary mb-2">
          {orderSummary.productName}
        </h3>
        <p className="text-2xl font-bold text-text-primary mb-4">
          {formatCurrency(orderSummary.productPrice)}
        </p>

        {/* Quantity Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleQuantityChange(-1)}
            className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 border-0 flex items-center justify-center transition-colors"
          >
            <span className="text-lg text-text-primary font-medium">−</span>
          </button>
          <span className="text-lg font-medium text-text-primary w-8 text-center">
            {orderSummary.quantity}
          </span>
          <button
            onClick={() => handleQuantityChange(1)}
            className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 border-0 flex items-center justify-center transition-colors"
          >
            <span className="text-lg text-text-primary font-medium">+</span>
          </button>
        </div>
      </div>

      {/* Gift Card / Discount */}
      <div className="mb-6">
        <label className="block text-sm text-text-secondary mb-2">
          {t("orderSummary.giftCard")}
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value)}
            className="flex-1 px-4 py-2 bg-input-bg border border-input-border rounded-lg text-input-text focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Button variant="secondary" onClick={handleApplyDiscount}>
            {t("orderSummary.apply")}
          </Button>
        </div>
      </div>

      {/* Price Breakdown */}
      <div className="space-y-3 border-t border-border pt-4">
        <div className="flex justify-between text-text-secondary">
          <span>{t("orderSummary.subtotal")}</span>
          <span className="font-medium text-text-primary">
            {formatCurrency(orderSummary.subtotal)}
          </span>
        </div>
        <div className="flex justify-between text-text-secondary">
          <span>{t("orderSummary.tax")}</span>
          <span className="font-medium text-text-primary">
            {formatCurrency(orderSummary.tax)}
          </span>
        </div>
        <div className="flex justify-between text-text-secondary">
          <span>{t("orderSummary.shipping")}</span>
          <span className="font-medium text-success">
            {orderSummary.shipping === 0
              ? t("orderSummary.free")
              : formatCurrency(orderSummary.shipping)}
          </span>
        </div>
      </div>

      {/* Total */}
      <div className="flex justify-between items-center mt-4 pt-4 border-t border-border">
        <span className="text-lg font-semibold text-text-primary">
          {t("orderSummary.total")}
        </span>
        <span className="text-2xl font-bold text-text-primary">
          {formatCurrency(orderSummary.total)}
        </span>
      </div>
    </div>
  );
};
