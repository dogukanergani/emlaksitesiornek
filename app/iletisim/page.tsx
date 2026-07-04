import type { Metadata } from "next";
import { MapPin, Phone, Mail } from "lucide-react";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = { title: "İletişim" };

const items = [
  { Icon: MapPin, label: "Adres", value: siteConfig.address },
  { Icon: Phone, label: "Telefon", value: siteConfig.phone },
  { Icon: Mail, label: "E-posta", value: siteConfig.email },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <p className="font-medium uppercase tracking-[0.2em] text-clay-500">
        İletişim
      </p>
      <h1 className="mt-2 font-display text-3xl font-bold text-ink sm:text-4xl">
        Bize ulaşın
      </h1>
      <p className="mt-4 max-w-2xl leading-relaxed text-stone">
        Sorularınız için aşağıdaki kanallardan bize ulaşabilirsiniz. Dilerseniz
        sağ alttaki WhatsApp butonundan anında yazabilirsiniz.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {items.map(({ Icon, label, value }) => (
          <div
            key={label}
            className="rounded-xl2 bg-white p-6 ring-1 ring-black/5"
          >
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-forest-50 text-forest-600">
              <Icon className="h-5 w-5" />
            </span>
            <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-stone">
              {label}
            </p>
            <p className="mt-1 text-sm font-medium text-ink">{value}</p>
          </div>
        ))}
      </div>

      {/* Google Maps — şehir config'ten (API anahtarı gerektirmeyen embed) */}
      <div className="mt-10 overflow-hidden rounded-xl2 ring-1 ring-black/5">
        <iframe
          title={`${siteConfig.siteName} konum — ${siteConfig.city}`}
          src={`https://maps.google.com/maps?q=${encodeURIComponent(
            siteConfig.city
          )}&z=12&output=embed`}
          width="100%"
          height="420"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
    </div>
  );
}
