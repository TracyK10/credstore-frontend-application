import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CheckoutProvider } from "@/context/CheckoutContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Checkout - BNPL",
  description: "Buy Now Pay Later checkout flow",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CheckoutProvider>{children}</CheckoutProvider>
      </body>
    </html>
  );
}
