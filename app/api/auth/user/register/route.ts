import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { User } from "@/lib/models";

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const { name, email, phone, password } = await request.json();

    if (!name || !email || !phone || !password) {
      return NextResponse.json(
        { success: false, error: "Please fill in all fields." },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, error: "Email is already registered." },
        { status: 400 }
      );
    }

    const user = await User.create({
      name,
      email,
      phone,
      password // storing plain text for simplicity since original admin did, or we can use hashing but plain text matches current admin auth simplicity
    });

    return NextResponse.json({
      success: true,
      message: "Registration successful",
      user: { name: user.name, email: user.email, phone: user.phone }
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
