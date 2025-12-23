"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import ProductCard from "@/components/product/ProductCard";
import {
  useGetProductByIdQuery,
  useGetProductsQuery,
  type Product,
} from "@/store/services/api";
import { skipToken } from "@reduxjs/toolkit/query"; // conditional fetching helper [web:656]

export default function ProductDetailsPage() {
  const params = useParams<{ id?: string }>(); // useParams is client-only [web:759]
  const id = params?.id;

  // If id is missing, skip the query (prevents calling endpoint with undefined) [web:656]
  const {
    data: productRes,
    isLoading: productLoading,
    error: productError,
  } = useGetProductByIdQuery(typeof id === "string" && id ? id : (skipToken as any));

  const {
    data: allRes,
    isLoading: listLoading,
    error: listError,
  } = useGetProductsQuery();

  const product = productRes?.data;
  const all = allRes?.data ?? [];

  const related: Product[] = useMemo(() => {
    if (!product) return [];
    return all
      .filter((p) => p.categoryId === product.categoryId)
      .filter((p) => p.id !== product.id)
      .slice(0, 4);
  }, [all, product]);

  const showRelated = related.length ? related : all.slice(0, 4);

  return (
    <main className="min-h-screen bg-[#f6f7f4]">
      <Navbar />

      <section className="mx-auto max-w-6xl px-4 py-10">
        {/* Top states */}
        {!id && <div>Invalid product URL.</div>}

        {productLoading && <div>Loading...</div>}
        {productError && <div>Failed to load product</div>}
        {!productLoading && !product && !productError && id && <div>Product not found</div>}

        {/* Product details */}
        {product && (
          <>
            <div className="grid gap-10 md:grid-cols-2">
              <div className="rounded-2xl bg-white p-6">
                <div className="flex items-center justify-center">
                  <img
                    src={product.images?.[0] || "/assets/images/placeholder.png"}
                    alt={product.productName}
                    className="max-h-[320px] object-contain"
                  />
                </div>
              </div>

              <div>
                <div className="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                  {product.category?.categoryName ?? "Category"}
                </div>

                <h1 className="mt-3 text-3xl font-bold text-gray-900">
                  {product.productName}
                </h1>

                <div className="mt-4 text-2xl font-semibold text-orange-600">
                  ${product.price}/kg
                </div>

                <p className="mt-4 text-sm text-gray-600">{product.description}</p>

                <div className="mt-6 flex gap-4">
                  <button className="rounded-lg border px-5 py-3 text-sm">
                    Save as favorite
                  </button>
                  <button className="rounded-lg bg-orange-500 px-6 py-3 text-sm font-medium text-white">
                    Add to cart
                  </button>
                </div>
              </div>
            </div>

            {/* Related products */}
            <section className="mt-12">
              <div className="text-center">
                <div className="mx-auto inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                  Our Products
                </div>
                <h2 className="mt-3 text-2xl font-bold text-gray-900">Related products</h2>
              </div>

              {(listLoading || listError) && (
                <div className="mt-8 text-center text-sm text-gray-500">
                  {listLoading ? "Loading related..." : "Failed to load related products."}
                </div>
              )}

              {!listLoading && !listError && (
                <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
                  {showRelated.map((p: Product) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </section>
    </main>
  );
}
