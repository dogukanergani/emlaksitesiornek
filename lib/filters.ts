import type { PropertyCategory, PropertyType } from "./types";

/**
 * Kategoriye göre fiyat skalası.
 * - Kiralık  → aylık kira mantığı (5.000 – 1.000.000 TL)
 * - Satılık  → toplam fiyat mantığı (1.000.000 TL ve üzeri)
 * Bu tek kaynak hem arayüzdeki slider'ı hem de sunucu sorgusunu besler.
 */
export const PRICE_RANGES: Record<
  PropertyCategory,
  { min: number; max: number; step: number }
> = {
  kiralik: { min: 5_000, max: 1_000_000, step: 5_000 },
  satilik: { min: 1_000_000, max: 30_000_000, step: 250_000 },
};

export const DEFAULT_CATEGORY: PropertyCategory = "satilik";

const VALID_TYPES: PropertyType[] = [
  "daire",
  "villa",
  "mustakil-ev",
  "arsa",
  "yazlik",
  "isyeri",
];

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export interface ResolvedFilters {
  category: PropertyCategory;
  type?: PropertyType;
  query?: string;
  minPrice: number;
  maxPrice: number;
}

/**
 * URL query parametrelerini (string) güvenli, doğrulanmış filtrelere çevirir.
 * Geçersiz/eksik değerlerde kategoriye uygun varsayılanlara döner.
 * Hem `/ilanlarim` sayfası hem de API route'u aynı parser'ı kullanır.
 */
export function parseFilters(searchParams: {
  category?: string;
  type?: string;
  q?: string;
  min?: string;
  max?: string;
}): ResolvedFilters {
  const category: PropertyCategory =
    searchParams.category === "kiralik" || searchParams.category === "satilik"
      ? searchParams.category
      : DEFAULT_CATEGORY;

  const range = PRICE_RANGES[category];

  const type =
    searchParams.type && VALID_TYPES.includes(searchParams.type as PropertyType)
      ? (searchParams.type as PropertyType)
      : undefined;

  const minPrice = searchParams.min
    ? clamp(Number(searchParams.min), range.min, range.max)
    : range.min;
  const maxPrice = searchParams.max
    ? clamp(Number(searchParams.max), range.min, range.max)
    : range.max;

  return {
    category,
    type,
    query: searchParams.q?.trim() || undefined,
    minPrice: Math.min(minPrice, maxPrice),
    maxPrice: Math.max(minPrice, maxPrice),
  };
}
