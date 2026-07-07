import type { Metadata } from "next";
import { getProperties } from "@/lib/properties";
import { parseFilters } from "@/lib/filters";
import ListingsExplorer from "@/components/listings/ListingsExplorer";

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

  // Tüm ilanlar tek seferde çekilir; kategori/tip/fiyat filtrelemesi artık
  // istemci tarafında anlık (buton gerekmeden) yapılır — bkz. ListingsExplorer.
  const properties = await getProperties();

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-bold text-ink sm:text-4xl">
        İlanlarımız
      </h1>
      <ListingsExplorer
        properties={properties}
        initialCategory={filters.category}
        initialType={filters.type}
        initialQuery={filters.query}
        initialMinPrice={filters.minPrice}
        initialMaxPrice={filters.maxPrice}
      />
    </div>
  );
}
