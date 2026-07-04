# Anka Emlak

Küçük ve orta ölçekli emlak ofisleri için geliştirdiğimiz, 
Velora adlı Ajansımız tarafından sunulan hazır web sitesi çözümü.

Next.js 15 · TypeScript · Tailwind v4 · MongoDB · Cloudinary

Küçük emlak ofisleri için yönetilebilir ilan sitesi. Admin panelinden 
ilan ekle/düzenle/sil, fotoğraf ve video yükle, anında yayına gir.

## Kurulum

```bash
npm install
cp .env.example .env   # değerleri doldurun
npm run dev
```

## Ortam Değişkenleri

| Değişken | Açıklama |
|---|---|
| `MONGODB_URI` | MongoDB bağlantı adresi |
| `ADMIN_PASSWORD` | Admin paneli şifresi |
| `CLOUDINARY_CLOUD_NAME` / `CLOUDINARY_API_KEY` / `CLOUDINARY_API_SECRET` | Görsel yükleme |

## Tema

`theme.config.ts` içindeki `ACTIVE_THEME` değerini değiştirerek 
5 hazır tema arasında geçiş yapabilirsiniz.