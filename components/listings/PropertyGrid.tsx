"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { Property } from "@/lib/types";
import PropertyCard from "./PropertyCard";

/**
 * İlan kartlarını framer-motion ile animasyonlu render eder.
 * - Sayfaya/görüş alanına girerken kademeli (stagger) fade-in
 * - Hover'da hafif büyüme + gölge artışı
 * Veri dışarıdan `properties` ile gelir; bu bileşen yalnızca sunum yapar.
 */
export default function PropertyGrid({
  properties,
}: {
  properties: Property[];
}) {
  const reduce = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.08 },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {properties.map((property) => (
        <motion.div
          key={property.id}
          variants={item}
          whileHover={
            reduce
              ? undefined
              : {
                  scale: 1.025,
                  boxShadow: "0 20px 40px -12px rgba(15, 40, 32, 0.18)",
                }
          }
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          className="rounded-xl2"
        >
          <PropertyCard property={property} />
        </motion.div>
      ))}
    </motion.div>
  );
}
