import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { LiveChatMessage } from "@/lib/models";
import { isAuthenticated } from "@/lib/auth";

interface RouteParams {
  params: Promise<{ sessionId: string }>;
}

// GET: Fetch all messages for a specific session sorted chronologically
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    if (!isAuthenticated(request)) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const { sessionId } = await params;

    const messages = await LiveChatMessage.find({ sessionId }).sort({ createdAt: 1 });

    // Mark user messages as read when admin loads the chat details
    await LiveChatMessage.updateMany(
      { sessionId, sender: "user", status: "unread" },
      { status: "read" }
    );

    return NextResponse.json({ success: true, data: messages });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// PUT: Mark all user messages in a session as read
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    if (!isAuthenticated(request)) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const { sessionId } = await params;

    await LiveChatMessage.updateMany(
      { sessionId, sender: "user", status: "unread" },
      { status: "read" }
    );

    return NextResponse.json({ success: true, message: "Marked all messages as read" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// DELETE: Delete all messages in a session
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    if (!isAuthenticated(request)) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const { sessionId } = await params;

    await LiveChatMessage.deleteMany({ sessionId });

    return NextResponse.json({ success: true, message: "Chat session deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
