# Anka Emlak — Next.js 15 + MongoDB + Admin

Next.js 15 (App Router) · TypeScript · Tailwind v4 · framer-motion ·
MongoDB (Mongoose) · Cloudinary · zod + react-hook-form.

## Kurulum

```bash
npm install
cp .env.example .env        # değerleri doldurun
npm run seed                # (opsiyonel) örnek ilanları yükle
npm run dev
```

## Ortam Değişkenleri (.env)

| Değişken | Açıklama |
| --- | --- |
| `MONGODB_URI` | MongoDB bağlantı adresi |
| `ADMIN_PASSWORD` | Admin paneli giriş şifresi |
| `ADMIN_SESSION_SECRET` | Oturum token'ı secret'ı (opsiyonel) |
| `CLOUDINARY_CLOUD_NAME` / `CLOUDINARY_API_KEY` / `CLOUDINARY_API_SECRET` | Görsel yükleme |

## Mimari

```
app/
  page.tsx                 Anasayfa (force-dynamic, ilanlar Mongo'dan)
  ilanlarim/page.tsx       Sunucu tarafı, kategoriye duyarlı filtreleme
  admin/login/page.tsx     Şifre korumalı giriş
  admin/page.tsx           Panel (korumalı)
  admin/add-property/      İlan ekleme formu (korumalı)
  api/admin/
    login | logout         Oturum cookie'si
    upload                 Cloudinary görsel yükleme
    properties             İlan kaydetme (zod doğrulamalı)
lib/
  mongodb.ts               Cache'li Mongoose bağlantısı
  models/Property.ts       Mongoose şeması
  properties.ts            Mongo veri erişimi (getProperties, createProperty…)
  data.ts                  Statik testimonials + stats
  filters.ts               Kategoriye göre fiyat skalası + query parser
  validators.ts            Paylaşılan zod şeması (form + API)
  auth.ts                  Edge-uyumlu oturum token'ı (HMAC)
  admin-guard.ts           API route'ları için oturum kontrolü
  cloudinary.ts            Cloudinary SDK yapılandırması
middleware.ts              /admin/* koruması
```

## Güvenlik

`/admin/*` rotaları `middleware.ts` ile korunur; oturum yoksa `/admin/login`'e
yönlendirilir. Giriş, `ADMIN_PASSWORD` ile doğrulanır ve httpOnly bir cookie'ye
HMAC tabanlı token yazar. API route'ları ayrıca `isAdminRequest()` ile kontrol
edilir (çift katman).

## Filtreleme Mantığı

`lib/filters.ts` kategoriye göre fiyat aralığını belirler:
- **Kiralık** → aylık kira (5.000 – 50.000 TL)
- **Satılık** → toplam fiyat (1.000.000 – 30.000.000 TL)

Arayüzdeki slider kategori değişince otomatik yeniden ölçeklenir; "Filtrele"
URL query'sini günceller ve sayfa sunucu tarafında MongoDB'yi yeniden sorgular.

## İlan Verisi

İlanlar artık `lib/data.ts` yerine MongoDB'den gelir (`lib/properties.ts`).
Admin panelinden eklenen ilanlar Cloudinary'ye yüklenip veritabanına kaydedilir
ve anında Anasayfa/İlanlarımız sayfalarında görünür.

## İlan Detayı & Admin CRUD (güncelleme)

- `/ilanlarim/[slug]` — herkese açık ilan detay sayfası (görsel galerisi,
  özellikler, açıklama, WhatsApp/ara CTA'ları).
- `/admin/properties` — tüm ilanların listesi; her satırda Düzenle / Sil.
- `/admin/edit-property/[id]` — mevcut ilanı düzenleme (aynı PropertyForm,
  prefill + PUT).
- `PUT /api/admin/properties/[id]` ve `DELETE /api/admin/properties/[id]`
  (zod doğrulamalı, admin korumalı).

İlan ekleme ve düzenleme aynı `components/admin/PropertyForm.tsx` bileşenini
kullanır (propertyId verilince PUT, verilmeyince POST).

## Güncelleme: Ev/Arsa, Medya, Salon, Kira Filtresi

- **Kira filtresi:** kiralık maksimum 1.000.000 TL (lib/filters.ts).
- **Ana kategori (kind):** "Ev" veya "Arsa". Arsa seçilince oda/banyo/salon
  gizlenir, İmar Durumu + Ada/Parsel alanları çıkar. Zorunluluklar hem
  Mongoose (koşullu required) hem Zod (superRefine) tarafında yönetilir.
- **Medya:** kapak fotoğrafı + ekstra fotoğraflar (çoklu) + video (URL veya
  dosya). Yükleme Cloudinary'de `resource_type: "auto"` ile yapılır. Detay
  sayfası galeri + video oynatıcı gösterir.
- **Salon sayısı (livingRooms):** modele, Zod'a, forma ve detay sayfasına eklendi.
- **Hakkımızda:** yan yana (grid), tek ekrana sığan (above the fold) yeni tasarım.

Not: Önceki `components/about/WhyUs.tsx` artık kullanılmıyor (Hakkımızda
yeniden tasarlandı); dilerseniz silebilirsiniz.

## Config Tabanlı Tema Sistemi

Kök dizindeki `theme.config.ts` içindeki `ACTIVE_THEME` değerini değiştirin:

```ts
export const ACTIVE_THEME: ThemeId = "tema-2"; // tüm site Lüks temaya geçer
```

Temalar (renk slot'ları `app/globals.css` içinde `[data-theme="..."]` ile tanımlı):
- `tema-1` Varsayılan (yeşil) — mevcut tasarım, birebir korunur
- `tema-2` Lüks (koyu kömür + altın/bronz, fildişi zemin)
- `tema-3` Doğa (orman yeşili + terracotta, bej zemin)
- `tema-4` Modern (grafit + dinamik turuncu, gri zemin)
- `tema-5` Minimal (siyah + koyu gri, beyaz zemin)

Çalışma mantığı: Bileşenler hep aynı utility'leri (`bg-forest-600`, `text-clay-500`,
`bg-sand`…) kullanır. Bunlar `var(--color-*)` değişkenlerine bağlıdır; her tema bu
değişkenleri yeniden değerler. `<html data-theme>` niteliği `theme.config.ts`'ten
gelir, böylece veritabanı gerekmez. Yeni tema eklemek için globals.css'e bir
`[data-theme="tema-6"]{…}` bloğu ve config tipine `'tema-6'` eklemeniz yeterli.
