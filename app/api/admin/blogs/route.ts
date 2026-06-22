import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { Blog } from "@/lib/models";
import { isAuthenticated } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get("locale");
    
    const query: any = {};
    if (locale) query.locale = locale;

    const blogs = await Blog.find(query).sort({ date: -1 });
    return NextResponse.json({ success: true, data: blogs });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!isAuthenticated(request)) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const body = await request.json();

    const { author, featuredImage, draft, date, categories, en, bn } = body;

    if (!author || !featuredImage) {
      return NextResponse.json({ success: false, error: "Missing required metadata fields" }, { status: 400 });
    }

    // Must have at least one language
    if ((!en || !en.title) && (!bn || !bn.title)) {
      return NextResponse.json({ success: false, error: "At least one article version (English or Bengali) must be provided" }, { status: 400 });
    }

    const translationGroupId = "group_" + Math.random().toString(36).substring(2, 15);
    const createdBlogs = [];

    // Create English version
    if (en && en.title) {
      if (!en.slug || !en.content) {
        return NextResponse.json({ success: false, error: "English version requires title, slug, and content" }, { status: 400 });
      }
      const existing = await Blog.findOne({ slug: en.slug });
      if (existing) {
        return NextResponse.json({ success: false, error: `English slug '${en.slug}' already exists` }, { status: 400 });
      }
      const blogEn = await Blog.create({
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
      createdBlogs.push(blogEn);
    }

    // Create Bengali version
    if (bn && bn.title) {
      if (!bn.slug || !bn.content) {
        return NextResponse.json({ success: false, error: "Bengali version requires title, slug, and content" }, { status: 400 });
      }
      const existing = await Blog.findOne({ slug: bn.slug });
      if (existing) {
        return NextResponse.json({ success: false, error: `Bengali slug '${bn.slug}' already exists` }, { status: 400 });
      }
      const blogBn = await Blog.create({
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
      createdBlogs.push(blogBn);
    }

    return NextResponse.json({ success: true, data: createdBlogs });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
