"use client";

import Navbar from "@/components/layout/Navbar";
import { selectIsAdmin } from "@/store/features/auth/authSlice";
import { useAppSelector } from "@/store/hooks";
import {
  useAddProductMutation,
  useAddCategoryMutation,
  useGetCategoriesQuery,
} from "@/store/services/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminUploadProductsPage() {

  const router = useRouter();
  const isAdmin = useAppSelector(selectIsAdmin);

  useEffect(() => {
    if (!isAdmin) router.push("/");
  }, [isAdmin, router]);

  const { data: catRes, isLoading: catsLoading } = useGetCategoriesQuery();
  const categories = catRes?.data ?? [];

  const [addProduct, { isLoading: savingProduct }] = useAddProductMutation();
  const [addCategory, { isLoading: savingCategory }] = useAddCategoryMutation();

  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<string>("");
  const [stock, setStock] = useState<string>("");
  const [imageUrl, setImageUrl] = useState("");

  // existing category dropdown
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");

  // new category text input
  const [newCategoryName, setNewCategoryName] = useState("");

  const [error, setError] = useState<string | null>(null);

  const isSubmitting = savingProduct || savingCategory;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      let categoryIdToUse = selectedCategoryId;

      // If no category has pre made, new category we can make
      if (newCategoryName.trim()) {
        const catRes = await addCategory({
          categoryName: newCategoryName.trim(),
        }).unwrap();
        categoryIdToUse = catRes.data.id;
      }

      if (!categoryIdToUse) {
        setError("Please select a category or create a new one.");
        return;
      }

      await addProduct({
        productName,
        description,
        price: Number(price),
        stock: Number(stock),
        images: [imageUrl],
        categoryId: categoryIdToUse,
      }).unwrap();

      // form reset
      setProductName("");
      setDescription("");
      setPrice("");
      setStock("");
      setImageUrl("");
      setSelectedCategoryId("");
      setNewCategoryName("");
    } catch (err: any) {
      console.error(err);
      setError(
        err?.data?.message || "Failed to save product. Please try again."
      );
    }
  };

  return (
    <main className="min-h-screen bg-[#f6f7f4]">
      <Navbar />

      <section className="mx-auto max-w-5xl px-4 py-10">
        <h1 className="text-2xl font-bold text-gray-900">
          Admin · Upload Products
        </h1>

        <p className="mt-2 text-sm text-gray-600">
          Select an existing category or type a new one. New categories will be
          created automatically with an id, and the product will use that id.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-6 grid gap-4 rounded-2xl bg-white p-6 shadow-sm md:grid-cols-2"
        >
          <div className="space-y-3">
            <div>
              <label className="mb-1 block text-sm text-gray-600">
                Product name
              </label>
              <input
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-green-600"
                placeholder="e.g. Fresh Apple"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm text-gray-600">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="h-24 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-green-600"
                placeholder="Short detailed description of the product"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block text-sm text-gray-600">
                  Price (per kg)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-green-600"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-gray-600">
                  Stock
                </label>
                <input
                  type="number"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-green-600"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm text-gray-600">
                Image URL
              </label>
              <input
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-green-600"
                placeholder="https://..."
              />
            </div>

            {/* Category section */}
            <div className="grid gap-3 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm text-gray-600">
                  Select existing category
                </label>
                <select
                  disabled={catsLoading}
                  value={selectedCategoryId}
                  onChange={(e) => setSelectedCategoryId(e.target.value)}
                  className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-green-600"
                >
                  <option value="">Select</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.categoryName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm text-gray-600">
                  Or create new category
                </label>
                <input
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-green-600"
                  placeholder="e.g. Herbs"
                />
                <p className="mt-1 text-xs text-gray-500">
                  If you type a new category name, it will be created and used
                  for this product.
                </p>
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-600">
                {error}
              </p>
            )}

            <button
              disabled={isSubmitting}
              className="mt-2 w-full rounded-lg bg-green-700 py-2 text-sm font-medium text-white hover:bg-green-800 disabled:opacity-60"
            >
              {isSubmitting ? "Saving..." : "Add product"}
            </button>
          </div>

          <div className="space-y-3 text-sm text-gray-600">
            <p>
              When you select a category from the dropdown, the product gets
              that category&apos;s id automatically.
            </p>
            <p>
              When you type a new category name, the app first creates a
              category via <code>POST /category</code> and then uses the
              returned id for <code>POST /products</code>.
            </p>
          </div>
        </form>
      </section>
    </main>
  );
}