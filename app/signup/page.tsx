"use client";

import { useState } from "react";
import Link from "next/link";
import { useApi } from "@/hooks/useApi";

const initialForm = {
  username: "",
  email: "",
  role: "ADMIN",
  password: "",
  confirmPassword: "",
};

export default function SignupPage() {
  const [formData, setFormData] = useState(initialForm);

  // Local message for success / password mismatch. API errors come from the hook.
  const [message, setMessage] = useState("");

  const { execute, loading, error } = useApi("/api/auth/register", {
    method: "POST",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check password
    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    setMessage("");

    // confirmPassword is only for the form, so don't send it to the API.
    const { ok } = await execute({
      username: formData.username,
      email: formData.email,
      role: formData.role,
      password: formData.password,
    });

    if (ok) {
      setMessage("Account created successfully!");
      setFormData(initialForm);
    }
  };

  return (
    <section className="min-h-screen bg-gray-100">
      <div className="flex items-center justify-center p-10">
        <div className="w-[800px] rounded-xl bg-white p-8 shadow-lg">
          <h1 className="mb-2 text-center text-3xl font-bold">
            Sign Up
          </h1>

          <p className="mb-6 text-center text-gray-500">
            Create your new account
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Username */}
            <div>
              <label className="mb-2 block font-medium text-2xl">
                Username
              </label>

              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your name"
                required
                className="w-full rounded-lg border p-3"
              />
            </div>

            {/* Email */}
            <div>
              <label className="mb-2 block font-medium text-2xl">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@email.com"
                required
                className="w-full rounded-lg border p-3"
              />
            </div>

            {/* Role */}
            <div className="flex items-center gap-4">
              <label className="font-medium text-2xl">
                Role
              </label>

              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="rounded-lg border p-3"
              >
                <option value="ADMIN">Admin</option>
                
              </select>
            </div>

            {/* Password */}
            <div>
              <label className="mb-2 block font-medium text-2xl">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                required
                className="w-full rounded-lg border p-3"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="mb-2 block font-medium text-2xl">
                Confirm Password
              </label>

              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                required
                className="w-full rounded-lg border p-3"
              />
            </div>

            {/* Message (local message first, otherwise API error) */}
            {(message || error) && (
              <p className="rounded-lg bg-gray-100 p-3 text-center">
                {message || error}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-blue-600 py-3 text-white hover:bg-blue-700 disabled:bg-gray-400"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <p className="mt-6 text-center text-gray-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-blue-600 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
