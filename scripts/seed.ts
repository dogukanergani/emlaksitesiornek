/**
 * Veritabanını örnek ilanlarla doldurur.  Çalıştırma: npm run seed
 * (MONGODB_URI .env'de tanımlı olmalı)
 */
import "dotenv/config";
import { connectToDatabase } from "../lib/mongodb";
import PropertyModel from "../lib/models/Property";
import { slugify } from "../lib/utils";

const sample = [
  {
    title: "Çankaya'da Modern 3+1 Daire",
    description:
      "Şehrin merkezinde, ulaşıma yakın, ferah ve yeni yapı 3+1 daire. Açık mutfak ve geniş balkon.",
    category: "satilik",
    kind: "ev",
    type: "daire",
    badge: "yeni",
    price: 6450000,
    location: { city: "Ankara", district: "Çankaya" },
    area: 145,
    rooms: 3,
    livingRooms: 1,
    bathrooms: 2,
    featured: true,
    coverImage:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&q=80",
    imageUrls: [
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  {
    title: "Bodrum'da Havuzlu Müstakil Villa",
    description:
      "Doğayla iç içe, özel havuzlu, 5+2 lüks villa. Bahçe ve kapalı otopark mevcut.",
    category: "satilik",
    kind: "ev",
    type: "villa",
    badge: "firsat",
    price: 28500000,
    location: { city: "Muğla", district: "Bodrum" },
    area: 380,
    rooms: 5,
    livingRooms: 2,
    bathrooms: 4,
    featured: true,
    coverImage:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80",
    imageUrls: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  {
    title: "Kadıköy'de Eşyalı 2+1 Kiralık",
    description:
      "Metroya yürüme mesafesinde, eşyalı, hemen taşınmaya hazır 2+1 daire.",
    category: "kiralik",
    kind: "ev",
    type: "daire",
    price: 38000,
    location: { city: "İstanbul", district: "Kadıköy" },
    area: 95,
    rooms: 2,
    livingRooms: 1,
    bathrooms: 1,
    featured: true,
    coverImage:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
    imageUrls: [],
  },
  {
    title: "Çeşme'de Bahçeli Yazlık",
    description:
      "Denize 5 dakika, geniş bahçeli, taş mimarili yazlık. Sezonluk veya yıllık.",
    category: "kiralik",
    kind: "ev",
    type: "yazlik",
    badge: "acil",
    price: 45000,
    location: { city: "İzmir", district: "Çeşme" },
    area: 210,
    rooms: 4,
    livingRooms: 1,
    bathrooms: 3,
    featured: false,
    coverImage:
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1200&q=80",
    imageUrls: [],
  },
  {
    title: "İmarlı Yatırımlık Arsa",
    description:
      "Gelişen bölgede, yola cepheli, konut imarlı 850 m² yatırımlık arsa.",
    category: "satilik",
    kind: "arsa",
    type: "arsa",
    badge: "firsat",
    price: 4200000,
    location: { city: "Antalya", district: "Döşemealtı" },
    area: 850,
    zoningStatus: "Konut imarlı",
    parcelNo: "1234 / 56",
    featured: true,
    coverImage:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
    imageUrls: [
      "https://images.unsplash.com/photo-1542889601-399c4f3a8402?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  {
    title: "Köyde Geniş Tarla / Arsa",
    description:
      "Sulanabilir, yola cepheli, müstakil tapulu geniş tarla. Yatırıma uygun.",
    category: "satilik",
    kind: "arsa",
    type: "arsa",
    price: 1850000,
    location: { city: "Ankara", district: "Kazan" },
    area: 2400,
    zoningStatus: "Tarla",
    parcelNo: "207 / 14",
    featured: false,
    coverImage:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=1200&q=80",
    imageUrls: [],
  },
];

async function seed() {
  await connectToDatabase();
  await PropertyModel.deleteMany({});
  const withSlugs = sample.map((p) => ({ ...p, slug: slugify(p.title) }));
  await PropertyModel.insertMany(withSlugs);
  console.log(`✓ ${withSlugs.length} ilan eklendi.`);
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
