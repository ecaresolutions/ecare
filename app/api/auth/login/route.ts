import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { Admin } from "@/lib/models";

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: "Username and password are required" },
        { status: 400 }
      );
    }

    const envUsername = process.env.ADMIN_USERNAME || "admin";
    const envPassword = process.env.ADMIN_PASSWORD || "adminpassword";

    let isValid = false;

    if (username === envUsername && password === envPassword) {
      isValid = true;
    } else {
      try {
        await dbConnect();
        const admin = await Admin.findOne({ username });
        if (admin && admin.password === password) {
          isValid = true;
        }
      } catch (dbErr) {
        console.error("Database auth fallback check failed:", dbErr);
      }
    }

    if (!isValid) {
      return NextResponse.json(
        { success: false, error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const response = NextResponse.json({
      success: true,
      message: "Logged in successfully",
    });

    response.cookies.set("admin_session", "session_token_value_ok", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    });

    response.cookies.set("admin_username", username, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
