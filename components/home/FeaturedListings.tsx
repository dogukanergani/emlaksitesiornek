import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getFeaturedProperties } from "@/lib/properties";
import PropertyGrid from "@/components/listings/PropertyGrid";

// Server Component: veriyi doğrudan veri katmanından çeker (await).
export default async function FeaturedListings() {
  const properties = await getFeaturedProperties();

  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="font-medium uppercase tracking-[0.2em] text-clay-500">
            Öne Çıkanlar
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold text-ink sm:text-4xl">
            Seçili ilanlar
          </h2>
        </div>
        <Link
          href="/ilanlarim"
          className="hidden shrink-0 items-center gap-1 text-sm font-semibold text-forest-700 hover:text-forest-600 sm:inline-flex"
        >
          Tümünü gör
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-10">
        <PropertyGrid properties={properties} />
      </div>

      <div className="mt-10 text-center sm:hidden">
        <Link
          href="/ilanlarim"
          className="inline-flex items-center gap-1 text-sm font-semibold text-forest-700"
        >
          Tümünü gör
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
