import { NextRequest, NextResponse } from "next/server";

// Simulate 600ms latency
const delay = () => new Promise((resolve) => setTimeout(resolve, 600));

export async function POST(request: NextRequest) {
  await delay();

  try {
    const body = await request.json();
    const { nameOnCard, cardNumber, expirationMonth, expirationYear, cvc } = body;

    // Mock validation
    if (!nameOnCard || !cardNumber || !expirationMonth || !expirationYear || !cvc) {
      return NextResponse.json(
        {
          success: false,
          message: "All payment fields are required",
        },
        { status: 400 }
      );
    }

    // Mock successful order completion
    const orderId = `ORD-${Date.now()}`;
    
    return NextResponse.json({
      success: true,
      message: "Order completed successfully",
      data: {
        orderId,
        status: "confirmed",
        estimatedDelivery: "3-5 business days",
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to complete order",
      },
      { status: 500 }
    );
  }
}
