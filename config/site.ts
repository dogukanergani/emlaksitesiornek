/**
 * ============================================================
 *  BEYAZ ETİKET (WHITE-LABEL) MERKEZİ AYAR DOSYASI
 * ============================================================
 *  Yeni bir müşteri için SADECE bu dosyayı (ve theme.config.ts +
 *  .env değerlerini) düzenlemeniz yeterlidir. Ayrıntılar için
 *  kök dizindeki WHITELABEL.md dosyasına bakın.
 * ============================================================
 */

export const siteConfig = {
  /* --- Marka --- */
  siteName: "Anka Emlak",
  // Logo dosya yolu. public/ altına koyup "/logo.svg" gibi verin.
  // Boş bırakılırsa otomatik olarak ikon + site adı gösterilir.
  logoUrl: "",

  /* --- Tema renkleri ---
     Doldurulursa tüm site bu iki renkten türetilen palete geçer
     (theme.config.ts'teki ACTIVE_THEME'i geçersiz kılar).
     Boş bırakılırsa ACTIVE_THEME geçerli olur. */
  primaryColor: "", // örn. "#1e4d3b"
  accentColor: "", //  örn. "#c2703d"

  /* --- İletişim --- */
  phone: "+90 312 000 00 00",
  whatsappNumber: "905000000000", // yalnızca rakam (wa.me linki için)
  email: "info@ankaemlak.com",
  address: "Çankaya, Ankara",
  city: "Ankara",

  /* --- Sosyal medya --- */
  socialLinks: {
    instagram: "https://instagram.com/",
    facebook: "https://facebook.com/",
  },

  /* --- İçerik --- */
  footerDescription:
    "Doğru evi doğru insanla buluşturuyoruz. Satılık ve kiralık ilanlar.",

  /* --- SEO --- */
  seoTitle: "Anka Emlak | Satılık & Kiralık İlanlar",
  seoDescription:
    "Doğru evi doğru insanla buluşturuyoruz. Satılık ve kiralık ilanlar.",

  /* --- Analytics --- */
  // Müşterinin GA4 ölçüm kimliği (örn. "G-XXXXXXXXXX").
  // Boşsa Google Analytics kodu hiç yüklenmez.
  googleAnalyticsId: "",
};

/**
 * Bileşenlerin kullandığı sosyal medya bağlantıları.
 * WhatsApp linki whatsappNumber'dan otomatik türetilir.
 */
export const socialLinks = {
  instagram: siteConfig.socialLinks.instagram,
  facebook: siteConfig.socialLinks.facebook,
  whatsapp: `https://wa.me/${siteConfig.whatsappNumber}`,
};

export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: "Anasayfa", href: "/" },
  { label: "İlanlarımız", href: "/ilanlarim" },
  { label: "Hakkımızda", href: "/hakkimizda" },
  { label: "İletişim", href: "/iletisim" },
];

/** Hero altındaki hızlı kategori filtreleri. type değeri ?type= query'sine gider. */
export const quickCategories: { label: string; type: string }[] = [
  { label: "Villa", type: "villa" },
  { label: "Daire", type: "daire" },
  { label: "Arsa", type: "arsa" },
  { label: "Yazlık", type: "yazlik" },
];
