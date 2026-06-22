import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { Comment } from "@/lib/models";
import { isAuthenticated } from "@/lib/auth";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!isAuthenticated(request)) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { content } = body;

    if (!content) {
      return NextResponse.json({ success: false, error: "Reply content is required" }, { status: 400 });
    }

    await dbConnect();

    // Find the parent comment to inherit productSlug, locale, etc.
    const parentComment = await Comment.findById(id);
    if (!parentComment) {
      return NextResponse.json({ success: false, error: "Parent comment not found" }, { status: 404 });
    }

    const reply = await Comment.create({
      productSlug: parentComment.productSlug,
      name: "Ecare Team",
      email: "admin@ecare.com",
      content,
      locale: parentComment.locale,
      parentId: id,
      isAdminReply: true,
    });

    return NextResponse.json({ success: true, data: reply });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
