"use client";

import Image from "next/image";
import type { Product } from "@/store/services/api";
import { useAppDispatch } from "@/store/hooks";
import { addToCart } from "@/store/features/cart/cartSlice";

export default function ProductCard({ product }: { product: Product }) {
  const dispatch = useAppDispatch();
  const img = product?.images?.[0];

  return (
    <div className="rounded-2xl border bg-white p-4 shadow-sm">
      <div className="relative mx-auto h-[140px] w-[170px]">
        {img ? (
          <Image src={img} alt={product.productName} fill className="object-contain" />
        ) : (
          <div className="h-full w-full rounded-xl bg-gray-100" />
        )}
      </div>

      <div className="mt-3 text-center">
        <div className="text-sm font-semibold text-gray-900">{product.productName}</div>
        <div className="mt-1 text-xs text-gray-500">${product.price}</div>

        <button
          onClick={() => dispatch(addToCart(product))}
          className="mt-3 w-full rounded-lg bg-orange-500 py-2 text-sm font-medium text-white hover:bg-orange-600"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
