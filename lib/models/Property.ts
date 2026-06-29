import { Schema, model, models, type InferSchemaType } from "mongoose";

/**
 * Property (İlan) Mongoose şeması.
 * `kind` alanı (ev/arsa) diğer alanların zorunluluğunu belirler:
 *  - ev   → rooms, bathrooms, livingRooms zorunlu
 *  - arsa → zoningStatus (imar), parcelNo (ada/parsel) zorunlu
 */

// Yardımcı: belirli bir kind için zorunluluk fonksiyonu
function requiredForKind(kind: "ev" | "arsa") {
  return function (this: { kind?: string }) {
    return this.kind === kind;
  };
}

const PropertySchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0, index: true },

    category: {
      type: String,
      enum: ["satilik", "kiralik"],
      required: true,
      index: true,
    },
    // Ana kategori: ev / arsa
    kind: {
      type: String,
      enum: ["ev", "arsa"],
      required: true,
      index: true,
    },
    // Konut tipi (arsa için "arsa")
    type: {
      type: String,
      enum: ["daire", "villa", "mustakil-ev", "arsa", "yazlik", "isyeri"],
      required: true,
      index: true,
    },
    badge: { type: String, enum: ["yeni", "firsat", "acil"], required: false },

    location: {
      city: { type: String, required: true },
      district: { type: String, required: true },
    },
    area: { type: Number, required: true, min: 0 }, // m² (her iki tip)

    // Medya
    coverImage: { type: String, required: true },
    imageUrls: { type: [String], default: [] }, // ekstra fotoğraflar
    videoUrl: { type: String, required: false },

    // Ev alanları (yalnızca kind === "ev" iken zorunlu)
    rooms: { type: Number, default: 0, required: requiredForKind("ev") },
    bathrooms: { type: Number, default: 0, required: requiredForKind("ev") },
    livingRooms: { type: Number, default: 0, required: requiredForKind("ev") },

    // Arsa alanları (yalnızca kind === "arsa" iken zorunlu)
    zoningStatus: { type: String, required: requiredForKind("arsa") }, // imar durumu
    parcelNo: { type: String, required: requiredForKind("arsa") }, // ada/parsel

    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export type PropertyDocument = InferSchemaType<typeof PropertySchema>;

export const PropertyModel =
  models.Property || model("Property", PropertySchema);

export default PropertyModel;
