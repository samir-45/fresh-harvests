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
import { skipToken } from "@reduxjs/toolkit/query"; // conditional skip [web:656]

export default function ProductDetailsPage() {
  const { id } = useParams<{ id?: string }>(); // client-only hook [web:759]

  const productArg = typeof id === "string" && id ? id : skipToken;
  const { data: productRes, isLoading: pLoading, error: pError } =
    useGetProductByIdQuery(productArg);

  // Your endpoint expects an arg -> pass it (page/limit)
  const { data: allRes, isLoading: listLoading, error: listError } =
    useGetProductsQuery({ page: 1, limit: 1000 });

  const product = productRes?.data;

  // FIX: allRes.data is ProductsListPayload, products array is inside .data
  const all: Product[] = (allRes?.data?.data ?? []) as Product[];

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
        {pLoading && <div>Loading...</div>}
        {pError && <div>Failed to load product</div>}
        {!pLoading && !product && !pError && <div>Product not found</div>}

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

            <section className="mt-12">
              <div className="text-center">
                <div className="mx-auto inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                  Our Products
                </div>
                <h2 className="mt-3 text-2xl font-bold text-gray-900">
                  Related products
                </h2>
              </div>

              {listLoading ? (
                <div className="mt-8 text-center text-sm text-gray-500">
                  Loading related...
                </div>
              ) : listError ? (
                <div className="mt-8 text-center text-sm text-gray-500">
                  Failed to load related products.
                </div>
              ) : (
                <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
                  {showRelated.map((p) => (
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
