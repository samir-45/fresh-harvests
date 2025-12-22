"use client";

import { useState } from "react";
import { useLoginMutation } from "@/store/services/api";
import { useAppDispatch } from "@/store/hooks";
import { setToken } from "@/store/features/auth/authSlice";

type Props = {
  open: boolean;
  onClose: () => void;
  onOpenRegister: () => void;
};

export default function LoginModal({ open, onClose, onOpenRegister }: Props) {
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);

  if (!open) return null;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);

    try {
      const res = await login({ email, password }).unwrap();
      const token = res.data?.token;
      if (!token) throw new Error("Token missing");
      dispatch(setToken(token));
      onClose();
    } catch (error: string | any) {
      setErr(error?.data?.message || "Login failed");
    }
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 px-4">
      <div className="w-full max-w-[520px] rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Login</h2>
          <button onClick={onClose} className="rounded-md px-2 py-1 text-gray-500 hover:bg-gray-100">
            ✕
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm text-gray-600">Email</label>
            <input
              className="w-full rounded-lg border px-3 py-2 outline-none focus:border-orange-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-gray-600">Password</label>
            <input
              type="password"
              className="w-full rounded-lg border px-3 py-2 outline-none focus:border-orange-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>

          {err && <p className="text-sm text-red-600">{err}</p>}

          <button
            disabled={isLoading}
            className="w-full rounded-lg bg-orange-500 py-2 font-medium text-white hover:bg-orange-600 disabled:opacity-60"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>

          <p className="text-center text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenRegister();
              }}
              className="font-medium text-orange-600"
            >
              Sign up
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
