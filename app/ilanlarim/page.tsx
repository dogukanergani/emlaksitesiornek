import type { Metadata } from "next";
import { getProperties } from "@/lib/properties";
import { parseFilters } from "@/lib/filters";
import FilterBar from "@/components/listings/FilterBar";
import PropertyGrid from "@/components/listings/PropertyGrid";

export const metadata: Metadata = { title: "İlanlarımız" };

// Veriler isteğe göre MongoDB'den çekildiği için sayfa dinamik render edilir.
export const dynamic = "force-dynamic";

type SearchParams = {
  category?: string;
  type?: string;
  q?: string;
  min?: string;
  max?: string;
};

export default async function ListingsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const filters = parseFilters(params);

  const properties = await getProperties(filters);

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-bold text-ink sm:text-4xl">
        İlanlarımız
      </h1>
      <p className="mt-2 text-stone">
        {properties.length} ilan listeleniyor
        {filters.query ? ` · "${filters.query}"` : ""}
      </p>

      {/* Kategoriye duyarlı, sunucu tarafı filtre çubuğu */}
      <div className="mt-8">
        <FilterBar
          category={filters.category}
          type={filters.type}
          query={filters.query}
          minPrice={filters.minPrice}
          maxPrice={filters.maxPrice}
        />
      </div>

      {properties.length === 0 ? (
        <div className="mt-12 rounded-xl2 border border-dashed border-stone/30 p-12 text-center">
          <p className="font-display text-lg font-semibold text-ink">
            Aramanıza uygun ilan bulunamadı
          </p>
          <p className="mt-1 text-sm text-stone">
            Filtreleri değiştirip tekrar deneyin.
          </p>
        </div>
      ) : (
        <div className="mt-10">
          <PropertyGrid properties={properties} />
        </div>
      )}
    </div>
  );
}
