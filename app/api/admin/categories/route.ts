import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { Category } from "@/lib/models";
import { isAuthenticated } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type"); // "blog" or "product"
    
    const query: any = {};
    if (type) query.type = type;

    const categories = await Category.find(query).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: categories });
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
    const { type, en, bn } = body;

    if (!type || !["blog", "product"].includes(type)) {
      return NextResponse.json({ success: false, error: "Invalid category type" }, { status: 400 });
    }

    if ((!en || !en.name) && (!bn || !bn.name)) {
      return NextResponse.json({ success: false, error: "At least one name version (English or Bengali) must be provided" }, { status: 400 });
    }

    const translationGroupId = "cat_group_" + Math.random().toString(36).substring(2, 15);
    const createdCategories = [];

    if (en && en.name) {
      const catEn = await Category.create({
        name: en.name,
        type,
        locale: "en",
        translationGroupId
      });
      createdCategories.push(catEn);
    }

    if (bn && bn.name) {
      const catBn = await Category.create({
        name: bn.name,
        type,
        locale: "bn",
        translationGroupId
      });
      createdCategories.push(catBn);
    }

    return NextResponse.json({ success: true, data: createdCategories });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
