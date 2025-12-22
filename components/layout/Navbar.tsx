"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import LoginModal from "@/components/auth/LoginModal";
import RegisterModal from "@/components/auth/RegisterModal";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout } from "@/store/features/auth/authSlice";

export default function Navbar() {
    const token = useAppSelector((s) => s.auth.token);
    const dispatch = useAppDispatch();
    const router = useRouter();

    const pathname = usePathname();
    const isHome = pathname === "/";

    const [loginOpen, setLoginOpen] = useState(false);
    const [registerOpen, setRegisterOpen] = useState(false);

    const handleLogout = () => {
        dispatch(logout());
        router.push("/");
    };

    return (
        <>
            <div className="navbar w-11/12 mx-auto">
                {/* LEFT: Logo (unchanged) */}
                <div className="navbar-start">
                    <Link href="/" className="btn btn-ghost text-xl gap-2">
                        <Image
                            src="/assets/images/Logo.png"
                            alt="Fresh Harvests Logo"
                            width={28}
                            height={28}
                        />
                        <span>Fresh Harvests</span>
                    </Link>
                </div>

                {/* CENTER: Desktop menu */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li>
                            <Link href="/">Home</Link>
                        </li>
                        <li>
                            <Link href="/shop">Shop</Link>
                        </li>
                        <li>
                            <a href="#about">About us</a>
                        </li>
                        <li>
                            <a href="#blog">Blog</a>
                        </li>
                    </ul>
                </div>

                {/* RIGHT: Buttons then hamburger (mobile) */}
                <div className="navbar-end gap-2">
                    {/* Your buttons first */}

                    {isHome? <button className="items-center hidden md:flex md:btn-md px-4 space-x-2">
                        <Image src="/assets/icons/heart-w.svg" alt="Cart Icon" width={30} height={30} />
                        <p className={`font-medium ${isHome ? "text-white" : "text-black"}`}>Favorites</p>
                    </button>:<button className="items-center hidden md:flex md:btn-md px-4 space-x-2">
                        <Image src="/assets/icons/heart-g.svg" alt="Cart Icon" width={30} height={30} />
                        <p className={`font-medium ${isHome ? "text-white" : "text-black"}`}>Favorites</p>
                    </button>}

                    {isHome? <Link href="/cart" className="items-center hidden md:flex md:btn-md px-4 space-x-2">
                        <Image src="/assets/icons/cart-w.svg" alt="Cart Icon" width={30} height={30} />
                        <p className={`font-medium ${isHome ? "text-white" : "text-black"}`}>Cart</p>
                    </Link>:<Link href="/cart" className="items-center hidden md:flex md:btn-md px-4 space-x-2">
                        <Image src="/assets/icons/cart-g.svg" alt="Cart Icon" width={30} height={30} />
                        <p className={`font-medium ${isHome ? "text-white" : "text-black"}`}>Cart</p>
                    </Link>}

                    

                    {token ? (
                        <>
                            <Link
                                href="/admin/upload-products"
                                className={`px-5 py-1.5  border-[1.4] rounded-sm sm:btn-md ${isHome ? "text-white border-[#FFFFFF]" : "text-black border-black"}`}
                            >
                                Admin
                            </Link>

                            <button
                                onClick={handleLogout}
                                className={`px-5 py-1.5 cursor-pointer  rounded-sm border-[1.4] btn-sm sm:btn-md hidden ${isHome ? "text-white border-[#FFFFFF]" : "text-black border-black"} md:flex`}
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => setLoginOpen(true)}
                            className="btn btn-primary btn-sm sm:btn-md"
                        >
                            Sign in
                        </button>
                    )}

                    {/* Hamburger at the far right on small devices */}
                    <div className="dropdown dropdown-end lg:hidden">
                        <div tabIndex={0} role="button" className={`btn btn-ghost ${isHome ? "text-white" : "text-black"}`}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />
                            </svg>
                        </div>

                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                        >
                            <li>
                                <Link href="/">Home</Link>
                            </li>
                            <li>
                                <Link href="/shop">Shop</Link>
                            </li>
                            <li>
                                <a href="#about">About us</a>
                            </li>
                            <li>
                                <a href="#blog">Blog</a>
                            </li>

                            {/* Optional: auth links also in the hamburger menu */}
                            {token ? (
                                <>
                                    <li>
                                        <Link href="/admin/upload-products">Admin</Link>
                                    </li>
                                    <li>
                                        <button onClick={handleLogout}>Logout</button>
                                    </li>
                                </>
                            ) : (
                                <li>
                                    <button onClick={() => setLoginOpen(true)}>Sign in</button>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>

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
