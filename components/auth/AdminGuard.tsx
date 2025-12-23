"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import { selectIsAdmin } from "@/store/features/auth/authSlice";

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const token = useAppSelector((s) => s.auth.token);
  const isAdmin = useAppSelector(selectIsAdmin);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;

    // not logged in -> kick out
    if (!token) router.replace("/"); // or "/?login=1"
    // logged in but not admin -> kick out
    else if (!isAdmin) router.replace("/");
  }, [mounted, token, isAdmin, router]);

  // prevent flicker during hydration/check
  if (!mounted) return null;
  if (!token || !isAdmin) return null;

  return <>{children}</>;
}
