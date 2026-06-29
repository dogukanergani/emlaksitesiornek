import { z } from "zod";

/**
 * İlan formu + API'nin paylaştığı tek doğrulama şeması (zod).
 * `kind` (ev/arsa) alanına göre koşullu zorunluluklar superRefine ile uygulanır.
 * Sayısal alanlar formda valueAsNumber ile number olarak gelir; şema coerce/
 * default kullanmaz (giriş = çıkış tipi → react-hook-form ile uyumlu).
 */
const EV_TYPES = ["daire", "villa", "mustakil-ev", "yazlik", "isyeri"] as const;

export const propertyInputSchema = z
  .object({
    title: z.string().min(3, "Başlık en az 3 karakter olmalı."),
    description: z.string().min(10, "Açıklama en az 10 karakter olmalı."),
    price: z.number().positive("Fiyat 0'dan büyük olmalı."),
    category: z.enum(["satilik", "kiralik"]),
    kind: z.enum(["ev", "arsa"]),
    type: z.enum(["daire", "villa", "mustakil-ev", "arsa", "yazlik", "isyeri"]),
    city: z.string().min(2, "Şehir girin."),
    district: z.string().min(2, "İlçe girin."),
    area: z.number().positive("Metrekare girin."),

    // Medya
    coverImage: z.string().url("Kapak fotoğrafı yükleyin."),
    imageUrls: z.array(z.string().url()), // ekstra fotoğraflar (boş olabilir)
    videoUrl: z.union([z.string().url(), z.literal("")]).optional(),

    badge: z
      .union([z.enum(["yeni", "firsat", "acil"]), z.literal("")])
      .optional(),
    featured: z.boolean(),

    // Ev alanları
    rooms: z.number().min(0),
    bathrooms: z.number().min(0),
    livingRooms: z.number().min(0),

    // Arsa alanları (string; arsa iken superRefine ile zorunlu)
    zoningStatus: z.string(),
    parcelNo: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.kind === "arsa") {
      if (data.type !== "arsa") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["type"],
          message: "Arsa kategorisinde tip 'arsa' olmalı.",
        });
      }
      if (data.zoningStatus.trim().length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["zoningStatus"],
          message: "İmar durumu girin.",
        });
      }
      if (data.parcelNo.trim().length < 1) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["parcelNo"],
          message: "Ada/parsel girin.",
        });
      }
    } else {
      // ev
      if (!EV_TYPES.includes(data.type as (typeof EV_TYPES)[number])) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["type"],
          message: "Geçerli bir konut tipi seçin.",
        });
      }
    }
  });

export type PropertyInput = z.infer<typeof propertyInputSchema>;
