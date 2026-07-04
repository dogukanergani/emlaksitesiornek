import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  MapPin,
  Maximize,
  BedDouble,
  Bath,
  Sofa,
  LandPlot,
  Hash,
  Phone,
} from "lucide-react";
import { getPropertyBySlug } from "@/lib/properties";
import {
  formatPrice,
  categoryLabels,
  typeLabels,
  badgeConfig,
} from "@/lib/format";
import { siteConfig } from "@/lib/config";
import PropertyGallery from "@/components/listings/PropertyGallery";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);
  if (!property) return { title: "İlan bulunamadı" };
  return {
    title: property.title,
    description: property.description.slice(0, 150),
  };
}

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);

  if (!property) notFound();

  const waMessage = encodeURIComponent(
    `Merhaba, "${property.title}" ilanı hakkında bilgi almak istiyorum.`
  );
  const waHref = `https://wa.me/${siteConfig.whatsappNumber}?text=${waMessage}`;

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <Link
        href="/ilanlarim"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-stone transition-colors hover:text-ink"
      >
        <ArrowLeft className="h-4 w-4" />
        Tüm ilanlar
      </Link>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1.6fr_1fr]">
        {/* Galeri (kapak + ekstra fotoğraflar + video) */}
        <PropertyGallery
          images={[property.coverImage, ...property.imageUrls].filter(Boolean)}
          videoUrl={property.videoUrl}
          title={property.title}
        />

        {/* Bilgi paneli */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-forest-700 px-3 py-1 text-xs font-semibold text-white">
              {categoryLabels[property.category]}
            </span>
            <span className="rounded-full bg-sand px-3 py-1 text-xs font-medium text-ink">
              {typeLabels[property.type]}
            </span>
            {property.badge && (
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold text-white ${badgeConfig[property.badge].className}`}
              >
                {badgeConfig[property.badge].label}
              </span>
            )}
          </div>

          <h1 className="mt-4 font-display text-2xl font-bold text-ink sm:text-3xl">
            {property.title}
          </h1>
          <p className="mt-2 flex items-center gap-1.5 text-stone">
            <MapPin className="h-4 w-4" />
            {property.location.district}, {property.location.city}
          </p>

          <p className="mt-5 font-display text-3xl font-bold text-forest-700">
            {formatPrice(property.price, property.category)}
          </p>

          {/* Özellikler — Ev / Arsa'ya göre */}
          {property.kind === "arsa" ? (
            <dl className="mt-6 grid grid-cols-3 gap-3 rounded-xl2 bg-white p-4 ring-1 ring-black/5">
              <div className="text-center">
                <Maximize className="mx-auto h-5 w-5 text-forest-600" />
                <dt className="mt-1 text-xs text-stone">Alan</dt>
                <dd className="font-semibold text-ink">{property.area} m²</dd>
              </div>
              <div className="text-center">
                <LandPlot className="mx-auto h-5 w-5 text-forest-600" />
                <dt className="mt-1 text-xs text-stone">İmar</dt>
                <dd className="font-semibold text-ink">
                  {property.zoningStatus || "—"}
                </dd>
              </div>
              <div className="text-center">
                <Hash className="mx-auto h-5 w-5 text-forest-600" />
                <dt className="mt-1 text-xs text-stone">Ada/Parsel</dt>
                <dd className="font-semibold text-ink">
                  {property.parcelNo || "—"}
                </dd>
              </div>
            </dl>
          ) : (
            <dl className="mt-6 grid grid-cols-4 gap-3 rounded-xl2 bg-white p-4 ring-1 ring-black/5">
              <div className="text-center">
                <Maximize className="mx-auto h-5 w-5 text-forest-600" />
                <dt className="mt-1 text-xs text-stone">Alan</dt>
                <dd className="font-semibold text-ink">{property.area} m²</dd>
              </div>
              <div className="text-center">
                <BedDouble className="mx-auto h-5 w-5 text-forest-600" />
                <dt className="mt-1 text-xs text-stone">Oda</dt>
                <dd className="font-semibold text-ink">{property.rooms}</dd>
              </div>
              <div className="text-center">
                <Sofa className="mx-auto h-5 w-5 text-forest-600" />
                <dt className="mt-1 text-xs text-stone">Salon</dt>
                <dd className="font-semibold text-ink">{property.livingRooms}</dd>
              </div>
              <div className="text-center">
                <Bath className="mx-auto h-5 w-5 text-forest-600" />
                <dt className="mt-1 text-xs text-stone">Banyo</dt>
                <dd className="font-semibold text-ink">{property.bathrooms}</dd>
              </div>
            </dl>
          )}

          {/* İletişim CTA */}
          <div className="mt-6 flex flex-col gap-3">
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-lg bg-[#25D366] px-5 py-3 font-semibold text-white transition-opacity hover:opacity-90"
            >
              WhatsApp ile Sor
            </a>
            <a
              href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
              className="flex items-center justify-center gap-2 rounded-lg border border-forest-600 px-5 py-3 font-semibold text-forest-700 transition-colors hover:bg-forest-50"
            >
              <Phone className="h-4 w-4" />
              Hemen Ara
            </a>
          </div>
        </div>
      </div>

      {/* Açıklama */}
      <div className="mt-12 max-w-3xl">
        <h2 className="font-display text-xl font-bold text-ink">Açıklama</h2>
        <p className="mt-3 whitespace-pre-line leading-relaxed text-stone">
          {property.description}
        </p>
      </div>
    </div>
  );
}
