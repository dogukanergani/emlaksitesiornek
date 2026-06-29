import {
  Award,
  Users,
  ShieldCheck,
  Clock,
  MapPinned,
  HeartHandshake,
  type LucideIcon,
} from "lucide-react";

interface Advantage {
  Icon: LucideIcon;
  title: string;
  text: string;
}

const advantages: Advantage[] = [
  {
    Icon: Award,
    title: "15 Yıllık Tecrübe",
    text: "Sektörde 15 yılı aşkın deneyimimizle binlerce başarılı işleme imza attık.",
  },
  {
    Icon: Users,
    title: "Uzman Kadro",
    text: "Bölgesini iyi tanıyan, lisanslı ve deneyimli danışmanlarla çalışırsınız.",
  },
  {
    Icon: ShieldCheck,
    title: "Güvenli İşlem",
    text: "Tapudan sözleşmeye kadar her adım hukuki güvence altında ilerler.",
  },
  {
    Icon: Clock,
    title: "Hızlı Sonuç",
    text: "Geniş alıcı–satıcı ağımız sayesinde süreçleri belirgin biçimde kısaltırız.",
  },
  {
    Icon: MapPinned,
    title: "Yerel Uzmanlık",
    text: "Ankara ve çevresindeki mahalleleri sokak sokak biliyoruz.",
  },
  {
    Icon: HeartHandshake,
    title: "Satış Sonrası Destek",
    text: "İşlem bittikten sonra da taşınma ve resmi süreçlerde yanınızdayız.",
  },
];

export default function WhyUs() {
  return (
    <section className="border-t border-black/5">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="font-medium uppercase tracking-[0.2em] text-clay-500">
            Avantajlarımız
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold text-ink sm:text-4xl">
            Neden Bizi Seçmelisiniz?
          </h2>
        </div>

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {advantages.map(({ Icon, title, text }) => (
            <div key={title} className="flex gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-forest-50 text-forest-600">
                <Icon className="h-6 w-6" />
              </span>
              <div>
                <h3 className="font-display text-lg font-bold text-ink">
                  {title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-stone">
                  {text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
