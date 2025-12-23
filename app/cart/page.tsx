"use client";

import Navbar from "@/components/layout/Navbar";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clearCart, removeFromCart, setQty } from "@/store/features/cart/cartSlice";

export default function CartPage() {
  const items = useAppSelector((s) => Object.values(s.cart.items));
  const dispatch = useAppDispatch();

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.qty,
    0
  );

  return (
    <main className="min-h-screen bg-[#f6f7f4]">
      <Navbar />

      <section className="mx-auto max-w-4xl px-4 py-10">
        <h1 className="text-2xl font-bold text-gray-900">Cart</h1>

        {items.length === 0 ? (
          <p className="mt-6 text-sm text-gray-600">
            Your cart is empty.
          </p>
        ) : (
          <>
            <div className="mt-6 space-y-4">
              {items.map(({ product, qty }) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between rounded-xl bg-white p-4 shadow-sm"
                >
                  <div>
                    <div className="text-sm font-semibold text-gray-900">
                      {product.productName}
                    </div>
                    <div className="text-xs text-gray-500">
                      ${product.price} / kg
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      min={1}
                      value={qty}
                      onChange={(e) =>
                        dispatch(
                          setQty({ id: product.id, qty: Number(e.target.value) })
                        )
                      }
                      className="w-16 rounded-lg border px-2 py-1 text-sm"
                    />
                    <button
                      onClick={() => dispatch(removeFromCart(product.id))}
                      className="btn btn-soft btn-error"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Subtotal:{" "}
                <span className="text-lg font-semibold text-gray-900">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <button
                onClick={() => dispatch(clearCart())}
                className="rounded-lg bg-green-700 px-6 py-2 text-sm font-medium text-white"
              >
                Checkout
              </button>
            </div>
          </>
        )}
      </section>
    </main>
  );
}
