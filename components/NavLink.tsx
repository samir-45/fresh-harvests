"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  href: string;
  children: React.ReactNode;
  exact?: boolean; // true -> only exact match
};

export function NavLink({ href, children, exact = false }: Props) {
  const pathname = usePathname(); // pathname string [web:848]

  const isActive = exact ? pathname === href : pathname === href || pathname.startsWith(href + "/");

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined} // mark current page [web:851]
      className={[
        "relative px-3 py-2 font-medium",
        "after:absolute after:-bottom-[0px] after:h-[2.5px] after:w-[10px] after:rounded-full after:mx-7 after:bg-[#749B3F]",
        "after:origin-left after:scale-x-0 after:transition-transform",
        isActive ? "after:scale-x-100 " : "text-gray-700",
      ].join(" ")}
    >
      {children}
    </Link>
  );
}
