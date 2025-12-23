// "use client";

import { useParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import {
  useGetProductByIdQuery,
  useGetProductsQuery,
  type Product,
} from "@/store/services/api";
import ProductCard from "@/components/product/ProductCard";

export default function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>();

  const { data: productRes, isLoading, error } = useGetProductByIdQuery(id);
  const { data: allRes } = useGetProductsQuery();

  const product = productRes?.data;
  const all = allRes?.data ?? [];

  const related: Product[] = all.filter(
    (p) => p.categoryId === product?.categoryId && p.id !== product?.id
  );

  return (
    <main className="min-h-screen bg-[#f6f7f4]">
      <Navbar />

      <section className="mx-auto max-w-6xl px-4 py-10">
        {isLoading && <div>Loading...</div>}
        {error && <div>Failed to load product</div>}
        {!isLoading && !product && !error && <div>Product not found</div>}

        {product && (
          <>
            {/* Top section */}
            <div className="grid gap-10 md:grid-cols-2">
              <div className="rounded-2xl bg-white p-6">
                {/* simple image block; API images[] already provided */ }
                <div className="flex items-center justify-center">
                  {/* optional: use next/image with product.images[0] */}
                  <img
                    src={product.images?.[0]}
                    alt={product.productName}
                    className="max-h-[320px] object-contain"
                  />
                </div>
              </div>

              <div>
                <div className="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                  Fruits
                </div>

                <h1 className="mt-3 text-3xl font-bold text-gray-900">
                  {product.productName}
                </h1>

                <div className="mt-4 text-2xl font-semibold text-orange-600">
                  ${product.price}/kg
                </div>

                <p className="mt-4 text-sm text-gray-600">
                  {product.description}
                </p>

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
                <h2 className="mt-3 text-2xl font-bold text-gray-900">
                  Related products
                </h2>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
                {(related.length ? related : all.slice(0, 4)).map((p) => (
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
