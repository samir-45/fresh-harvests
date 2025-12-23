import AboutSection from "@/components/AboutSection";
import HeroSection from "@/components/layout/HeroSection";
import FeaturedProductsSection from "@/components/product/FeaturedProductsSection";
import SpecialOfferSection from "@/components/SpecialOfferSection";
import TestimonialsSection from "@/components/TestimonialsSection";

export default function HomePage() {
  return (
    <main className="min-h-screen relative">

      <HeroSection></HeroSection>

      <FeaturedProductsSection />

      <AboutSection></AboutSection>

      <SpecialOfferSection></SpecialOfferSection>

      <TestimonialsSection></TestimonialsSection>
    </main>
  );
}
