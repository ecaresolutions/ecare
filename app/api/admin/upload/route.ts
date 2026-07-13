import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { isAuthenticated } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    if (!isAuthenticated(request)) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ success: false, error: "No file uploaded" }, { status: 400 });
    }

    // Generate unique name
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const dotIndex = file.name.lastIndexOf(".");
    const ext = dotIndex !== -1 ? file.name.substring(dotIndex) : "";
    const baseName = (dotIndex !== -1 ? file.name.substring(0, dotIndex) : file.name).replace(/[^a-zA-Z0-9]/g, "-");
    const fileName = `uploads/${baseName}-${uniqueSuffix}${ext}`;

    // Upload to Vercel Blob
    const blob = await put(fileName, file, {
      access: "public",
    });

    return NextResponse.json({
      success: true,
      url: blob.url,
    });
  } catch (error: any) {
    console.error("Vercel Blob upload handler error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

