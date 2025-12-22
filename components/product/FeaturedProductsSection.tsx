"use client";

import { useMemo, useState } from "react";
import { useGetCategoriesQuery, useGetProductsQuery } from "@/store/services/api";
import ProductCard from "./ProductCard";

export default function FeaturedProductsSection() {
  const { data: catRes } = useGetCategoriesQuery();
  const { data: prodRes, isLoading } = useGetProductsQuery();

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

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <div className="text-center">
        <div className="mx-auto inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
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
                "rounded-lg border px-4 py-2 text-sm",
                active === t ? "bg-green-600 text-white border-green-600" : "bg-white text-gray-600 hover:bg-gray-50",
              ].join(" ")}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
{isLoading
  ? Array.from({ length: filtered.length || 8 }).map((_, i) => (
      <div key={i} className="h-[260px] rounded-2xl bg-gray-100" />
    ))
  : filtered.map((p) => (
      <ProductCard key={p.id} product={p} />
    ))}
      </div>
    </section>
  );
}
