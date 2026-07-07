"use client";

import type { PropertyCategory, PropertyType } from "@/lib/types";
import { typeLabels } from "@/lib/format";
import { PRICE_RANGES } from "@/lib/filters";

function formatTL(value: number) {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0,
    notation: "compact",
  }).format(value);
}

interface FilterBarProps {
  category: PropertyCategory;
  type: PropertyType | "";
  minPrice: number;
  maxPrice: number;
  onCategoryChange: (category: PropertyCategory) => void;
  onTypeChange: (type: PropertyType | "") => void;
  onPriceChange: (minPrice: number, maxPrice: number) => void;
}

/**
 * Kategoriye duyarlı filtre çubuğu.
 * Tamamen kontrollü (controlled) bileşen: state üst bileşende tutulur, her
 * değişiklik anında yukarı bildirilir ve liste anlık olarak yeniden filtrelenir.
 */
export default function FilterBar({
  category,
  type,
  minPrice,
  maxPrice,
  onCategoryChange,
  onTypeChange,
  onPriceChange,
}: FilterBarProps) {
  const range = PRICE_RANGES[category];

  const onMin = (v: number) =>
    onPriceChange(Math.min(v, maxPrice - range.step), maxPrice);
  const onMax = (v: number) =>
    onPriceChange(minPrice, Math.max(v, minPrice + range.step));

  const fillLeft = ((minPrice - range.min) / (range.max - range.min)) * 100;
  const fillRight =
    100 - ((maxPrice - range.min) / (range.max - range.min)) * 100;

  return (
    <div className="rounded-xl2 bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-6">
      <div className="grid gap-6 lg:grid-cols-[auto_1fr_1.2fr] lg:items-end">
        {/* 1) Kategori toggle */}
        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-stone">
            Kategori
          </label>
          <div className="inline-flex rounded-lg bg-sand p-1">
            {(["satilik", "kiralik"] as const).map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => onCategoryChange(c)}
                className={`rounded-md px-4 py-2 text-sm font-semibold transition-colors ${
                  category === c
                    ? "bg-forest-600 text-white shadow-sm"
                    : "text-stone hover:text-ink"
                }`}
              >
                {c === "satilik" ? "Satılık" : "Kiralık"}
              </button>
            ))}
          </div>
        </div>

        {/* 2) Konut tipi dropdown */}
        <div>
          <label
            htmlFor="filter-type"
            className="mb-2 block text-xs font-semibold uppercase tracking-wide text-stone"
          >
            Konut Tipi
          </label>
          <select
            id="filter-type"
            value={type}
            onChange={(e) => onTypeChange(e.target.value as PropertyType | "")}
            className="w-full rounded-lg border border-black/10 bg-white px-3 py-2.5 text-sm text-ink outline-none transition-colors focus:border-forest-600"
          >
            <option value="">Tümü</option>
            {(Object.keys(typeLabels) as PropertyType[]).map((t) => (
              <option key={t} value={t}>
                {typeLabels[t]}
              </option>
            ))}
          </select>
        </div>

        {/* 3) Fiyat aralığı — kategoriye göre otomatik skala */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="text-xs font-semibold uppercase tracking-wide text-stone">
              {category === "kiralik" ? "Aylık Kira" : "Fiyat Aralığı"}
            </label>
            <span className="text-xs font-medium text-ink">
              {formatTL(minPrice)} – {formatTL(maxPrice)}
            </span>
          </div>
          <div className="relative h-5">
            <div className="absolute top-1/2 h-1.5 w-full -translate-y-1/2 rounded-full bg-sand" />
            <div
              className="absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-forest-600"
              style={{ left: `${fillLeft}%`, right: `${fillRight}%` }}
            />
            <input
              type="range"
              aria-label="Minimum fiyat"
              min={range.min}
              max={range.max}
              step={range.step}
              value={minPrice}
              onChange={(e) => onMin(Number(e.target.value))}
              className="range-input"
            />
            <input
              type="range"
              aria-label="Maksimum fiyat"
              min={range.min}
              max={range.max}
              step={range.step}
              value={maxPrice}
              onChange={(e) => onMax(Number(e.target.value))}
              className="range-input"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
