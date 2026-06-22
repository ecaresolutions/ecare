import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { Team } from "@/lib/models";
import { isAuthenticated } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get("locale");

    const query: any = {};
    if (locale) query.locale = locale;

    const team = await Team.find(query).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: team });
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

    const { avatar, socials, en, bn } = body;

    if (!avatar) {
      return NextResponse.json({ success: false, error: "Avatar is required" }, { status: 400 });
    }

    if ((!en || !en.name) && (!bn || !bn.name)) {
      return NextResponse.json({ success: false, error: "At least one team member version (English or Bengali) must be provided" }, { status: 400 });
    }

    const translationGroupId = "group_" + Math.random().toString(36).substring(2, 15);
    const createdMembers = [];

    // Create English version
    if (en && en.name) {
      if (!en.role || !en.slug || !en.bio) {
        return NextResponse.json({ success: false, error: "English version requires name, role, slug, and bio" }, { status: 400 });
      }
      const existing = await Team.findOne({ slug: en.slug });
      if (existing) {
        return NextResponse.json({ success: false, error: `English slug '${en.slug}' already exists` }, { status: 400 });
      }
      const memberEn = await Team.create({
        name: en.name,
        role: en.role,
        slug: en.slug,
        bio: en.bio,
        skills: en.skills || [],
        avatar,
        socials: socials || {},
        locale: "en",
        translationGroupId
      });
      createdMembers.push(memberEn);
    }

    // Create Bengali version
    if (bn && bn.name) {
      if (!bn.role || !bn.slug || !bn.bio) {
        return NextResponse.json({ success: false, error: "Bengali version requires name, role, slug, and bio" }, { status: 400 });
      }
      const existing = await Team.findOne({ slug: bn.slug });
      if (existing) {
        return NextResponse.json({ success: false, error: `Bengali slug '${bn.slug}' already exists` }, { status: 400 });
      }
      const memberBn = await Team.create({
        name: bn.name,
        role: bn.role,
        slug: bn.slug,
        bio: bn.bio,
        skills: bn.skills || [],
        avatar,
        socials: socials || {},
        locale: "bn",
        translationGroupId
      });
      createdMembers.push(memberBn);
    }

    return NextResponse.json({ success: true, data: createdMembers });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
