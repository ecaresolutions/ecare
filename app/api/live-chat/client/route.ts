import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { LiveChatMessage } from "@/lib/models";

// GET: Fetch messages for a specific sessionId
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("sessionId");

    if (!sessionId) {
      return NextResponse.json({ success: false, error: "Missing sessionId" }, { status: 400 });
    }

    await dbConnect();
    const messages = await LiveChatMessage.find({ sessionId }).sort({ createdAt: 1 });

    return NextResponse.json({ success: true, data: messages });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// POST: Save a new message from user or bot helper
export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    const { sessionId, sender, senderName, message } = body;

    if (!sessionId || !sender || !senderName || !message || !message.trim()) {
      return NextResponse.json({ success: false, error: "Invalid payload parameters" }, { status: 400 });
    }

    const newMessage = await LiveChatMessage.create({
      sessionId,
      sender,
      senderName,
      message: message.trim(),
      status: "unread",
      date: new Date()
    });

    return NextResponse.json({ success: true, data: newMessage });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
