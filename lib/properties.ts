import mongoose from "mongoose";
import { connectToDatabase } from "./mongodb";
import PropertyModel from "./models/Property";
import { slugify } from "./utils";
import type { Property, PropertyFilters } from "./types";
import type { PropertyInput } from "./validators";

/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Doğrulanmış form/API verisini (PropertyInput) DB kayıt şekline çevirir.
 * kind === "arsa" ise ev alanlarını sıfırlar; ev ise arsa alanlarını boş bırakır.
 */
export function toPropertyData(
  data: PropertyInput
): Omit<Property, "id" | "slug" | "currency" | "createdAt"> {
  const isArsa = data.kind === "arsa";
  return {
    title: data.title,
    description: data.description,
    price: data.price,
    category: data.category,
    kind: data.kind,
    type: data.type,
    badge: data.badge ? data.badge : undefined,
    location: { city: data.city, district: data.district },
    area: data.area,
    coverImage: data.coverImage,
    imageUrls: data.imageUrls,
    videoUrl: data.videoUrl ? data.videoUrl : undefined,
    rooms: isArsa ? 0 : data.rooms,
    bathrooms: isArsa ? 0 : data.bathrooms,
    livingRooms: isArsa ? 0 : data.livingRooms,
    zoningStatus: isArsa ? data.zoningStatus : undefined,
    parcelNo: isArsa ? data.parcelNo : undefined,
    featured: data.featured,
  };
}

/** Mongo dökümanını (lean) frontend Property tipine serialize eder. */
function serialize(doc: any): Property {
  return {
    id: String(doc._id),
    slug: doc.slug,
    title: doc.title,
    description: doc.description,
    category: doc.category,
    kind: doc.kind ?? "ev",
    type: doc.type,
    badge: doc.badge ?? undefined,
    price: doc.price,
    currency: "TRY",
    location: {
      city: doc.location?.city ?? "",
      district: doc.location?.district ?? "",
    },
    area: doc.area ?? 0,
    coverImage: doc.coverImage ?? doc.imageUrls?.[0] ?? "",
    imageUrls: doc.imageUrls ?? [],
    videoUrl: doc.videoUrl ?? undefined,
    rooms: doc.rooms ?? 0,
    bathrooms: doc.bathrooms ?? 0,
    livingRooms: doc.livingRooms ?? 0,
    zoningStatus: doc.zoningStatus ?? undefined,
    parcelNo: doc.parcelNo ?? undefined,
    featured: Boolean(doc.featured),
    createdAt: (doc.createdAt ?? new Date()).toISOString?.() ?? "",
  };
}

/** Filtrelere göre ilanları getirir (sunucu tarafı). */
export async function getProperties(
  filters: PropertyFilters = {}
): Promise<Property[]> {
  await connectToDatabase();

  const query: Record<string, any> = {};

  if (filters.category) query.category = filters.category;
  if (filters.type) query.type = filters.type;

  // Kategoriye göre fiyat aralığı (min/max parseFilters tarafından kategoriye
  // uygun şekilde belirlenir)
  if (filters.minPrice != null || filters.maxPrice != null) {
    query.price = {};
    if (filters.minPrice != null) query.price.$gte = filters.minPrice;
    if (filters.maxPrice != null) query.price.$lte = filters.maxPrice;
  }

  // Metin araması: başlık veya konum
  if (filters.query) {
    const rx = new RegExp(filters.query, "i");
    query.$or = [
      { title: rx },
      { "location.city": rx },
      { "location.district": rx },
    ];
  }

  const docs = await PropertyModel.find(query)
    .sort({ createdAt: -1 })
    .lean()
    .exec();

  return docs.map(serialize);
}

/** Anasayfada gösterilecek öne çıkan ilanlar. */
export async function getFeaturedProperties(limit = 6): Promise<Property[]> {
  await connectToDatabase();
  const docs = await PropertyModel.find({ featured: true })
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean()
    .exec();
  return docs.map(serialize);
}

/** Tek bir ilanı slug ile getirir. */
export async function getPropertyBySlug(
  slug: string
): Promise<Property | null> {
  await connectToDatabase();
  const doc = await PropertyModel.findOne({ slug }).lean().exec();
  return doc ? serialize(doc) : null;
}

/** Tek bir ilanı id ile getirir (admin düzenleme için). */
export async function getPropertyById(id: string): Promise<Property | null> {
  await connectToDatabase();
  if (!mongoose.isValidObjectId(id)) return null;
  const doc = await PropertyModel.findById(id).lean().exec();
  return doc ? serialize(doc) : null;
}

/** Tüm ilanları getirir (admin listesi — filtresiz, en yeni önce). */
export async function getAllProperties(): Promise<Property[]> {
  await connectToDatabase();
  const docs = await PropertyModel.find({}).sort({ createdAt: -1 }).lean().exec();
  return docs.map(serialize);
}

/** Yeni ilan oluşturur (admin paneli). */
export async function createProperty(
  input: Omit<Property, "id" | "slug" | "currency" | "createdAt"> & {
    slug?: string;
  }
): Promise<Property> {
  await connectToDatabase();

  const baseSlug = input.slug?.trim() || slugify(input.title);
  // Slug benzersizliği: çakışırsa sonuna sayı ekle
  let slug = baseSlug;
  let n = 1;
  while (await PropertyModel.exists({ slug })) {
    slug = `${baseSlug}-${n++}`;
  }

  const created = await PropertyModel.create({ ...input, slug });
  return serialize(created.toObject());
}

/** Mevcut ilanı günceller. */
export async function updateProperty(
  id: string,
  input: Partial<Omit<Property, "id" | "currency" | "createdAt">>
): Promise<Property | null> {
  await connectToDatabase();
  if (!mongoose.isValidObjectId(id)) return null;
  const doc = await PropertyModel.findByIdAndUpdate(id, input, {
    new: true,
    runValidators: true,
  })
    .lean()
    .exec();
  return doc ? serialize(doc) : null;
}

/** İlanı siler. Başarılıysa true döner. */
export async function deleteProperty(id: string): Promise<boolean> {
  await connectToDatabase();
  if (!mongoose.isValidObjectId(id)) return false;
  const res = await PropertyModel.findByIdAndDelete(id).exec();
  return Boolean(res);
}
