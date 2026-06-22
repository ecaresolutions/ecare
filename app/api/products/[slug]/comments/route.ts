import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { Comment } from "@/lib/models";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get("locale") || "en";

    await dbConnect();

    // Fetch all comments for this product & locale
    const comments = await Comment.find({ productSlug: slug, locale }).sort({ createdAt: 1 }).lean();

    // Structure them: separate parent comments and replies
    const parentComments = comments.filter((c: any) => !c.parentId);
    const replies = comments.filter((c: any) => c.parentId);

    // Attach replies to their parent comments
    const structuredComments = parentComments.map((parent: any) => {
      return {
        ...parent,
        replies: replies.filter((reply: any) => reply.parentId.toString() === parent._id.toString()),
      };
    });

    // Return newest parent comments first
    structuredComments.reverse();

    return NextResponse.json({ success: true, data: structuredComments });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const body = await request.json();
    const { name, email, content, locale, parentId } = body;

    if (!name || !email || !content) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    await dbConnect();

    const newComment = await Comment.create({
      productSlug: slug,
      name,
      email,
      content,
      locale: locale || "en",
      parentId: parentId || null,
      isAdminReply: false,
    });

    return NextResponse.json({ success: true, data: newComment });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
