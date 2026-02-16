import { NextRequest, NextResponse } from "next/server";

// Simulate 600ms latency
const delay = () => new Promise((resolve) => setTimeout(resolve, 600));

export async function POST(request: NextRequest) {
  await delay();

  try {
    const body = await request.json();
    const { email, password } = body;

    // Mock validation
    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Email and password are required",
        },
        { status: 400 }
      );
    }

    // Mock successful login
    return NextResponse.json({
      success: true,
      message: "Account validated successfully",
      data: {
        email,
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
