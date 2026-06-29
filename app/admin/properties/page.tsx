import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, PlusCircle, Pencil } from "lucide-react";
import { getAllProperties } from "@/lib/properties";
import { formatPrice, categoryLabels, typeLabels } from "@/lib/format";
import LogoutButton from "@/components/admin/LogoutButton";
import DeletePropertyButton from "@/components/admin/DeletePropertyButton";

export const metadata: Metadata = {
  title: "İlan Yönetimi",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const PLACEHOLDER =
  "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=400&q=80";

export default async function AdminPropertiesPage() {
  const properties = await getAllProperties();

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <Link
          href="/admin"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-stone transition-colors hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4" />
          Panele dön
        </Link>
        <LogoutButton />
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-ink">
            İlan Yönetimi
          </h1>
          <p className="mt-1 text-stone">{properties.length} ilan</p>
        </div>
        <Link
          href="/admin/add-property"
          className="inline-flex items-center gap-2 rounded-lg bg-forest-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-forest-700"
        >
          <PlusCircle className="h-4 w-4" />
          Yeni İlan
        </Link>
      </div>

      {properties.length === 0 ? (
        <div className="mt-10 rounded-xl2 border border-dashed border-stone/30 p-12 text-center text-stone">
          Henüz ilan yok. “Yeni İlan” ile başlayın.
        </div>
      ) : (
        <ul className="mt-8 space-y-3">
          {properties.map((p) => (
            <li
              key={p.id}
              className="flex flex-col gap-4 rounded-xl2 bg-white p-3 ring-1 ring-black/5 sm:flex-row sm:items-center"
            >
              <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-lg">
                <Image
                  src={p.imageUrls[0] ?? PLACEHOLDER}
                  alt={p.title}
                  fill
                  sizes="112px"
                  className="object-cover"
                />
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold text-ink">{p.title}</p>
                <p className="mt-0.5 text-sm text-stone">
                  {categoryLabels[p.category]} · {typeLabels[p.type]} ·{" "}
                  {p.location.district}, {p.location.city}
                </p>
                <p className="mt-0.5 text-sm font-medium text-forest-700">
                  {formatPrice(p.price, p.category)}
                </p>
              </div>

              <div className="flex items-center gap-2 sm:shrink-0">
                <Link
                  href={`/admin/edit-property/${p.id}`}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-black/10 px-3 py-1.5 text-sm font-medium text-stone transition-colors hover:bg-black/5 hover:text-ink"
                >
                  <Pencil className="h-4 w-4" />
                  Düzenle
                </Link>
                <DeletePropertyButton id={p.id} title={p.title} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
