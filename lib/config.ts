/** Site geneli sabitler ve navigasyon. Tek yerden yönetilir. */

export const siteConfig = {
  name: "Anka Emlak",
  description:
    "Doğru evi doğru insanla buluşturuyoruz. Satılık ve kiralık ilanlar.",
  phone: "+90 312 000 00 00",
  email: "info@ankaemlak.com",
  address: "Çankaya, Ankara",
  // WhatsApp numarası uluslararası formatta, yalnızca rakam (wa.me linki için)
  whatsapp: "905000000000",
};

/** Sosyal medya & iletişim kanalları — Top Bar ve Footer ortak kullanır. */
export const socialLinks = {
  instagram: "https://instagram.com/",
  facebook: "https://facebook.com/",
  whatsapp: `https://wa.me/${siteConfig.whatsapp}`,
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
