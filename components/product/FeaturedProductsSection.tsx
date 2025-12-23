"use client";

import { useMemo, useState } from "react";
import { useGetCategoriesQuery, useGetProductsQuery } from "@/store/services/api";
import ProductCard from "./ProductCard";
import { usePathname } from "next/navigation";

export default function FeaturedProductsSection() {
    const pathname = usePathname();
  const isHome = pathname === "/";

  const { data: catRes } = useGetCategoriesQuery();
const { data: prodRes, isLoading } = useGetProductsQuery({ page: 1, limit: 1000 });


  const categories = catRes?.data ?? [];
  const products = prodRes?.data ?? [];

  const tabs = useMemo(() => ["All", ...categories.map((c) => c.categoryName)], [categories]);
  const [active, setActive] = useState("All");

  
  const filtered = useMemo(() => {
    if (active === "All") return products;
    const cat = categories.find((c) => c.categoryName === active);
    console.log("cat?.id:", cat?.id);

    if (!cat) return products;
    return products.filter((p) => p.categoryId === cat.id);
  }, [active, products, categories]);

    const visibleProducts = useMemo(() => {
    return isHome ? filtered.slice(0, 8) : filtered;
  }, [filtered, isHome]);

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <div className="text-center">
        <div className="mx-auto inline-flex rounded-md bg-[#759b3f34] px-3 py-1 text-xs font-medium text-[#749B3F]">
          Our Products
        </div>
        <h2 className="mt-3 text-3xl font-bold text-gray-900">Our Fresh Products</h2>
        <p className="mx-auto mt-2 max-w-xl text-sm text-gray-500">
          We pride ourselves on offering a wide variety of fresh and flavorful fruits, vegetables, and salad ingredients.
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setActive(t)}
              className={[
                "rounded-lg  px-4 py-2 text-sm",
                active === t ? "bg-[#749B3F] text-white" : "bg-white border text-[#A6A6A6] hover:bg-gray-50",
              ].join(" ")}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 md:grid-cols-4">
        {isLoading
          ? Array.from({ length: isHome ? 8 : 12 }).map((_, i) => (
              <div key={i} className="h-[260px] rounded-2xl bg-gray-100" />
            ))
          : visibleProducts.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </section>
  );
}
