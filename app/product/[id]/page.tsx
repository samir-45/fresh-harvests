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
import { skipToken } from "@reduxjs/toolkit/query"; // conditional skip

export default function ProductDetailsPage() {
  const { id } = useParams<{ id?: string }>();

  const productArg = typeof id === "string" && id ? id : skipToken;
  const { data: productRes, isLoading: pLoading, error: pError } =
    useGetProductByIdQuery(productArg);

  const { data: allRes, isLoading: listLoading, error: listError } =
    useGetAllProductsQuery({ page: 1, limit: 1000 });

  const product = productRes?.data;

  // ✅ Ensure this is ALWAYS an array (Product[])
  const allProducts: Product[] = useMemo(() => {
    const v: any = allRes;

    // Try common server shapes safely
    const maybeArray =
      v?.data?.data ?? // { data: { data: Product[] } }
      v?.data ??       // { data: Product[] }
      v?.items ??      // { items: Product[] }
      v?.results ??    // { results: Product[] }
      v;               // Product[] directly

    return Array.isArray(maybeArray) ? (maybeArray as Product[]) : [];
  }, [allRes]);

  const related: Product[] = useMemo(() => {
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
        {pLoading && <div>Loading...</div>}
        {pError && <div>Failed to load product</div>}
        {!pLoading && !product && !pError && <div>Product not found</div>}

        {product && (
          <>
            {/* details part same as yours */}

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
