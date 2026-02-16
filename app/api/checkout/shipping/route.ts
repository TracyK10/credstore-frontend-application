import { NextRequest, NextResponse } from "next/server";

// Simulate 600ms latency
const delay = () => new Promise((resolve) => setTimeout(resolve, 600));

export async function POST(request: NextRequest) {
  await delay();

  try {
    const body = await request.json();
    const { firstLine, streetName, postcode, shippingMethod } = body;

    // Mock validation
    if (!firstLine || !streetName || !postcode) {
      return NextResponse.json(
        {
          success: false,
          message: "All address fields are required",
        },
        { status: 400 }
      );
    }

    // Mock successful shipping data save
    return NextResponse.json({
      success: true,
      message: "Shipping details saved successfully",
      data: {
        firstLine,
        streetName,
        postcode,
        shippingMethod,
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
