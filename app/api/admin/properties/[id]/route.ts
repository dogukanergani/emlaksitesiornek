import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-guard";
import { propertyInputSchema } from "@/lib/validators";
import { updateProperty, deleteProperty, toPropertyData } from "@/lib/properties";

export const runtime = "nodejs";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Yetkisiz." }, { status: 401 });
  }

  const { id } = await params;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Geçersiz istek." }, { status: 400 });
  }

  const parsed = propertyInputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Doğrulama hatası.", issues: parsed.error.flatten() },
      { status: 422 }
    );
  }

  const data = parsed.data;

  try {
    const updated = await updateProperty(id, toPropertyData(data));

    if (!updated) {
      return NextResponse.json({ error: "İlan bulunamadı." }, { status: 404 });
    }
    return NextResponse.json({ ok: true, property: updated });
  } catch (err) {
    console.error("Update property error:", err);
    return NextResponse.json(
      { error: "İlan güncellenemedi." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Yetkisiz." }, { status: 401 });
  }

  const { id } = await params;
  const deleted = await deleteProperty(id);

  if (!deleted) {
    return NextResponse.json({ error: "İlan bulunamadı." }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
