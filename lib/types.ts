/**
 * Alan adı (domain) tipleri.
 * Mongoose şeması (lib/models/Property.ts) bu tiplerle birebir hizalıdır.
 */

/** İlan kategorisi: Satılık / Kiralık (eski adıyla "status"). */
export type PropertyCategory = "satilik" | "kiralik";

/** Konut tipi. */
export type PropertyType =
  | "daire"
  | "villa"
  | "mustakil-ev"
  | "arsa"
  | "yazlik"
  | "isyeri";

/** Karta basılan promosyon etiketi (renkli badge). */
export type PropertyBadge = "yeni" | "firsat" | "acil";

/** Ana kategori: Ev (konut) veya Arsa. Form alanlarının zorunluluğunu belirler. */
export type PropertyKind = "ev" | "arsa";

export interface PropertyLocation {
  city: string;
  district: string;
}

export interface Property {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: PropertyCategory; // satilik / kiralik
  kind: PropertyKind; // ev / arsa
  type: PropertyType; // konut tipi (arsa için "arsa")
  badge?: PropertyBadge;
  price: number; // TL — kategoriye göre toplam fiyat veya aylık kira
  currency: "TRY";
  location: PropertyLocation;
  area: number; // m² (hem ev hem arsa)

  // Medya
  coverImage: string; // kapak fotoğrafı
  imageUrls: string[]; // ekstra fotoğraflar (galeri)
  videoUrl?: string; // tanıtım videosu (URL veya yüklenen dosya)

  // Ev alanları
  rooms: number;
  bathrooms: number;
  livingRooms: number; // salon sayısı

  // Arsa alanları
  zoningStatus?: string; // imar durumu
  parcelNo?: string; // ada/parsel

  featured: boolean;
  createdAt: string; // ISO tarih
}

/**
 * Liste sayfasında kullanılan filtre tipi.
 * URL query parametrelerine (?category, ?type, ?q, ?min, ?max) eşlenir ve
 * sunucu tarafında MongoDB sorgusuna çevrilir.
 */
export interface PropertyFilters {
  category?: PropertyCategory;
  type?: PropertyType;
  query?: string;
  minPrice?: number;
  maxPrice?: number;
}

/** Müşteri yorumu (Testimonials bölümü). Yalnızca isim ve yorum. */
export interface Testimonial {
  id: string;
  name: string;
  comment: string;
}

/** İstatistik kartı (Örn: 500+ Mutlu Müşteri). */
export interface Stat {
  id: string;
  value: string;
  suffix?: string;
  label: string;
}
