"use client";

import Link from "next/link";
import { useState } from "react";
import LoginModal from "@/components/auth/LoginModal";
import RegisterModal from "@/components/auth/RegisterModal";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout } from "@/store/features/auth/authSlice";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Navbar() {
    const token = useAppSelector((s) => s.auth.token);
    const router = useRouter();

    const dispatch = useAppDispatch();

    const handleLogout = () => {
        dispatch(logout());
        router.push("/");
    };


    const [loginOpen, setLoginOpen] = useState(false);
    const [registerOpen, setRegisterOpen] = useState(false);

    return (
        <>
            <header className="mx-auto max-w-6xl px-4 py-6">
                <div className="flex items-center justify-between">
                    <Link href="/" className="font-semibold flex items-center gap-2 text-gray-900">
                    <Image src="/assets/images/Logo.png" alt="Fresh Harvests Logo" width={40} height={40} />
                    <p className="font-bold text-xl">Fresh Harvests</p>
                    </Link>

                    <nav className="hidden items-center gap-8 text-sm text-gray-600 md:flex">
                        <Link href="/" className="hover:text-gray-900">Home</Link>
                        <Link href="/shop" className="hover:text-gray-900">Shop</Link>
                        <a href="#about" className="hover:text-gray-900">About us</a>
                        <a href="#blog" className="hover:text-gray-900">Blog</a>
                    </nav>

                    <div className="flex items-center gap-3">
                        <Link href="/cart" className="rounded-lg border px-4 py-2 text-sm">Cart</Link>

                        {token ? (
                            <>
                                <Link href="/admin/upload-products" className="rounded-lg bg-green-700 px-4 py-2 text-sm text-white">
                                    Admin
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="rounded-lg border px-4 py-2 text-sm"
                                >
                                    Logout
                                </button>
                            </>

                        ) : (
                            <button
                                onClick={() => setLoginOpen(true)}
                                className="rounded-lg border px-4 py-2 text-sm"
                            >
                                Sign in
                            </button>
                        )}
                    </div>
                </div>
            </header>

            <LoginModal
                open={loginOpen}
                onClose={() => setLoginOpen(false)}
                onOpenRegister={() => setRegisterOpen(true)}
            />
            <RegisterModal
                open={registerOpen}
                onClose={() => setRegisterOpen(false)}
                onOpenLogin={() => setLoginOpen(true)}
            />
        </>
    );
}
