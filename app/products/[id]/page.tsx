"use client";

import Navbar from "@/components/layout/Navbar";
import {
  ProductFromApi,
  useGetAllProductsQuery,
  useGetProductByIdQuery,
} from "@/store/services/api";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { useParams } from "next/navigation";
import ProductCard from "@/components/product/ProductCard";
import RelatedProductsSection from "@/components/product/RelatedProductsSection";

export default function ProductDetailsPage() {
    const params = useParams<{ id: string }>();
    const id = params.id; // safe in client component [web:759]

    const { data: pRes, isLoading: pLoading } = useGetProductByIdQuery(id);
    const product = pRes?.data;

const { data: allProducts = [], isLoading: listLoading } =
  useGetAllProductsQuery({ page: 1, limit: 1000 });

    const related = useMemo(() => {
        if (!product) return [];

        return allProducts
            .filter(p => p.categoryId === product.categoryId)
            .filter(p => p.id !== product.id)
            .slice(0, 4);
    }, [allProducts, product]);

    if (pLoading) {
        return (
            <main className="min-h-screen bg-white">
                <Navbar />
                <div className="min-h-screen w-full flex items-center justify-center">
                <span className="loading mx-auto loading-spinner text-[#749B3F]"></span>
                </div>
                {/* <div className="mx-auto max-w-6xl px-4 py-10">Loading...</div> */}
            </main>
        );
    }

    if (!product) {
        return (
            <main className="min-h-screen bg-white">
                <Navbar />
                <div className="mx-auto max-w-6xl px-4 py-10">Product not found.</div>
            </main>
        );
    }

    const mainImg = product.images?.[0] ?? "/assets/images/placeholder.png";

    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            <section className="mx-auto max-w-6xl px-4 py-10">
                {/* Details */}
                <div className="grid gap-10 lg:grid-cols-2">
                    <div className="rounded-2xl border border-gray-200 bg-white p-6">
                        <div className="relative h-[360px] w-full">
                            <Image
                                src={mainImg}
                                alt={product.productName}
                                fill
                                className="object-contain"
                                sizes="(min-width: 1024px) 520px, 100vw"
                                priority
                            />
                        </div>
                    </div>

                    <div>
                        <div className="inline-flex rounded-md bg-[#EAF3DF] px-3 py-1 text-xs font-semibold text-[#6D9B3B]">
                            {product.category?.categoryName ?? "Category"}
                        </div>

                        <h1 className="mt-3 text-4xl font-extrabold text-[#1B2032]">
                            {product.productName}
                        </h1>

                        <div className="mt-3 text-2xl font-bold text-orange-500">
                            ${product.price}/kg
                        </div>

                        <p className="mt-4 text-sm leading-7 text-gray-600">{product.description}</p>

                        <div className="mt-6 flex gap-4">
                            <button className="h-11 w-full cursor-pointer rounded-xl bg-gray-100 text-sm font-semibold text-gray-600">
                                Save as favorite
                            </button>
                            <button className="h-11 cursor-pointer w-full rounded-xl bg-orange-500 text-sm font-semibold text-white">
                                Add to cart
                            </button>
                        </div>
                    </div>
                </div>

                {/* Related */}
                <RelatedProductsSection currentProduct={product} limit={4} title="Related products" />

            </section>
        </main>
    );
}
