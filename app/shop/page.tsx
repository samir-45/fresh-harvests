"use client";

import Navbar from "@/components/layout/Navbar";
import FeaturedProductsSection from "@/components/product/FeaturedProductsSection";

export default function ShopPage() {
  return (
    <main className="min-h-screen bg-[#f6f7f4]">
      <Navbar />
      <FeaturedProductsSection />
    </main>
  );
}
