import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { Order } from "@/lib/models";
import fs from "fs";
import path from "path";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const token = searchParams.get("token");

    if (!token) {
      return new NextResponse("Missing download token", { status: 400 });
    }

    await dbConnect();
    const order = await Order.findOne({ downloadToken: token, paymentStatus: "paid" });

    if (!order) {
      return new NextResponse("Invalid or expired download link", { status: 400 });
    }

    // Attempt to read the actual zip file
    const filePath = path.join(process.cwd(), "public", "uploads", "ezy-checkout-pro.zip");
    
    if (!fs.existsSync(filePath)) {
      // Return a simulated zip file stream if the file isn't uploaded yet so it doesn't crash
      return new NextResponse("Mock Plugin Binary Container: Ezy Checkout Pro", {
        headers: {
          "Content-Disposition": "attachment; filename=ezy-checkout-pro.zip",
          "Content-Type": "application/zip",
        },
      });
    }

    const fileStream = fs.readFileSync(filePath);
    return new NextResponse(fileStream, {
      headers: {
        "Content-Disposition": "attachment; filename=ezy-checkout-pro.zip",
        "Content-Type": "application/zip",
      },
    });
  } catch (error: any) {
    return new NextResponse(`Download processing error: ${error.message}`, { status: 500 });
  }
}
