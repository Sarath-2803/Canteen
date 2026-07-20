"use client";

import Header from "@/components/Header";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

import { usersService } from "@/services/users";
// import { setStoredUser } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();

  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");

    try {
      setLoading(true);

      const response =
        await usersService.signIn(
          email,
          password,
        );

      if (!response.success || !response.data) {
        throw new Error(
          response.message ||
          "Invalid credentials"
        );
      }

      const { user, token } = response.data;

      // AuthContext handles persistence
      login(user, token);


      if (
        user.role.toLowerCase() ===
        "admin"
      ) {
        router.replace(
          "/admin/dashboard"
        );
        return;
      }

      const redirectPath =
        sessionStorage.getItem(
          "redirectAfterLogin"
        );

      sessionStorage.removeItem(
        "redirectAfterLogin"
      );

      router.replace(
        redirectPath || "/"
      );
    } catch (err: unknown) {
      console.error(
        "Login failed:",
        err
      );

      if (err instanceof Error) {
        setError(
          err.message ||
          "Login failed"
        );
      } else {
        setError(
          "An unexpected error occurred."
        );
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-gray-100">
      <Header />

      <div className="mx-auto flex min-h-[calc(100vh-72px)] max-w-7xl items-center px-6 py-10">

        <div className="grid w-full grid-cols-1 overflow-hidden rounded-3xl bg-white shadow-2xl lg:grid-cols-2">

          {/* Left Side */}

          <div className="relative hidden overflow-hidden bg-gradient-to-br from-green-700 via-green-600 to-emerald-500 p-12 lg:flex lg:flex-col lg:justify-between">

            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-white/10 blur-3xl" />

            <div className="relative z-10">

              <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-medium text-white backdrop-blur">
                🍽 Smart Canteen
              </span>

              <h1 className="mt-8 text-5xl font-extrabold leading-tight text-white">
                One Platform.
                <br />
                Every Order.
              </h1>

              <p className="mt-6 max-w-md text-lg leading-8 text-green-100">
                Built for students and canteen owners to order, manage,
                and deliver with ease.
              </p>
            </div>

            <div className="relative z-10 grid grid-cols-2 gap-5">
              <div className="rounded-2xl bg-white/10 border border-white/10 p-5 backdrop-blur-md">
                <p className="text-2xl">⚡</p>
                <h3 className="mt-4 font-semibold text-white">
                  Fast Ordering
                </h3>
                <p className="mt-1 text-sm text-green-100">
                  Order in seconds
                </p>
              </div>

              <div className="rounded-2xl bg-white/10 border border-white/10 p-5 backdrop-blur-md">
                <p className="text-2xl">📊</p>
                <h3 className="mt-4 font-semibold text-white">
                  Smart Dashboard
                </h3>
                <p className="mt-1 text-sm text-green-100">
                  For students & owners
                </p>
              </div>
            </div>

          </div>

          {/* Right Side */}

          <div className="flex items-center justify-center p-8 sm:p-12">

            <div className="w-full max-w-md">

              <div className="mb-10">

                <h2 className="text-4xl font-bold text-gray-900">
                  Sign In
                </h2>

                <p className="mt-3 text-gray-500">
                  Login to continue to your dashboard.
                </p>

              </div>

              <form
                onSubmit={handleLogin}
                className="space-y-6"
              >

                {error && (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">
                    {error}
                  </div>
                )}

                <div>

                  <label className="mb-2 block font-medium text-gray-700">
                    Email Address
                  </label>

                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    disabled={loading}
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 transition focus:border-green-500 focus:ring-4 focus:ring-green-100 focus:outline-none disabled:bg-gray-100"
                  />

                </div>

                <div>

                  <label className="mb-2 block font-medium text-gray-700">
                    Password
                  </label>

                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    disabled={loading}
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 transition focus:border-green-500 focus:ring-4 focus:ring-green-100 focus:outline-none disabled:bg-gray-100"
                  />

                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center rounded-xl bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-400"
                >
                  {loading ? (
                    <>
                      <div className="mr-3 h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Logging In...
                    </>
                  ) : (
                    "Login"
                  )}
                </button>

              </form>

              <div className="mt-8 text-center">

                <span className="text-gray-500">
                  Don&apos;t have an account?
                </span>

                <Link
                  href="/signup"
                  className="ml-2 font-semibold text-green-600 hover:text-green-700"
                >
                  Create one →
                </Link>

              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}