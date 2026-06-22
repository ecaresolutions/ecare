import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { Team } from "@/lib/models";
import { isAuthenticated } from "@/lib/auth";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    await dbConnect();
    const { id } = await params;
    const member = await Team.findById(id);
    if (!member) {
      return NextResponse.json({ success: false, error: "Team member not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: member });
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
    const { avatar, socials, en, bn } = body;

    let groupMembers = [];
    let translationGroupId = "";

    if (id.startsWith("group_")) {
      translationGroupId = id;
      groupMembers = await Team.find({ translationGroupId });
    } else {
      const firstMember = await Team.findById(id);
      if (!firstMember) {
        return NextResponse.json({ success: false, error: "Team member not found" }, { status: 404 });
      }
      if (firstMember.translationGroupId) {
        translationGroupId = firstMember.translationGroupId;
        groupMembers = await Team.find({ translationGroupId });
      } else {
        translationGroupId = "group_" + Math.random().toString(36).substring(2, 15);
        firstMember.translationGroupId = translationGroupId;
        await firstMember.save();
        groupMembers = [firstMember];
      }
    }

    // Handle English version
    const existingEn = groupMembers.find(m => m.locale === "en");
    if (en && en.name) {
      if (existingEn) {
        await Team.findByIdAndUpdate(existingEn._id, {
          name: en.name,
          role: en.role,
          slug: en.slug,
          bio: en.bio,
          skills: en.skills || [],
          avatar,
          socials: socials || {}
        });
      } else {
        await Team.create({
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
      }
    } else if (existingEn) {
      await Team.findByIdAndDelete(existingEn._id);
    }

    // Handle Bengali version
    const existingBn = groupMembers.find(m => m.locale === "bn");
    if (bn && bn.name) {
      if (existingBn) {
        await Team.findByIdAndUpdate(existingBn._id, {
          name: bn.name,
          role: bn.role,
          slug: bn.slug,
          bio: bn.bio,
          skills: bn.skills || [],
          avatar,
          socials: socials || {}
        });
      } else {
        await Team.create({
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
      }
    } else if (existingBn) {
      await Team.findByIdAndDelete(existingBn._id);
    }

    return NextResponse.json({ success: true, message: "Team translation group updated successfully" });
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
      const result = await Team.deleteMany({ translationGroupId: id });
      return NextResponse.json({ success: true, message: `Deleted ${result.deletedCount} members in the translation group` });
    }

    const firstMember = await Team.findById(id);
    if (!firstMember) {
      return NextResponse.json({ success: false, error: "Team member not found" }, { status: 404 });
    }

    if (firstMember.translationGroupId) {
      const result = await Team.deleteMany({ translationGroupId: firstMember.translationGroupId });
      return NextResponse.json({ success: true, message: `Deleted ${result.deletedCount} members in the translation group` });
    }

    await Team.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: "Team member deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
