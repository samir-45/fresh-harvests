"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import ProductCard from "@/components/product/ProductCard";
import {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  type Product,
} from "@/store/services/api";
import { skipToken } from "@reduxjs/toolkit/query";

export default function ProductDetailsPage() {
  const { id } = useParams<{ id?: string }>();

  const productArg = typeof id === "string" && id ? id : skipToken;
  const { data: productRes } = useGetProductByIdQuery(productArg);
  const product = productRes?.data ?? null;

const { data: allProducts = [] } = useGetAllProductsQuery({ page: 1, limit: 1000 });


  const related = useMemo<Product[]>(() => {
    if (!product) return [];

    return allProducts
      .filter((p) => p.categoryId === product.categoryId)
      .filter((p) => p.id !== product.id)
      .slice(0, 4);
  }, [allProducts, product]);

  const showRelated = related.length ? related : allProducts.slice(0, 4);

  return (
    <main className="min-h-screen bg-[#f6f7f4]">
      <Navbar />

      <section className="mx-auto max-w-6xl px-4 py-10">
        {product && (
          <section className="mt-12">
            <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
              {showRelated.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </section>
    </main>
  );
}
