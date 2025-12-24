"use client";

import Navbar from "@/components/layout/Navbar";
import { selectIsAdmin } from "@/store/features/auth/authSlice";
import { useAppSelector } from "@/store/hooks";
import { useDeleteProductByIdMutation, useGetProductsQuery } from "@/store/services/api";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function AdminProductsPage() {
    const router = useRouter();
    const isAdmin = useAppSelector(selectIsAdmin);

    useEffect(() => {
        if (!isAdmin) router.push("/");
    }, [isAdmin, router]);

    const { data: listRes, isLoading, error } = useGetProductsQuery({ page: 1, limit: 1000 });
    
    const products = listRes?.data ?? [];

    const [deleteProduct, { isLoading: deleting }] = useDeleteProductByIdMutation();

    const onDelete = async (id: string) => {
        const ok = confirm("Are you sure you want to delete this product?");
        if (!ok) return;

        try {
            await deleteProduct(id).unwrap(); 
            toast.success('Product deleted successfully!');
        } catch (e: any) {
            alert(e?.data?.message ?? "Delete failed");
        }
    };

    return (
        <main className="min-h-screen bg-[#f6f7f4]">
            <Navbar />

            <section className="mx-auto max-w-5xl px-4 py-10">
                <h1 className="text-2xl font-bold">Admin · Manage Products</h1>

                {isLoading && <div className="mt-6">Loading...</div>}
                {error && <div className="mt-6">Failed to load products</div>}

                <div className="mt-6 space-y-3">
                    {products.map((p) => (
                        <div key={p.id} className="flex items-center justify-between rounded-xl bg-white p-4">
                            <div>
                                <div className="font-semibold">{p.productName}</div>
                                <div className="text-sm text-gray-500">${p.price}/kg · Stock: {p.stock}</div>
                            </div>

                            <button
                                onClick={() => onDelete(p.id)}
                                disabled={deleting}
                                className="btn btn-error text-sm font-medium text-white disabled:opacity-60"
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}
