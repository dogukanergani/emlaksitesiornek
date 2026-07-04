"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search, MapPin, ArrowRight } from "lucide-react";
import type { PropertyCategory } from "@/lib/types";
import { quickCategories, siteConfig } from "@/lib/config";

const tabs: { value: PropertyCategory; label: string }[] = [
  { value: "satilik", label: "Satılık" },
  { value: "kiralik", label: "Kiralık" },
];

export default function Hero() {
  const router = useRouter();
  const [category, setCategory] = useState<PropertyCategory>("satilik");
  const [query, setQuery] = useState("");

  function handleSearch() {
    const params = new URLSearchParams({ category });
    if (query.trim()) params.set("query", query.trim());
    router.push(`/ilanlarim?${params.toString()}`);
  }

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      {/* Arka plan görseli — next/image ile optimize, LCP için priority */}
      <Image
        src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=80"
        alt="Modern bir evin dış cephesi"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div
        className="absolute inset-0 bg-gradient-to-br from-forest-900/85 via-forest-900/70 to-forest-900/40"
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="font-medium uppercase tracking-[0.2em] text-clay-500">
          {siteConfig.siteName}
        </p>
        <h1 className="mt-3 max-w-2xl font-display text-4xl font-bold leading-[1.1] text-white sm:text-5xl lg:text-6xl">
          Hayalinizdeki eve giden yol burada başlar.
        </h1>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/80">
          Binlerce satılık ve kiralık ilan arasından size en uygun olanı
          bulalım. Konumu yazın, gerisini bize bırakın.
        </p>

        {/* İMZA ÖĞESİ: Arama çubuğu — sayfa açılır açılmaz görünür */}
        <div className="mt-8 max-w-2xl rounded-xl2 bg-white/95 p-2 shadow-2xl shadow-forest-900/20 backdrop-blur sm:p-3">
          {/* Sekmeler */}
          <div className="flex gap-1 p-1">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                type="button"
                onClick={() => setCategory(tab.value)}
                className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                  category === tab.value
                    ? "bg-forest-600 text-white"
                    : "text-stone hover:bg-black/5"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Giriş + buton */}
          <div className="flex flex-col gap-2 p-1 sm:flex-row sm:items-center">
            <div className="flex flex-1 items-center gap-2 rounded-lg px-3">
              <MapPin className="h-5 w-5 shrink-0 text-stone" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Şehir veya ilçe (örn. Çankaya)"
                className="w-full bg-transparent py-3 text-ink outline-none placeholder:text-stone/70"
              />
            </div>
            <button
              type="button"
              onClick={handleSearch}
              className="flex items-center justify-center gap-2 rounded-lg bg-forest-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-forest-700"
            >
              <Search className="h-5 w-5" />
              Ara
            </button>
          </div>
        </div>

        {/* Ana CTA + hızlı kategori filtreleri (badges) */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Link
            href="/ilanlarim"
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-forest-700 shadow-lg shadow-forest-900/20 transition-transform hover:scale-[1.03]"
          >
            Tüm İlanları Gör
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Hızlı erişim kategorileri */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-sm text-white/60">Hızlı erişim:</span>
          {quickCategories.map((cat) => (
            <Link
              key={cat.type}
              href={`/ilanlarim?type=${cat.type}`}
              className="rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur transition-colors hover:border-white/60 hover:bg-white/20"
            >
              {cat.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
