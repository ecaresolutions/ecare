import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
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

    const buffer = Buffer.from(await file.arrayBuffer());
    
    // Define upload directory in public/uploads
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    
    // Ensure folder exists
    await fs.mkdir(uploadDir, { recursive: true });

    // Generate unique name
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.name);
    const baseName = path.basename(file.name, ext).replace(/[^a-zA-Z0-9]/g, "-");
    const fileName = `${baseName}-${uniqueSuffix}${ext}`;
    
    const filePath = path.join(uploadDir, fileName);
    await fs.writeFile(filePath, buffer);

    const relativeUrl = `/uploads/${fileName}`;

    return NextResponse.json({
      success: true,
      url: relativeUrl,
    });
  } catch (error: any) {
    console.error("Upload handler error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
