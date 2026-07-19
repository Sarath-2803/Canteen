"use client";

import { useEffect, useState } from "react";
import { useOrder } from "@/contexts/OrderContext";
import { Order, OrderStatus } from "@/lib/types";

export default function OwnerOrdersPage() {
  const {
    orders,
    loading,
    page,
    totalPages,
    refreshAllOrders,
    updateOrderStatus,
  } = useOrder();

  useEffect(() => {
    refreshAllOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus>("PENDING");

  const confirmStatusChange = async () => {
    try {
      await updateOrderStatus(selectedOrder?.orderId || "", selectedStatus);

      alert("Order status updated successfully.");

      setConfirmOpen(false);
    } catch (err) {
      console.error(err);
      alert("Failed to update order status.");
    }
  };

  const handleStatusChange = (
    order: Order,
  ) => {
    setSelectedOrder(order);
    setSelectedStatus(order.status);
    setConfirmOpen(true);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">

        <div className="h-12 w-12 animate-spin rounded-full border-4 border-green-200 border-t-green-600"></div>

        <p className="mt-5 text-gray-500">
          Loading Orders...
        </p>

      </div>
    );
  }

  return (
    <div className="pb-8">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">
            Orders
          </h1>

          <p className="mt-2 text-gray-500">
            Manage customer orders and monitor their status.
          </p>
        </div>

        <button
          onClick={() => refreshAllOrders(page)}
          className="flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 font-medium text-white transition hover:bg-green-700 hover:shadow-lg"
        >
          Refresh
        </button>
      </div>

      {orders.length === 0 && (
        <div className="rounded-2xl border bg-white py-24 text-center shadow-sm">

          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">

            📦

          </div>

          <h2 className="text-2xl font-semibold text-gray-900">
            No Orders Yet
          </h2>

          <p className="mt-3 text-gray-500">
            Orders will appear here once customers place them.
          </p>

        </div>
      )}

      <div className="space-y-5">
        {orders.map((order) => (
          <div
            key={order.orderId}
            className="group rounded-2xl border border-gray-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
              <div className="space-y-4">

                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Order #{order.orderId.slice(0, 8)}
                  </h2>

                  <p className="text-sm text-gray-500">
                    {order.orderId}
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">

                  <div className="rounded-xl bg-gray-50 p-3">
                    <p className="text-xs uppercase text-gray-400">
                      Customer
                    </p>

                    <p className="mt-1 font-medium text-gray-800">
                      {order.userId}
                    </p>
                  </div>

                  <div className="rounded-xl bg-gray-50 p-3">
                    <p className="text-xs uppercase text-gray-400">
                      Created
                    </p>

                    <p className="mt-1 font-medium text-gray-800">
                      {new Date(order.createdAt).toLocaleString("en-IN")}
                    </p>
                  </div>

                </div>

                <div className="text-3xl font-bold text-green-600">
                  ₹{Number(order.totalAmount).toFixed(2)}
                </div>

              </div>

              <div className="flex flex-col gap-3">

                <span
                  className={`inline-flex w-fit items-center rounded-full px-5 py-2 text-sm font-semibold

${order.status === "PENDING"
                      ? "bg-yellow-100 text-yellow-700 border border-yellow-300"

                      : order.status === "CONFIRMED"
                        ? "bg-green-100 text-green-700 border border-green-300"

                        : "bg-red-100 text-red-700 border border-red-300"

                    }`}
                >
                  {order.status}
                </span>
                
                <button
                  onClick={() => handleStatusChange(order)}
                  className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                >
                  Update Status
                </button>

                <a
                  href={`/admin/orders/${order.orderId}`}
                  className="flex items-center justify-center rounded-xl bg-green-600 px-6 py-3 font-medium text-white transition hover:bg-green-700 hover:shadow-lg"
                >
                  View Order →
                </a>

              </div>
            </div>



            {order.items &&
              order.items.length > 0 && (
                <div className="mt-6 border-t pt-4">
                  <h3 className="mb-3 font-semibold text-gray-900">
                    Order Items
                  </h3>

                  <div className="grid gap-3">
                    {order.items.map(
                      (item) => (
                        <div
                          key={
                            item.orderItemId
                          }
                          className="flex items-center justify-between rounded-xl border bg-gray-50 px-5 py-4 transition hover:bg-green-50"
                        >
                          <div>
                            <p className="font-semibold text-gray-900">
                              {item.itemName}
                            </p>

                            <p className="text-sm text-gray-500">
                              Quantity • {item.quantity}
                            </p>
                          </div>

                          <div className="text-lg font-bold text-green-600">
                            ₹{item.subtotal.toFixed(2)}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}
          </div>
        ))}
      </div>

      <div className="mt-10 flex items-center justify-center gap-6">
        <button
          disabled={page === 1}
          onClick={() =>
            refreshAllOrders(page - 1)
          }
          className="rounded-xl border text-green-600 border-gray-200 bg-white px-6 py-3 shadow-sm transition hover:bg-green-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
        >
          Previous
        </button>

        <span className="rounded-xl bg-green-50 px-5 py-3 font-semibold text-green-700">
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() =>
            refreshAllOrders(page + 1)
          }
          className="rounded bg-gray-200 px-4 text-gray-700 py-2 disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {confirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">

    <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">

        <div className="mb-6">

            <h2 className="text-2xl font-bold text-gray-900">
                Update Order Status
            </h2>

            <p className="mt-2 text-gray-500">
                Select the new status for this order.
            </p>

        </div>

        <select
            value={selectedStatus}
            onChange={(e)=>setSelectedStatus(e.target.value as OrderStatus)}
            className="mb-6 w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-green-500 focus:outline-none"
        >
            <option value="PENDING">Pending</option>
            <option value="CONFIRMED">Confirmed</option>
            <option value="CANCELLED">Cancelled</option>
        </select>

        <div className="flex justify-end gap-3">

            <button
                onClick={()=>setConfirmOpen(false)}
                className="rounded-xl bg-gray-200 px-5 py-3 font-medium"
            >
                Cancel
            </button>

            <button
                onClick={confirmStatusChange}
                className="rounded-xl bg-green-600 px-5 py-3 font-medium text-white hover:bg-green-700"
            >
                Save Changes
            </button>

        </div>

    </div>

</div>
      )}
    </div>
  );
}