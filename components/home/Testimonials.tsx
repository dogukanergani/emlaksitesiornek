import { getTestimonials } from "@/lib/data";
import TestimonialsCarousel from "./TestimonialsCarousel";

// Server Component: yorumları data.ts'ten çeker, client carousel'e aktarır.
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

      <div className="mt-12">
        <TestimonialsCarousel testimonials={testimonials} />
      </div>
    </section>
  );
}
