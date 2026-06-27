import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { Order } from "@/lib/models";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    await dbConnect();
    const { id } = await params;
    
    const order = await Order.findById(id);
    if (!order) {
      return NextResponse.json({ success: false, error: "Order not found" }, { status: 404 });
    }

    if (order.paymentStatus !== "paid") {
      return NextResponse.json({ success: false, error: "Order is not paid" }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      order: {
        id: order._id,
        name: order.name,
        email: order.email,
        totalAmount: order.totalAmount,
        licenseKeys: order.licenseKeys,
        downloadToken: order.downloadToken,
        trxID: order.trxID,
        items: order.items
      }
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
