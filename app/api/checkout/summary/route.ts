import { NextResponse } from "next/server";

// Simulate 600ms latency
const delay = () => new Promise((resolve) => setTimeout(resolve, 600));

export async function GET() {
  await delay();

  return NextResponse.json({
    success: true,
    data: {
      productName: "Sony wireless headphones",
      productImage: "/headphones.jpg",
      productPrice: 320.45,
      quantity: 1,
      subtotal: 316.55,
      tax: 3.45,
      shipping: 0,
      total: 320.45,
    },
  });
}
