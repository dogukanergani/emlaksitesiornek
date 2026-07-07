"use client";

import { useMemo, useState } from "react";
import type { Property, PropertyCategory, PropertyType } from "@/lib/types";
import { PRICE_RANGES } from "@/lib/filters";
import FilterBar from "./FilterBar";
import PropertyGrid from "./PropertyGrid";

interface ListingsExplorerProps {
  properties: Property[];
  initialCategory: PropertyCategory;
  initialType?: PropertyType;
  initialQuery?: string;
  initialMinPrice: number;
  initialMaxPrice: number;
}

/**
 * İlan listesi + filtre çubuğunu birlikte yönetir.
 * Tüm ilanlar sunucudan bir kez alınır; kategori, konut tipi ve fiyat
 * aralığı değiştikçe filtreleme `useMemo` ile anında (buton gerekmeden)
 * yeniden hesaplanır. Sayaç metni ve grid aynı `filtered` dizisinden
 * türediği için birbirinden asla ayrışmaz.
 */
export default function ListingsExplorer({
  properties,
  initialCategory,
  initialType,
  initialQuery,
  initialMinPrice,
  initialMaxPrice,
}: ListingsExplorerProps) {
  const [category, setCategory] = useState<PropertyCategory>(initialCategory);
  const [type, setType] = useState<PropertyType | "">(initialType ?? "");
  const [minPrice, setMinPrice] = useState(initialMinPrice);
  const [maxPrice, setMaxPrice] = useState(initialMaxPrice);
  const query = (initialQuery ?? "").trim();

  function handleCategoryChange(next: PropertyCategory) {
    const range = PRICE_RANGES[next];
    setCategory(next);
    setMinPrice(range.min);
    setMaxPrice(range.max);
  }

  const filtered = useMemo(() => {
    if (!Array.isArray(properties)) return [];

    const q = query.toLowerCase();
    const normalizedCategory = category.trim().toLowerCase();

    try {
      return properties.filter((p) => {
        if (!p) return false;

        const propCategory = String(p.category ?? "").trim().toLowerCase();
        if (propCategory !== normalizedCategory) return false;

        if (type && p.type !== type) return false;

        const price = Number(p.price);
        if (Number.isNaN(price) || price < minPrice || price > maxPrice) {
          return false;
        }

        if (q) {
          const haystack = `${p.title} ${p.location?.city} ${p.location?.district}`
            .toLowerCase();
          if (!haystack.includes(q)) return false;
        }

        return true;
      });
    } catch {
      // Beklenmedik veri şekli filtrelemeyi çökertmesin; boş liste dönülür.
      return [];
    }
  }, [properties, category, type, minPrice, maxPrice, query]);

  return (
    <>
      <p className="mt-2 text-stone">
        {filtered?.length ?? 0} ilan listeleniyor
        {query ? ` · "${query}"` : ""}
      </p>

      <div className="mt-8">
        <FilterBar
          category={category}
          type={type}
          minPrice={minPrice}
          maxPrice={maxPrice}
          onCategoryChange={handleCategoryChange}
          onTypeChange={setType}
          onPriceChange={(min, max) => {
            setMinPrice(min);
            setMaxPrice(max);
          }}
        />
      </div>

      {filtered?.length > 0 ? (
        <div className="mt-10">
          <PropertyGrid properties={filtered} />
        </div>
      ) : (
        <div className="mt-12 rounded-xl2 border border-dashed border-stone/30 p-12 text-center">
          <p className="font-display text-lg font-semibold text-ink">
            Aramanıza uygun ilan bulunamadı
          </p>
          <p className="mt-1 text-sm text-stone">
            Filtreleri değiştirip tekrar deneyin.
          </p>
        </div>
      )}
    </>
  );
}
