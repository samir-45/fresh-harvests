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
  
  // 1. Get the single product
  const { 
    data: productRes, 
    isLoading: pLoading, 
    error: pError 
  } = useGetProductByIdQuery(productArg);

  // 2. Get the full list payload
  // Note: allProducts is the whole object { success: true, data: [...] }
  const { data: allProducts } = useGetAllProductsQuery({ page: 1, limit: 1000 });

  // 3. FIX: Extract the actual array from the payload safely
  // If allProducts is undefined, fallback to empty array
  // Use 'any' cast if Typescript is strict about the initial payload type
  const productsList = (allProducts as any)?.data || [];

  const product = productRes?.data;

  // 4. Calculate related products using the extracted array
  const related = useMemo(() => {
    if (!product) return [];
    
    return productsList
      .filter((p: Product) => p.categoryId === product.categoryId)
      .filter((p: Product) => p.id !== product.id)
      .slice(0, 4);
  }, [productsList, product]);

  // 5. FIX: Ensure fallback also uses the array, not the payload object
  const showRelated = related.length ? related : productsList.slice(0, 4);

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

              <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
                {showRelated.map((p: Product) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </section>
          </>
        )}
      </section>
    </main>
  );
}