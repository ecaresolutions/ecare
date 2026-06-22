import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/schema";
import dbConnect from "@/lib/db";
import { Contact } from "@/lib/models";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Server-side Zod validation
    const result = contactSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { success: false, errors: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    // Connect to MongoDB and save
    await dbConnect();
    const contactMessage = await Contact.create({
      name: result.data.name,
      email: result.data.email,
      subject: result.data.subject,
      message: result.data.message,
      product: result.data.product || "",
      supportType: result.data.supportType || "",
      orderId: result.data.orderId || "",
      status: "unread",
      date: new Date(),
    });

    return NextResponse.json({
      success: true,
      message: "Message sent successfully.",
      data: contactMessage,
    });
  } catch (error: any) {
    console.error("Contact form submission error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to submit form. Please try again later." },
      { status: 500 }
    );
  }
}
