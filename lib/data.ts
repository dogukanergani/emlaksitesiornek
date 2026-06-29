import type { Testimonial, Stat } from "./types";

/**
 * STATİK İÇERİK KATMANI
 * ---------------------
 * İlan (Property) verileri artık MongoDB'den gelir (bkz. lib/properties.ts).
 * Müşteri yorumları ve istatistikler şimdilik burada statik durur; istenirse
 * bunlar da kolayca bir koleksiyona taşınabilir (aynı getter imzasıyla).
 */

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Elif Yıldırım",
    role: "Daire Sahibi",
    avatarUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    comment:
      "Çankaya'daki dairemizi tahmin ettiğimizden çok daha hızlı sattılar. Süreç boyunca her aşamada bilgilendirildik, gerçekten profesyonel bir ekip.",
  },
  {
    id: "2",
    name: "Mert Kaya",
    role: "Yatırımcı",
    avatarUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    comment:
      "Yatırımlık arsa ararken bütçeme en uygun seçenekleri net biçimde sundular. Gizli masraf yok, şeffaf bir danışmanlık aldım.",
  },
  {
    id: "3",
    name: "Zeynep Demir",
    role: "Kiracı",
    avatarUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    comment:
      "İlk evimi kiralarken çok gergindim ama danışmanım sabırla tüm sorularımı yanıtladı. Bir hafta içinde anahtarı aldım, teşekkürler!",
  },
];

const stats: Stat[] = [
  { id: "1", value: "500", suffix: "+", label: "Mutlu Müşteri" },
  { id: "2", value: "15", suffix: " Yıl", label: "Sektör Tecrübesi" },
  { id: "3", value: "1.200", suffix: "+", label: "Aktif İlan" },
  { id: "4", value: "98", suffix: "%", label: "Memnuniyet Oranı" },
];

export async function getTestimonials(): Promise<Testimonial[]> {
  return testimonials;
}

export async function getStats(): Promise<Stat[]> {
  return stats;
}
