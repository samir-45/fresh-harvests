"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import LoginModal from "@/components/auth/LoginModal";
import RegisterModal from "@/components/auth/RegisterModal";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout, selectIsAdmin } from "@/store/features/auth/authSlice";
import { NavLink } from "../NavLink";

export default function Navbar() {
  const token = useAppSelector((s) => s.auth.token);
  const isAdmin = useAppSelector(selectIsAdmin);

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

  const heartIcon = isHome ? "/assets/icons/heart-w.svg" : "/assets/icons/heart-g.svg";
  const cartIcon = isHome ? "/assets/icons/cart-w.svg" : "/assets/icons/cart-g.svg";
  const btnText = isHome ? "text-white" : "text-black";
  const btnBorder = isHome ? "border-white text-white" : "border-black text-black";

  return (
    <>
      <div className="navbar w-11/12 mx-auto">
        {/* logo */}
        <div className="navbar-start">
          <Link href="/" className="flex font-semibold text-xl gap-2">
            <Image
              src="/assets/images/Logo.png"
              alt="Fresh Harvests Logo"
              width={28}
              height={28}
            />
            <span>Fresh Harvests</span>
          </Link>
        </div>

        {/* menu */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li><NavLink href="/">Home</NavLink></li>
            <li><NavLink href="/shop">Shop</NavLink></li>
            <li><NavLink href="/about">About us</NavLink></li>
            <li><NavLink href="/#blog">Blog</NavLink></li>
          </ul>
        </div>

        {/* right */}
        <div className="navbar-end gap-2">
          <button className="items-center hidden md:flex md:btn-md px-4 space-x-2">
            <Image src={heartIcon} alt="Favorites" width={30} height={30} />
            <p className={`font-medium ${btnText}`}>Favorites</p>
          </button>

          <Link href="/cart" className="items-center hidden md:flex md:btn-md px-4 space-x-2">
            <Image src={cartIcon} alt="Cart" width={30} height={30} />
            <p className={`font-medium ${btnText}`}>Cart</p>
          </Link>

          {/* Auth buttons */}
          {token ? (
            <>
              {/* show admin only for admin */}
              {isAdmin && (
                <Link
                  href="/admin/upload-products"
                  className={`px-5 py-1.5 hidden sm:block border-[1.4px] rounded-sm sm:btn-md ${btnBorder}`}
                >
                  Admin
                </Link>
              )}

              <button
                onClick={handleLogout}
                className={`px-5 py-1.5 cursor-pointer rounded-sm border-[1.4px] btn-sm sm:btn-md hidden md:flex ${btnBorder}`}
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => setLoginOpen(true)}
              className={`px-5 py-1.5 hidden sm:block cursor-pointer border-[1.4px] rounded-sm sm:btn-md ${btnBorder}`}
            >
              Sign in
            </button>
          )}

          {/* Mobile dropdown */}
          <div className="dropdown dropdown-end lg:hidden">
            <div tabIndex={0} role="button" className={`btn btn-ghost ${btnText}`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>

            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/shop">Shop</Link></li>
              <li><a href="#about">About us</a></li>
              <li><a href="#blog">Blog</a></li>

              {token ? (
                <>
                  {isAdmin && <li><Link href="/admin/upload-products">Admin</Link></li>}
                  <li><button onClick={handleLogout}>Logout</button></li>
                </>
              ) : (
                <li><button onClick={() => setLoginOpen(true)}>Sign in</button></li>
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
