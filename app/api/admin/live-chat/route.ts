import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { LiveChatMessage } from "@/lib/models";
import { isAuthenticated } from "@/lib/auth";

// GET: Fetch list of unique chat sessions for the admin panel
export async function GET(request: NextRequest) {
  try {
    if (!isAuthenticated(request)) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    // Get all messages sorted by newest first
    const allMessages = await LiveChatMessage.find({}).sort({ createdAt: -1 }).lean();

    const uniqueSessionsMap: Record<string, any> = {};

    for (const msg of allMessages) {
      if (!uniqueSessionsMap[msg.sessionId]) {
        // Find if there are any unread messages from the user in this session
        const unreadCount = allMessages.filter(
          (m) => m.sessionId === msg.sessionId && m.sender === "user" && m.status === "unread"
        ).length;

        uniqueSessionsMap[msg.sessionId] = {
          sessionId: msg.sessionId,
          name: msg.sender === "user" ? msg.senderName : "Visitor",
          lastMessage: msg.message,
          lastSender: msg.sender,
          lastDate: msg.date || msg.createdAt,
          unreadCount,
          // Try to recover user name if current latest message was from admin
          userName: msg.sender === "user" ? msg.senderName : (allMessages.find(m => m.sessionId === msg.sessionId && m.sender === "user")?.senderName || "Visitor")
        };
      }
    }

    const sessionsList = Object.values(uniqueSessionsMap).sort(
      (a: any, b: any) => new Date(b.lastDate).getTime() - new Date(a.lastDate).getTime()
    );

    return NextResponse.json({ success: true, data: sessionsList });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// POST: Admin reply to a specific session
export async function POST(request: NextRequest) {
  try {
    if (!isAuthenticated(request)) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const body = await request.json();
    const { sessionId, message } = body;

    if (!sessionId || !message || !message.trim()) {
      return NextResponse.json({ success: false, error: "Invalid parameters" }, { status: 400 });
    }

    // Create the admin's reply message in the collection
    const adminReply = await LiveChatMessage.create({
      sessionId,
      sender: "admin",
      senderName: "Admin Support",
      message: message.trim(),
      status: "read", // admin's own reply is read
      date: new Date()
    });

    // Mark all previous user messages in this session as read by admin
    await LiveChatMessage.updateMany(
      { sessionId, sender: "user", status: "unread" },
      { status: "read" }
    );

    return NextResponse.json({ success: true, data: adminReply });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
