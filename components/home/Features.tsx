import { ShieldCheck, Handshake, Search } from "lucide-react";

const features = [
  {
    Icon: Search,
    title: "Geniş portföy",
    text: "Satılık ve kiralık binlerce ilan tek bir yerde, güncel ve doğrulanmış.",
  },
  {
    Icon: ShieldCheck,
    title: "Güvenli süreç",
    text: "Tapudan sözleşmeye kadar her adımda uzman danışman desteği.",
  },
  {
    Icon: Handshake,
    title: "Şeffaf hizmet",
    text: "Gizli ücret yok. Net fiyat, net süreç, net iletişim.",
  },
];

export default function Features() {
  return (
    <section className="border-y border-black/5 bg-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:grid-cols-3 sm:px-6 lg:px-8">
        {features.map(({ Icon, title, text }) => (
          <div key={title}>
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-forest-50 text-forest-600">
              <Icon className="h-6 w-6" />
            </span>
            <h3 className="mt-4 font-display text-lg font-bold text-ink">
              {title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-stone">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
