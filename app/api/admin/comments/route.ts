import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { Comment } from "@/lib/models";
import { isAuthenticated } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    if (!isAuthenticated(request)) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();

    // Fetch all comments and replies
    const comments = await Comment.find({}).sort({ createdAt: 1 }).lean();

    // Separate main comments and replies
    const parentComments = comments.filter((c: any) => !c.parentId);
    const replies = comments.filter((c: any) => c.parentId);

    // Structure them
    const structuredComments = parentComments.map((parent: any) => {
      return {
        ...parent,
        replies: replies.filter((reply: any) => reply.parentId.toString() === parent._id.toString()),
      };
    });

    // Return newest main comments first
    structuredComments.reverse();

    return NextResponse.json({ success: true, data: structuredComments });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    if (!isAuthenticated(request)) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "Missing comment ID" }, { status: 400 });
    }

    await dbConnect();

    // Delete comment and its replies
    await Comment.deleteMany({
      $or: [{ _id: id }, { parentId: id }],
    });

    return NextResponse.json({ success: true, message: "Comment and its replies deleted successfully." });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
