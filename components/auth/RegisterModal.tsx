"use client";

import { useState } from "react";
import { useLoginMutation, useRegisterMutation } from "@/store/services/api";
import { useAppDispatch } from "@/store/hooks";
import { setToken } from "@/store/features/auth/authSlice";

type Props = {
  open: boolean;
  onClose: () => void;
  onOpenLogin: () => void;
};

export default function RegisterModal({ open, onClose, onOpenLogin }: Props) {
  const dispatch = useAppDispatch();
  const [register, { isLoading: isRegistering }] = useRegisterMutation();
  const [login, { isLoading: isLoggingIn }] = useLoginMutation();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);

  if (!open) return null;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);

    try {
      await register({ fullName, email, password }).unwrap();
      const res = await login({ email, password }).unwrap(); // auto-login
      const token = res.data?.token;
      if (!token) throw new Error("Token missing");
      dispatch(setToken(token));
      onClose();
    } catch (error: any) {
      setErr(error?.data?.message || "Register failed");
    }
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 px-4">
      <div className="w-full max-w-[520px] rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Register</h2>
          <button onClick={onClose} className="rounded-md px-2 py-1 text-gray-500 hover:bg-gray-100">
            ✕
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm text-gray-600">Full Name</label>
            <input
              className="w-full rounded-lg border px-3 py-2 outline-none focus:border-orange-500"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your name"
            />
          </div>

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
            disabled={isRegistering || isLoggingIn}
            className="w-full rounded-lg bg-orange-500 py-2 font-medium text-white hover:bg-orange-600 disabled:opacity-60"
          >
            {isRegistering || isLoggingIn ? "Processing..." : "Register"}
          </button>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenLogin();
              }}
              className="font-medium text-orange-600"
            >
              Log in
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
