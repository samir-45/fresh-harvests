import HeroSection from "@/components/layout/HeroSection";
import FeaturedProductsSection from "@/components/product/FeaturedProductsSection";

export default function HomePage() {
  return (
    <main className="min-h-screen relative">

      <HeroSection></HeroSection>

      <FeaturedProductsSection />
    </main>
  );
}
