"use client";

import Image from "next/image";
import { useEffect, useId, useState } from "react";
import { useLoginMutation, useRegisterMutation } from "@/store/services/api";
import { useAppDispatch } from "@/store/hooks";
import { setToken } from "@/store/features/auth/authSlice";
import toast from "react-hot-toast";

type Props = {
  open: boolean;
  onClose: () => void;
  onOpenLogin: () => void;
};

function EyeIcon({ open }: { open: boolean }) {
  return open ? (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M2.5 12s3.5-7 9.5-7 9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7Z"
        stroke="#6B7280"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
        stroke="#6B7280"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ) : (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 3l18 18" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" />
      <path
        d="M10.6 10.6a2.5 2.5 0 0 0 3.3 3.3"
        stroke="#6B7280"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M6.5 6.9C4.2 8.6 2.8 12 2.8 12s3.5 7 9.2 7c1.6 0 3-.3 4.2-.9"
        stroke="#6B7280"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.2 5.4A10 10 0 0 1 12 5c6 0 9.5 7 9.5 7a15 15 0 0 1-3.2 4.2"
        stroke="#6B7280"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function RegisterModal({ open, onClose, onOpenLogin }: Props) {
  const dispatch = useAppDispatch();

  const [register, { isLoading: isRegistering }] = useRegisterMutation();
  const [login, { isLoading: isLoggingIn }] = useLoginMutation();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPass, setShowPass] = useState(false);
  const [agree, setAgree] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  const dialogId = useId().replace(/:/g, "_");

  useEffect(() => {
    const el = document.getElementById(dialogId) as HTMLDialogElement | null;
    if (!el) return;

    if (open && !el.open) el.showModal();
    if (!open && el.open) el.close();
  }, [open, dialogId]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);

    try {
      await register({ fullName, email, password }).unwrap();
      const res = await login({ email, password }).unwrap(); // auto-login
      const token = res.data?.token;
      if (!token) throw new Error("Token missing");
      dispatch(setToken(token));
      toast.success('Successfully Registered!');
      onClose();
    } catch (error: any) {
      setErr(error?.data?.message || "Register failed");
    }
  };

  return (
    <dialog id={dialogId} className="modal">
      <div className="modal-box w-[92vw] max-w-[520px] rounded-2xl p-6 sm:p-8">
        {/* close */}
        <button
          type="button"
          onClick={onClose}
          className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4"
          aria-label="Close"
        >
          ✕
        </button>

        <h2 className="text-center text-3xl font-extrabold text-[#1B2032]">
          Register
        </h2>

        <form onSubmit={onSubmit} className="mt-7 space-y-5">
          {/* Full Name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              className="h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-900 outline-none focus:border-orange-500"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your name"
              autoComplete="name"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-900 outline-none focus:border-orange-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              autoComplete="email"
              required
            />
          </div>

          {/* Password with toggle */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Password
            </label>

            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                className="h-12 w-full rounded-xl border border-gray-200 bg-white px-4 pr-12 text-sm text-gray-900 outline-none focus:border-orange-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                autoComplete="new-password"
                required
              />

              <button
                type="button"
                onClick={() => setShowPass((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 hover:bg-gray-100"
                aria-label={showPass ? "Hide password" : "Show password"}
              >
                <EyeIcon open={showPass} />
              </button>
            </div>
          </div>

          {/* Terms */}
          <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              className="h-4 w-4 accent-orange-500"
            />
            I agree to the Terms & Conditions
          </label>

          {err && <p className="text-sm text-red-600">{err}</p>}

          {/* Register */}
          <button
            disabled={!agree || isRegistering || isLoggingIn}
            className="h-12 w-full rounded-xl bg-orange-500 text-sm font-semibold text-white shadow-[0_10px_26px_rgba(249,115,22,0.35)] hover:bg-orange-600 disabled:opacity-60"
          >
            {isRegistering || isLoggingIn ? "Processing..." : "Register"}
          </button>

          {/* Divider + social UI only */}
          <div className="divider text-xs text-gray-500">Or Sign up with</div>

          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              className="h-12 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-800 hover:bg-gray-50"
            >
              <span className="flex items-center justify-center gap-2">
                <Image
                  src="/assets/icons/google.svg"
                  alt="Google"
                  width={20}
                  height={20}
                />
                Google
              </span>
            </button>

            <button
              type="button"
              className="h-12 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-800 hover:bg-gray-50"
            >
              <span className="flex items-center justify-center gap-2">
                <Image
                  src="/assets/icons/facebook.svg"
                  alt="Facebook"
                  width={20}
                  height={20}
                />
                Facebook
              </span>
            </button>
          </div>

          {/* Switch to login */}
          <p className="pt-1 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenLogin();
              }}
              className="font-semibold text-orange-600 cursor-pointer"
            >
              Log in
            </button>
          </p>
        </form>
      </div>

      {/* backdrop */}
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>close</button>
      </form>
    </dialog>
  );
}
