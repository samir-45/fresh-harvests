"use client";

import Image from "next/image";
import type { Product } from "@/store/services/api";
import { useAppDispatch } from "@/store/hooks";
import { addToCart } from "@/store/features/cart/cartSlice";
import Link from "next/link";

export default function ProductCard({ product }: { product: Product }) {
  const dispatch = useAppDispatch();
  const img = product?.images?.[0];

  return (
    <div
      className="
        rounded-2xl border border-gray-200 bg-white
        p-3 shadow-[0_8px_24px_rgba(15,23,42,0.06)]
      "
    >

      <Link href={`/products/${product.id}`} className="block">
        {/* Image well */}
        <div className="rounded-2xl bg-gray-50 p-5">
          <div className="relative mx-auto h-[120px] w-[160px]">
            {img ? (
              <Image
                src={img}
                alt={product.productName}
                fill
                className="object-contain drop-shadow-[0_8px_14px_rgba(0,0,0,0.12)]"
                sizes="160px"
              />
            ) : (
              <div className="h-full w-full rounded-xl bg-gray-100" />
            )}
          </div>
        </div>
      </Link>



      {/* Text */}
      <div className="mt-4 text-center">
        <h3 className="text-[15px] font-semibold text-gray-900">
          {product.productName}
        </h3>

        <p className="mt-1 text-sm text-gray-500">${product.price}/kg</p>

        {/* Button (outline by default, orange on hover/focus like screenshot) */}
        <button
          onClick={() => dispatch(addToCart(product))}
          className="
            mt-4 w-full rounded-xl border border-gray-200 cursor-pointer
            bg-white py-3 text-sm font-medium text-gray-700
            transition-colors
            hover:border-orange-500 hover:bg-orange-500 hover:text-white
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400
          "
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
