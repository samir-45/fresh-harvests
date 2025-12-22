import HeroSection from "@/components/layout/HeroSection";
import Navbar from "@/components/layout/Navbar";
import FeaturedProductsSection from "@/components/product/FeaturedProductsSection";

export default function HomePage() {
  return (
    <main className="min-h-screen relative">
      {/* <Navbar /> */}

      <HeroSection></HeroSection>

      <FeaturedProductsSection />
    </main>
  );
}
