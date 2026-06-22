import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { Blog } from "@/lib/models";
import { isAuthenticated } from "@/lib/auth";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    await dbConnect();
    const { id } = await params;
    const blog = await Blog.findById(id);
    if (!blog) {
      return NextResponse.json({ success: false, error: "Blog not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: blog });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    if (!isAuthenticated(request)) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const { id } = await params;
    const body = await request.json();
    const { author, featuredImage, draft, date, categories, en, bn } = body;

    let groupBlogs = [];
    let translationGroupId = "";

    if (id.startsWith("group_")) {
      translationGroupId = id;
      groupBlogs = await Blog.find({ translationGroupId });
    } else {
      const firstBlog = await Blog.findById(id);
      if (!firstBlog) {
        return NextResponse.json({ success: false, error: "Blog not found" }, { status: 404 });
      }
      if (firstBlog.translationGroupId) {
        translationGroupId = firstBlog.translationGroupId;
        groupBlogs = await Blog.find({ translationGroupId });
      } else {
        translationGroupId = "group_" + Math.random().toString(36).substring(2, 15);
        firstBlog.translationGroupId = translationGroupId;
        await firstBlog.save();
        groupBlogs = [firstBlog];
      }
    }

    // Handle English version
    const existingEn = groupBlogs.find(b => b.locale === "en");
    if (en && en.title) {
      if (existingEn) {
        await Blog.findByIdAndUpdate(existingEn._id, {
          title: en.title,
          slug: en.slug,
          content: en.content,
          excerpt: en.excerpt || "",
          seo: en.seo || {},
          author,
          featuredImage,
          draft: draft || false,
          categories: categories || [],
          date: date || existingEn.date || new Date()
        });
      } else {
        await Blog.create({
          title: en.title,
          slug: en.slug,
          content: en.content,
          excerpt: en.excerpt || "",
          seo: en.seo || {},
          author,
          featuredImage,
          draft: draft || false,
          date: date || new Date(),
          locale: "en",
          categories: categories || [],
          translationGroupId
        });
      }
    } else if (existingEn) {
      await Blog.findByIdAndDelete(existingEn._id);
    }

    // Handle Bengali version
    const existingBn = groupBlogs.find(b => b.locale === "bn");
    if (bn && bn.title) {
      if (existingBn) {
        await Blog.findByIdAndUpdate(existingBn._id, {
          title: bn.title,
          slug: bn.slug,
          content: bn.content,
          excerpt: bn.excerpt || "",
          seo: bn.seo || {},
          author,
          featuredImage,
          draft: draft || false,
          categories: categories || [],
          date: date || existingBn.date || new Date()
        });
      } else {
        await Blog.create({
          title: bn.title,
          slug: bn.slug,
          content: bn.content,
          excerpt: bn.excerpt || "",
          seo: bn.seo || {},
          author,
          featuredImage,
          draft: draft || false,
          date: date || new Date(),
          locale: "bn",
          categories: categories || [],
          translationGroupId
        });
      }
    } else if (existingBn) {
      await Blog.findByIdAndDelete(existingBn._id);
    }

    return NextResponse.json({ success: true, message: "Translation group updated successfully" });
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

    if (id.startsWith("group_")) {
      const result = await Blog.deleteMany({ translationGroupId: id });
      return NextResponse.json({ success: true, message: `Deleted ${result.deletedCount} posts in the translation group` });
    }

    const firstBlog = await Blog.findById(id);
    if (!firstBlog) {
      return NextResponse.json({ success: false, error: "Blog not found" }, { status: 404 });
    }

    if (firstBlog.translationGroupId) {
      const result = await Blog.deleteMany({ translationGroupId: firstBlog.translationGroupId });
      return NextResponse.json({ success: true, message: `Deleted ${result.deletedCount} posts in the translation group` });
    }

    await Blog.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: "Blog deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
