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
    comment:
      "Çankaya'daki dairemizi tahmin ettiğimizden çok daha hızlı sattılar. Süreç boyunca her aşamada bilgilendirildik, gerçekten profesyonel bir ekip.",
  },
  {
    id: "2",
    name: "Mert Kaya",
    comment:
      "Yatırımlık arsa ararken bütçeme en uygun seçenekleri net biçimde sundular. Gizli masraf yok, şeffaf bir danışmanlık aldım.",
  },
  {
    id: "3",
    name: "Zeynep Demir",
    comment:
      "İlk evimi kiralarken çok gergindim ama danışmanım sabırla tüm sorularımı yanıtladı. Bir hafta içinde anahtarı aldım, teşekkürler!",
  },
  {
    id: "4",
    name: "Ahmet Şahin",
    comment:
      "Ev satışı sürecinde evrak işlerinin tamamını onlar takip etti. Bana neredeyse hiç yük binmedi, çok rahat bir deneyimdi.",
  },
  {
    id: "5",
    name: "Selin Aydın",
    comment:
      "Bölgeyi çok iyi tanıyorlar. Aradığım özelliklere uygun daireyi ilk hafta içinde bulup gösterdiler.",
  },
  {
    id: "6",
    name: "Kerem Öztürk",
    comment:
      "Fiyat konusunda gerçekçi ve dürüst yönlendirmeleri oldu. Piyasa değerinin üzerinde beklenti oluşturmadılar, bu güven verdi.",
  },
  {
    id: "7",
    name: "Buse Çelik",
    comment:
      "Kiraya vereceğim daire için harika kiracı buldular. İletişimleri hızlı, çözüm odaklı ve son derece nazik.",
  },
  {
    id: "8",
    name: "Onur Arslan",
    comment:
      "Yurt dışındaydım ve tüm süreci uzaktan yönettiler. Video görüşmelerle evi gezdirdiler, güvenle satın aldım.",
  },
  {
    id: "9",
    name: "Deniz Koç",
    comment:
      "Tapu aşamasında yaşadığım tereddütleri sabırla giderdiler. Satış sonrasında bile aradığımda destek oldular.",
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
