import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { Contact } from "@/lib/models";
import { isAuthenticated } from "@/lib/auth";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    if (!isAuthenticated(request)) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const { id } = await params;
    const body = await request.json(); // e.g. { status: "read" }

    const contact = await Contact.findByIdAndUpdate(id, { status: body.status }, { new: true });
    if (!contact) {
      return NextResponse.json({ success: false, error: "Contact message not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: contact });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    if (!isAuthenticated(request)) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const { id } = await params;

    const contact = await Contact.findByIdAndDelete(id);
    if (!contact) {
      return NextResponse.json({ success: false, error: "Contact message not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Contact message deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
