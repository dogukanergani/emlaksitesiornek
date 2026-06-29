import Image from "next/image";
import Link from "next/link";
import { MapPin, Maximize, BedDouble, Bath } from "lucide-react";
import type { Property } from "@/lib/types";
import {
  formatPrice,
  categoryLabels,
  typeLabels,
  badgeConfig,
} from "@/lib/format";

const PLACEHOLDER =
  "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80";

export default function PropertyCard({ property }: { property: Property }) {
  const cover = property.coverImage || property.imageUrls[0] || PLACEHOLDER;

  return (
    <Link
      href={`/ilanlarim/${property.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-xl2 bg-white shadow-sm ring-1 ring-black/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest-600"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={cover}
          alt={property.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Sol üst: kategori + (varsa) renkli promosyon etiketi */}
        <div className="absolute left-3 top-3 flex flex-col items-start gap-2">
          <span className="rounded-full bg-forest-700 px-3 py-1 text-xs font-semibold text-white">
            {categoryLabels[property.category]}
          </span>
          {property.badge && (
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold text-white ${badgeConfig[property.badge].className}`}
            >
              {badgeConfig[property.badge].label}
            </span>
          )}
        </div>
        <span className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-ink backdrop-blur">
          {typeLabels[property.type]}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="font-display text-xl font-bold text-forest-700">
          {formatPrice(property.price, property.category)}
        </p>
        <h3 className="mt-1 line-clamp-1 font-semibold text-ink">
          {property.title}
        </h3>
        <p className="mt-1 flex items-center gap-1 text-sm text-stone">
          <MapPin className="h-4 w-4" />
          {property.location.district}, {property.location.city}
        </p>

        <div className="mt-4 flex items-center gap-4 border-t border-black/5 pt-4 text-sm text-stone">
          <span className="flex items-center gap-1.5">
            <Maximize className="h-4 w-4" />
            {property.area} m²
          </span>
          {property.rooms > 0 && (
            <span className="flex items-center gap-1.5">
              <BedDouble className="h-4 w-4" />
              {property.rooms} oda
            </span>
          )}
          {property.bathrooms > 0 && (
            <span className="flex items-center gap-1.5">
              <Bath className="h-4 w-4" />
              {property.bathrooms}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
