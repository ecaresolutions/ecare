import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { Category } from "@/lib/models";
import { isAuthenticated } from "@/lib/auth";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!isAuthenticated(request)) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const { id } = await params; // This represents translationGroupId
    const body = await request.json();
    const { type, en, bn } = body;

    if (!type || !["blog", "product"].includes(type)) {
      return NextResponse.json({ success: false, error: "Invalid category type" }, { status: 400 });
    }

    // Find all categories in the group
    const existingGroup = await Category.find({ translationGroupId: id });

    // Handle English update/creation
    if (en && en.name) {
      const existingEn = existingGroup.find((c) => c.locale === "en");
      if (existingEn) {
        existingEn.name = en.name;
        await existingEn.save();
      } else {
        await Category.create({
          name: en.name,
          type,
          locale: "en",
          translationGroupId: id,
        });
      }
    } else {
      // If it existed but is now cleared out, we can delete it
      await Category.deleteOne({ translationGroupId: id, locale: "en" });
    }

    // Handle Bengali update/creation
    if (bn && bn.name) {
      const existingBn = existingGroup.find((c) => c.locale === "bn");
      if (existingBn) {
        existingBn.name = bn.name;
        await existingBn.save();
      } else {
        await Category.create({
          name: bn.name,
          type,
          locale: "bn",
          translationGroupId: id,
        });
      }
    } else {
      // If it existed but is now cleared out, delete it
      await Category.deleteOne({ translationGroupId: id, locale: "bn" });
    }

    const updatedGroup = await Category.find({ translationGroupId: id });
    return NextResponse.json({ success: true, data: updatedGroup });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!isAuthenticated(request)) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const { id } = await params; // translationGroupId or absolute ID

    // Delete all linked entries in the group
    await Category.deleteMany({
      $or: [{ translationGroupId: id }, { _id: id }],
    });

    return NextResponse.json({ success: true, message: "Category translation group deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
