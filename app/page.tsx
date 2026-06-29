import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import FeaturedListings from "@/components/home/FeaturedListings";
import Stats from "@/components/home/Stats";
import Testimonials from "@/components/home/Testimonials";

// Öne çıkan ilanlar MongoDB'den geldiği için sayfa dinamik render edilir.
export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <FeaturedListings />
      <Stats />
      <Testimonials />
    </>
  );
}
