import type { PropertyCategory, PropertyType, PropertyBadge } from "./types";

/** Fiyatı Türk Lirası biçiminde gösterir. Kiralıkta "/ay" eklenir. */
export function formatPrice(price: number, category: PropertyCategory): string {
  const formatted = new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0,
  }).format(price);
  return category === "kiralik" ? `${formatted}/ay` : formatted;
}

export const categoryLabels: Record<PropertyCategory, string> = {
  satilik: "Satılık",
  kiralik: "Kiralık",
};

export const typeLabels: Record<PropertyType, string> = {
  daire: "Daire",
  villa: "Villa",
  "mustakil-ev": "Müstakil Ev",
  arsa: "Arsa",
  yazlik: "Yazlık",
  isyeri: "İş Yeri",
};

export const badgeConfig: Record<
  PropertyBadge,
  { label: string; className: string }
> = {
  yeni: { label: "Yeni", className: "bg-emerald-500" },
  firsat: { label: "Fırsat", className: "bg-clay-500" },
  acil: { label: "Acil", className: "bg-red-500" },
};
