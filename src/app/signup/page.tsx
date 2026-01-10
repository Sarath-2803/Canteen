"use client";

import Header from "@/components/Header";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useSearchParams } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const newUser = {
      name,
      email,
      password,
      role: "Customer" as const,
    };

    const usersStr = localStorage.getItem("users");
    const users: (typeof newUser)[] = usersStr ? JSON.parse(usersStr) : [];

    if (users.some((u) => u.email === email)) {
      setError("Email already registered");
      return;
    }

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    localStorage.setItem("user", JSON.stringify(newUser));

    login(newUser);

    router.push(redirect);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="hidden lg:flex items-center justify-center">
            <div className="w-full h-96 bg-gray-200 rounded-2xl flex items-center justify-center text-gray-500">
              Similar animation here also
            </div>
          </div>
          <div className="bg-white shadow-lg rounded-2xl p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">
              Create an Account
            </h1>

            <form onSubmit={handleSignUp} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                  placeholder="Your Name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                  placeholder="••••••••"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                  placeholder="••••••••"
                />
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <button
                type="submit"
                className="w-full bg-green-500 text-white font-semibold py-2 rounded-lg hover:bg-green-600 transition-colors"
              >
                Sign Up
              </button>
            </form>

            <p className="text-sm text-gray-600 mt-4 text-center">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-green-600 font-medium hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
