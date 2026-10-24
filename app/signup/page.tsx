"use client";

import { useState } from "react";
import Link from "next/link";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    role: "ADMIN",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

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

    try {
      setLoading(true);
      setMessage("");

      const response = await fetch(
        'https://api.freeapi.app/api/v1/users/register',
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: formData.username,
            email: formData.email,
            role: formData.role,
            password: formData.password,
          }),
        }
      );

      const data = await response.json();

      console.log("API Response:", data);

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      setMessage("Account created successfully!");

      // Clear form
      setFormData({
        username: "",
        email: "",
        role: "User",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error(error);

      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong!"
      );
    } finally {
      setLoading(false);
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

            {/* Message */}
            {message && (
              <p className="rounded-lg bg-gray-100 p-3 text-center">
                {message}
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
