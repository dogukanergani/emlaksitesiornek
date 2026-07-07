"use client";

import { motion, MotionConfig, type Variants } from "framer-motion";
import type { Property } from "@/lib/types";
import PropertyCard from "./PropertyCard";

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

/**
 * İlan kartlarını framer-motion ile animasyonlu render eder.
 * - Mount olduğu anda kademeli (stagger) fade-in (scroll/viewport'a bağlı
 *   değil — filtre değiştiğinde grid görünürde olsa da olmasa da anında
 *   render edilmeli; `whileInView` sayfa kaydırılmadan tetiklenmediği için
 *   kartların opacity:0'da takılı kalmasına yol açıyordu)
 * - `reducedMotion="user"`: azaltılmış hareket tercihini framer-motion
 *   kendi içinde (mount sonrası) uygular; variant değerleri SSR/CSR arasında
 *   sabit kaldığı için hydration uyuşmazlığı oluşmaz.
 * - Hover'da hafif büyüme + gölge artışı
 * Veri dışarıdan `properties` ile gelir; bu bileşen yalnızca sunum yapar.
 */
export default function PropertyGrid({
  properties,
}: {
  properties: Property[];
}) {
  if (!properties?.length) return null;

  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {properties.map((property) => (
          <motion.div
            key={property.id}
            variants={item}
            whileHover={{
              scale: 1.025,
              boxShadow: "0 20px 40px -12px rgba(15, 40, 32, 0.18)",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            className="rounded-xl2"
          >
            <PropertyCard property={property} />
          </motion.div>
        ))}
      </motion.div>
    </MotionConfig>
  );
}
