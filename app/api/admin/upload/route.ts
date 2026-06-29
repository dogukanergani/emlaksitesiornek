import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { isAdminRequest } from "@/lib/admin-guard";

// Cloudinary SDK Node runtime gerektirir
export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Yetkisiz." }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json(
      { error: "Dosya bulunamadı." },
      { status: 400 }
    );
  }

  // Dosyayı base64 data URI'ye çevirip Cloudinary'ye yükle
  const bytes = Buffer.from(await file.arrayBuffer());
  const dataUri = `data:${file.type};base64,${bytes.toString("base64")}`;

  try {
    const result = await cloudinary.uploader.upload(dataUri, {
      folder: "anka-emlak/properties",
      resource_type: "auto", // görsel veya video
    });
    return NextResponse.json({ url: result.secure_url });
  } catch (err) {
    console.error("Cloudinary upload error:", err);
    return NextResponse.json(
      { error: "Görsel yüklenemedi." },
      { status: 500 }
    );
  }
}
