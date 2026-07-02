"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import type { Testimonial } from "@/lib/types";

/** Yorumları 3'erli gruplara böler. */
function chunk(items: Testimonial[], size = 3): Testimonial[][] {
  const groups: Testimonial[][] = [];
  for (let i = 0; i < items.length; i += size) {
    groups.push(items.slice(i, i + size));
  }
  return groups;
}

export default function TestimonialsCarousel({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const groups = chunk(testimonials, 3);
  const total = groups.length;
  const [page, setPage] = useState(0);

  const go = (dir: 1 | -1) => setPage((p) => (p + dir + total) % total);

  const arrowClass =
    "grid h-11 w-11 shrink-0 place-items-center rounded-full border border-black/10 bg-white text-ink shadow-sm transition-colors hover:bg-forest-600 hover:text-white disabled:opacity-40";

  return (
    <div>
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Sol ok */}
        <button
          type="button"
          onClick={() => go(-1)}
          disabled={total <= 1}
          aria-label="Önceki yorumlar"
          className={arrowClass}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        {/* 3'erli grup */}
        <div className="flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="grid gap-6 sm:grid-cols-2 md:grid-cols-3"
            >
              {groups[page]?.map((t) => (
                <figure
                  key={t.id}
                  className="flex h-full flex-col rounded-xl2 bg-white p-6 shadow-sm ring-1 ring-black/5"
                >
                  <Quote className="h-8 w-8 text-forest-100" aria-hidden />
                  <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-stone">
                    “{t.comment}”
                  </blockquote>
                  <figcaption className="mt-6 border-t border-black/5 pt-4 text-sm font-semibold text-ink">
                    {t.name}
                  </figcaption>
                </figure>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Sağ ok */}
        <button
          type="button"
          onClick={() => go(1)}
          disabled={total <= 1}
          aria-label="Sonraki yorumlar"
          className={arrowClass}
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Grup göstergeleri (dots) */}
      {total > 1 && (
        <div className="mt-8 flex justify-center gap-2">
          {groups.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setPage(i)}
              aria-label={`${i + 1}. gruba git`}
              aria-current={i === page}
              className={`h-2.5 rounded-full transition-all ${
                i === page ? "w-6 bg-forest-600" : "w-2.5 bg-stone/30"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
