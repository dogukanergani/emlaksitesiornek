import type { Metadata } from "next";
import Image from "next/image";
import { ShieldCheck, Award, HeartHandshake } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { getStats } from "@/lib/data";

export const metadata: Metadata = { title: "Hakkımızda" };

const highlights = [
  { Icon: Award, label: "15 yıllık tecrübe" },
  { Icon: ShieldCheck, label: "Güvenli işlem" },
  { Icon: HeartHandshake, label: "Şeffaf hizmet" },
];

export default async function AboutPage() {
  const stats = await getStats();

  return (
    // Üst bar (40px) + navbar (64px) = 104px; içerik tek ekrana sığar.
    <section className="mx-auto flex min-h-[calc(100svh-104px)] max-w-6xl items-center px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid w-full items-center gap-10 lg:grid-cols-2">
        {/* SOL: metin + istatistikler */}
        <div>
          <p className="font-medium uppercase tracking-[0.2em] text-clay-500">
            Hakkımızda
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold leading-tight text-ink sm:text-4xl lg:text-5xl">
            Doğru evi doğru insanla buluşturuyoruz
          </h1>
          <p className="mt-4 leading-relaxed text-stone">
            {siteConfig.siteName}, satılık ve kiralık gayrimenkulde uzmanlaşmış bir
            danışmanlık markasıdır. İlan araştırmasından sözleşmeye kadar tüm
            süreçte, şeffaf ve güvenli bir deneyim sunarız.
          </p>

          {/* Öne çıkan değerler */}
          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
            {highlights.map(({ Icon, label }) => (
              <li
                key={label}
                className="flex items-center gap-2 text-sm font-medium text-ink"
              >
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-forest-50 text-forest-600">
                  <Icon className="h-4 w-4" />
                </span>
                {label}
              </li>
            ))}
          </ul>

          {/* İstatistikler (data.ts'ten) */}
          <dl className="mt-8 grid grid-cols-2 gap-4 sm:max-w-md">
            {stats.map((s) => (
              <div
                key={s.id}
                className="rounded-xl2 bg-white p-4 ring-1 ring-black/5"
              >
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display text-2xl font-bold text-forest-700">
                  {s.value}
                  <span className="text-clay-500">{s.suffix}</span>
                </dd>
                <p className="mt-0.5 text-xs text-stone">{s.label}</p>
              </div>
            ))}
          </dl>
        </div>

        {/* SAĞ: görsel */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl2 ring-1 ring-black/5 lg:aspect-auto lg:h-[28rem]">
          <Image
            src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=1400&q=80"
            alt={`${siteConfig.siteName} ekibi ve ofisi`}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
