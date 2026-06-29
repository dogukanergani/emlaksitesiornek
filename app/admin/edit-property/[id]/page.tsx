import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getPropertyById } from "@/lib/properties";
import type { PropertyInput } from "@/lib/validators";
import PropertyForm from "@/components/admin/PropertyForm";
import LogoutButton from "@/components/admin/LogoutButton";

export const metadata: Metadata = {
  title: "İlan Düzenle",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function EditPropertyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const property = await getPropertyById(id);

  if (!property) notFound();

  // Property → form değerleri (PropertyInput) eşlemesi
  const initial: PropertyInput = {
    title: property.title,
    description: property.description,
    price: property.price,
    category: property.category,
    kind: property.kind,
    type: property.type,
    city: property.location.city,
    district: property.location.district,
    area: property.area,
    coverImage: property.coverImage,
    imageUrls: property.imageUrls,
    videoUrl: property.videoUrl ?? "",
    badge: property.badge ?? "",
    featured: property.featured,
    rooms: property.rooms,
    bathrooms: property.bathrooms,
    livingRooms: property.livingRooms,
    zoningStatus: property.zoningStatus ?? "",
    parcelNo: property.parcelNo ?? "",
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <Link
          href="/admin/properties"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-stone transition-colors hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4" />
          İlan listesine dön
        </Link>
        <LogoutButton />
      </div>

      <h1 className="mt-6 font-display text-3xl font-bold text-ink">
        İlanı Düzenle
      </h1>
      <p className="mt-2 text-stone">{property.title}</p>

      <div className="mt-8">
        <PropertyForm initial={initial} propertyId={property.id} />
      </div>
    </div>
  );
}
