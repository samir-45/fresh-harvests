import AboutSection from "@/components/AboutSection";
import HeroSection from "@/components/layout/HeroSection";
import FeaturedProductsSection from "@/components/product/FeaturedProductsSection";

export default function HomePage() {
  return (
    <main className="min-h-screen relative">

      <HeroSection></HeroSection>

      <FeaturedProductsSection />

      <AboutSection></AboutSection>
    </main>
  );
}
