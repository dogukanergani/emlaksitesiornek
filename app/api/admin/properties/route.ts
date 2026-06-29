import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-guard";
import { propertyInputSchema } from "@/lib/validators";
import { createProperty, toPropertyData } from "@/lib/properties";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Yetkisiz." }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Geçersiz istek." }, { status: 400 });
  }

  // Sunucu tarafı doğrulama (formla aynı şema)
  const parsed = propertyInputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Doğrulama hatası.", issues: parsed.error.flatten() },
      { status: 422 }
    );
  }

  const data = parsed.data;

  try {
    const property = await createProperty(toPropertyData(data));
    return NextResponse.json({ ok: true, property }, { status: 201 });
  } catch (err) {
    console.error("Create property error:", err);
    return NextResponse.json(
      { error: "İlan kaydedilemedi." },
      { status: 500 }
    );
  }
}
