import Link from "next/link";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900">
          Admin Dashboard
        </h1>

        <p className="mt-2 text-gray-600">
          Welcome back. Manage inventory, orders and customers from one place.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl bg-white p-6 shadow border">
          <p className="text-sm font-medium text-gray-500">
            Total Orders
          </p>

          <h2 className="mt-3 text-4xl font-bold text-green-600">
            --
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Orders placed today
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow border">
          <p className="text-sm font-medium text-gray-500">
            Total Items
          </p>

          <h2 className="mt-3 text-4xl font-bold text-blue-600">
            --
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Inventory items
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow border">
          <p className="text-sm font-medium text-gray-500">
            Customers
          </p>

          <h2 className="mt-3 text-4xl font-bold text-purple-600">
            --
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Registered users
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow border">
          <p className="text-sm font-medium text-gray-500">
            Revenue
          </p>

          <h2 className="mt-3 text-4xl font-bold text-orange-600">
            ₹ --
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Total earnings
          </p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Quick Actions */}
        <div className="rounded-2xl border bg-white p-6 shadow lg:col-span-1">
          <h2 className="mb-5 text-xl font-bold text-gray-900">
            Quick Actions
          </h2>

          <div className="space-y-3">
            <Link 
              href="/admin/inventory/add"
              className="block rounded-xl bg-green-500 px-5 py-3 text-center font-medium text-white transition hover:bg-green-600"
            >
              + Add New Item
            </Link>

            <Link
              href="/admin/orders"
              className="block rounded-xl border px-5 py-3 text-center font-medium text-gray-700 transition hover:bg-gray-100"
            >
              Manage Orders
            </Link>

            <Link
              href="/admin/inventory"
              className="block rounded-xl border px-5 py-3 text-center font-medium text-gray-700 transition hover:bg-gray-100"
            >
              Manage Inventory
            </Link>
          </div>
        </div>

        {/* Canteen Information */}
        <div className="rounded-2xl border bg-white p-6 shadow lg:col-span-2">
          <h2 className="mb-5 text-xl font-bold text-gray-900">
            Canteen Information
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <p className="text-sm text-gray-500">
                Canteen Name
              </p>

              <p className="mt-1 font-semibold text-gray-900">
                College Canteen
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Canteen ID
              </p>

              <p className="mt-1 font-semibold text-gray-900">
                TBD
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Location
              </p>

              <p className="mt-1 font-semibold text-gray-900">
                Main Campus
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Status
              </p>

              <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                Operational
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="rounded-2xl border bg-white p-6 shadow">
        <h2 className="mb-5 text-xl font-bold text-gray-900">
          Recent Activity
        </h2>

        <div className="rounded-xl border border-dashed p-10 text-center text-gray-500">
          Recent orders and inventory updates will appear here.
        </div>
      </div>


    </div>
  );
}