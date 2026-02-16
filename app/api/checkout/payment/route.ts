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

    // Mock successful payment validation
    return NextResponse.json({
      success: true,
      message: "Payment details validated successfully",
      data: {
        last4: cardNumber.slice(-4),
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Invalid request",
      },
      { status: 400 }
    );
  }
}
