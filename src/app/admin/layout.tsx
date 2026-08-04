"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  LogOut,
  ShieldCheck,
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, logout } = useAuth();

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push(`/login?redirect=${pathname}`);
      } else if (user.role !== "admin") {
        router.push("/");
      }
    }
  }, [user, loading, pathname, router]);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mx-auto mb-5 h-12 w-12 animate-spin rounded-full border-b-2 border-green-600" />
          <p className="text-gray-600">
            Loading Admin Dashboard...
          </p>
        </div>
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Navbar */}

      <header className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur-md shadow-sm">

        <div className="mx-auto max-w-7xl px-4 py-4">
          <div className="flex flex-col gap-4">

            {/* Top Row */}

            <div className="flex items-center justify-between">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-600 text-white shadow">
                  <ShieldCheck size={20} />
                </div>

                <div>
                  <h1 className="text-lg md:text-xl font-bold text-gray-900">
                    Admin Dashboard
                  </h1>

                  <p className="hidden sm:block text-xs text-gray-500">
                    Canteen Management System
                  </p>
                </div>

              </div>

              <div className="flex items-center gap-3">

                {/* Desktop Email */}

                <div className="hidden lg:block rounded-xl border bg-gray-50 px-4 py-2 text-right">
                  <p className="text-xs uppercase tracking-wide text-gray-400">
                    Administrator
                  </p>

                  <p className="font-medium text-gray-900">
                    {user.email}
                  </p>
                </div>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 rounded-xl bg-red-500 px-4 py-2 text-sm font-medium text-white shadow hover:bg-red-600 transition"
                >
                  <LogOut size={18} />
                  <span className="hidden sm:inline">
                    Logout
                  </span>
                </button>

              </div>

            </div>

            {/* Navigation */}

            <nav className="flex overflow-x-auto gap-2 scrollbar-hide">

              <AdminTab
                href="/admin/dashboard"
                label="Dashboard"
                icon={<LayoutDashboard size={18} />}
              />

              <AdminTab
                href="/admin/orders"
                label="Orders"
                icon={<ShoppingCart size={18} />}
              />

              <AdminTab
                href="/admin/inventory"
                label="Inventory"
                icon={<Package size={18} />}
              />

            </nav>

          </div>
        </div>
      </header>

      {/* Page */}

      <main className="mx-auto max-w-7xl px-6 py-8">
        {children}
      </main>

    </div>
  );
}

function AdminTab({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
}) {
  const pathname = usePathname();

  const active =
    pathname === href ||
    pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all
        ${active
          ? "bg-green-600 text-white shadow"
          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
        }`}
    >
      {icon}
      {label}
    </Link>
  );
}