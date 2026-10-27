"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApi } from "@/hooks/useApi";

// Where to go after login: the page the user tried to open
// (proxy.ts adds it as ?redirect=...) or the dashboard by default.
function getRedirectPath() {
  const redirect = new URLSearchParams(window.location.search).get("redirect");
  const url = new URL(redirect ?? "/dashboard", window.location.origin);

  // Only allow pages on our own site (blocks ?redirect=https://evil.com).
  return url.origin === window.location.origin
    ? url.pathname + url.search
    : "/dashboard";
}

export default function LoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { execute, loading, error } = useApi("/api/auth/login", {
    method: "POST",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { ok } = await execute(formData);

    if (ok) {
      router.push(getRedirectPath());
    }
  };

  return (
    <section className="min-h-screen bg-gray-100">
      <div className="flex items-center justify-center p-10">
        <div className="w-[800px] rounded-xl bg-white p-8 shadow-lg">

          {/* Heading */}
          <h1 className="mb-2 text-center text-3xl font-bold">
            Login
          </h1>

          <p className="mb-6 text-center text-gray-500">
            Welcome back! Please login to your account.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Username */}
            <div>
              <label className="mb-2 block font-medium">
                Username
              </label>

              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                className="w-full rounded-lg border p-3"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="mb-2 block font-medium">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full rounded-lg border p-3"
                required
              />
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" />
                Remember Me
              </label>

              <Link
                href="/forgot-password"
                className="text-sm text-blue-600 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-blue-600 py-3 text-white hover:bg-blue-700 disabled:bg-gray-400"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Error Message */}
          {error && (
            <p className="mt-4 text-center text-sm text-red-600">
              {error}
            </p>
          )}

          {/* Signup Link */}
          <p className="mt-6 text-center text-gray-600">
            Don&apos;t have an account?{" "}

            <Link
              href="/signup"
              className="font-semibold text-blue-600 hover:underline"
            >
              Sign Up
            </Link>
          </p>

        </div>
      </div>
    </section>
  );
}
