import Image from "next/image";
import { Star, Quote } from "lucide-react";
import { getTestimonials } from "@/lib/data";

// Server Component: müşteri yorumlarını data.ts'ten çeker ve map eder.
export default async function Testimonials() {
  const testimonials = await getTestimonials();

  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="text-center">
        <p className="font-medium uppercase tracking-[0.2em] text-clay-500">
          Müşteri Yorumları
        </p>
        <h2 className="mt-2 font-display text-3xl font-bold text-ink sm:text-4xl">
          Müşterilerimiz ne diyor?
        </h2>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {testimonials.map((t) => (
          <figure
            key={t.id}
            className="relative flex flex-col rounded-xl2 bg-white p-6 shadow-sm ring-1 ring-black/5"
          >
            <Quote className="h-8 w-8 text-forest-100" aria-hidden />

            {/* Yıldız puanı */}
            <div className="mt-2 flex gap-0.5" aria-label={`${t.rating}/5 puan`}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < t.rating
                      ? "fill-clay-500 text-clay-500"
                      : "text-stone/30"
                  }`}
                />
              ))}
            </div>

            <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-stone">
              “{t.comment}”
            </blockquote>

            <figcaption className="mt-6 flex items-center gap-3 border-t border-black/5 pt-4">
              <Image
                src={t.avatarUrl}
                alt={t.name}
                width={44}
                height={44}
                className="h-11 w-11 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-semibold text-ink">{t.name}</p>
                <p className="text-xs text-stone">{t.role}</p>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
