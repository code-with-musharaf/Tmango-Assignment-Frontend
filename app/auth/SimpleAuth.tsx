"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useApi } from "@/hooks/useApi";
import { setUserDetails } from "@/redux/slices/global.slice";

export default function SimpleAuth() {
  const router = useRouter();
  const { theme } = useAppSelector((state) => state.global);
  const dispatch = useAppDispatch();
  const { login } = useApi();

  const isDark = theme === "dark";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors: { name?: string; email?: string } = {};

    if (!name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      newErrors.email = "Invalid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    try {
      if (!validate()) return;

      setLoading(true);
      const resp = await login({ name, email });
      console.log(resp);
      if (!!resp.token) {
        localStorage.setItem("token", resp.token);
        localStorage.setItem("userDetails", JSON.stringify(resp.user));
        dispatch(setUserDetails(resp.user));
        router.push("/");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div
        className={clsx(
          "w-full max-w-md rounded-3xl p-8 shadow-xl transition",
          isDark
            ? "bg-gradient-to-b from-[#1c1c22] to-[#121214] text-white"
            : "bg-white text-gray-900",
        )}
      >
        <h2 className="text-2xl font-semibold text-center mb-8">
          Login to Continue
        </h2>

        {/* Name */}
        <div className="mb-5">
          <label className="text-sm font-medium">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={clsx(
              "mt-2 w-full px-4 py-3 rounded-xl outline-none border transition",
              isDark
                ? "bg-white/5 border-white/10 focus:border-white/30"
                : "bg-gray-100 border-gray-200 focus:border-gray-400",
            )}
            placeholder="Enter your name"
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-2">{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div className="mb-6">
          <label className="text-sm font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={clsx(
              "mt-2 w-full px-4 py-3 rounded-xl outline-none border transition",
              isDark
                ? "bg-white/5 border-white/10 focus:border-white/30"
                : "bg-gray-100 border-gray-200 focus:border-gray-400",
            )}
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-2">{errors.email}</p>
          )}
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className={clsx(
            "w-full py-3 rounded-full font-semibold transition flex items-center justify-center gap-2",
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-yellow-600 hover:bg-yellow-500 text-white",
          )}
        >
          {loading && <Loader2 className="animate-spin w-4 h-4" />}
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
}
