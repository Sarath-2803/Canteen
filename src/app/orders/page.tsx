"use client";

import { useRouter } from "next/navigation";

import Header from "@/components/Header";

import { useOrder } from "@/contexts/OrderContext";

import {
	Order,
	OrderStatus,
} from "@/lib/types";

export default function OrdersPage() {
	const router = useRouter();

	const {
		orders,
		cancelOrder,
		deleteOrder,
		loading,
	} = useOrder();

	const getStatusColor = (
		status: OrderStatus
	) => {
		switch (status) {
			case "CONFIRMED":
				return "bg-green-100 text-green-800";

			case "PENDING":
				return "bg-yellow-100 text-yellow-800";

			case "CANCELLED":
				return "bg-red-100 text-red-800";

			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	const canCancel = (
		order: Order
	) =>
		order.status === "PENDING" ||
		order.status === "CONFIRMED";

	if (loading) {
		return (
			<div className="min-h-screen bg-gray-50">
				<Header />

				<main className="max-w-6xl mx-auto px-4 py-8">
					<p className="text-center text-gray-600">
						Loading orders...
					</p>
				</main>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-50">
			<Header />

			<main className="mx-auto max-w-7xl px-4 py-8">
  <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
    <div>
      <h1 className="text-4xl font-bold text-gray-900">
        My Orders
      </h1>
      <p className="mt-1 text-gray-500">
        Track and manage your recent orders
      </p>
    </div>

    <div className="rounded-xl bg-green-50 px-5 py-3">
      <p className="text-sm text-gray-500">
        Total Orders
      </p>
      <p className="text-2xl font-bold text-green-600">
        {orders.length}
      </p>
    </div>
  </div>

  {orders.length === 0 ? (
    <div className="rounded-3xl border border-dashed bg-white py-24 text-center shadow-sm">
      <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-4xl">
        🍽️
      </div>

      <h2 className="text-2xl font-bold text-gray-900">
        No Orders Yet
      </h2>

      <p className="mt-2 text-gray-500">
        Looks like you haven&apos;t ordered anything.
      </p>

      <button
        onClick={() => router.push("/")}
        className="mt-8 rounded-xl bg-green-600 px-8 py-3 font-semibold text-white transition hover:bg-green-700"
      >
        Browse Menu
      </button>
    </div>
  ) : (
    <div className="space-y-6">
      {orders.map((order) => (
        <div
          key={order.orderId}
          className="overflow-hidden rounded-3xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
        >
          {/* Header */}

          <div className="border-b bg-gray-50 px-6 py-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Order #{order.orderId.slice(0, 8)}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleString("en-IN")}
                </p>
              </div>

              <span
                className={`rounded-full px-4 py-2 text-sm font-semibold ${getStatusColor(
                  order.status
                )}`}
              >
                {order.status}
              </span>

            </div>
          </div>

          {/* Items */}

          <div className="space-y-3 p-6">
            {order.items?.length ? (
              order.items.map((item) => (
                <div
                  key={item.orderItemId}
                  className="flex items-center justify-between rounded-2xl bg-gray-50 p-4"
                >
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {item.itemName}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      Qty {item.quantity} × ₹{item.unitPrice}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="font-bold text-green-600">
                      ₹{item.subtotal}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">
                No item details available.
              </p>
            )}
          </div>

          {/* Footer */}

          <div className="flex flex-col gap-5 border-t bg-gray-50 px-6 py-5 lg:flex-row lg:items-center lg:justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Total Amount
              </p>

              <h2 className="text-3xl font-bold text-green-600">
                ₹{order.totalAmount}
              </h2>
            </div>

            <div className="flex flex-wrap gap-3">

              <button
                onClick={() =>
                  router.push(`/orders/${order.orderId}`)
                }
                className="rounded-xl bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700"
              >
                View Details
              </button>

              {canCancel(order) && (
                <button
                  disabled={loading}
                  onClick={async () => {
                    if (
                      confirm(
                        "Cancel this order?"
                      )
                    ) {
                      await cancelOrder(order.orderId);
                    }
                  }}
                  className="rounded-xl bg-amber-500 px-5 py-2.5 font-medium text-white transition hover:bg-amber-600 disabled:opacity-50"
                >
                  Cancel Order
                </button>
              )}

              <button
                disabled={loading}
                onClick={async () => {
                  if (
                    confirm(
                      "Delete this order from history?"
                    )
                  ) {
                    await deleteOrder(order.orderId);
                  }
                }}
                className="rounded-xl bg-red-500 px-5 py-2.5 font-medium text-white transition hover:bg-red-600 disabled:opacity-50"
              >
                Delete
              </button>

            </div>

          </div>
        </div>
      ))}
    </div>
  )}
</main>
		</div>
	);
}