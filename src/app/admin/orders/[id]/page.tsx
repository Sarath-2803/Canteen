"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { OrderItem, OrderStatus } from "@/lib/types";
import { orderItemsService } from "@/services/orderItems";
import { ordersService } from "@/services/orders";

export default function AdminOrderDetailsPage() {
  const router = useRouter();
  const { id: orderId } = useParams<{ id: string }>();

  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [status, setStatus] = useState<OrderStatus>("PENDING");
  const [updating, setUpdating] = useState(false);

  const [confirmOpen, setConfirmOpen] = useState(false);

  const loadOrder = useCallback(async () => {
    try {
      setLoading(true);

      const [itemsRes, orderRes] = await Promise.all([
        orderItemsService.getByOrderId(orderId),
        ordersService.getById(orderId),
      ]);

      setOrderItems(itemsRes.data);
      setStatus(orderRes.data.status);
    } finally {
      setLoading(false);
    }
  }, [orderId]);

  useEffect(() => {
    if (orderId) loadOrder();
  }, [orderId, loadOrder]);

  const totalAmount = orderItems.reduce(
    (sum, item) => sum + Number(item.subtotal),
    0
  );

  const updateStatus = async () => {
    try {
      setUpdating(true);

      await ordersService.updateStatus(orderId, status);

      alert("Order status updated successfully.");
      setConfirmOpen(false);
    } catch (err) {
      console.error(err);
      alert("Failed to update status.");
    } finally {
      setUpdating(false);
    }
  };

  const badgeColor = () => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-700";

      case "CONFIRMED":
        return "bg-green-100 text-green-700";

      case "CANCELLED":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-32">
        <div className="h-14 w-14 animate-spin rounded-full border-b-4 border-green-600"></div>
      </div>
    );
  }

  if (orderItems.length === 0) {
    return (
      <div className="py-24 text-center">
        <h2 className="text-2xl font-semibold text-gray-800">
          Order not found
        </h2>

        <button
          onClick={() => router.push("/admin/orders")}
          className="mt-8 rounded-xl bg-green-600 px-6 py-3 text-white hover:bg-green-700"
        >
          Back to Orders
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8">

      {/* Header */}

      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <p className="text-sm text-gray-500">
            Admin / Orders / Details
          </p>

          <h1 className="mt-2 text-4xl font-bold text-gray-900">
            Order Details
          </h1>

          <p className="mt-2 font-mono text-sm text-gray-500">
            {orderId}
          </p>

        </div>

        <button
          onClick={() => router.push("/admin/orders")}
          className="rounded-xl border text-gray-700 bg-white px-6 py-3 shadow hover:bg-gray-50"
        >
          ← Back
        </button>

      </div>

      {/* Summary */}

      <div className="grid gap-6 md:grid-cols-3">

        <div className="rounded-2xl bg-white p-6 shadow">

          <p className="text-sm text-gray-500">
            Total Amount
          </p>

          <h2 className="mt-3 text-4xl font-bold text-green-600">
            ₹{totalAmount.toFixed(2)}
          </h2>

        </div>

        <div className="rounded-2xl bg-white p-6 shadow">

          <p className="text-sm text-gray-500">
            Items
          </p>

          <h2 className="mt-3 text-4xl font-bold text-gray-900">
            {orderItems.length}
          </h2>

        </div>

        <div className="rounded-2xl bg-white p-6 shadow">

          <p className="text-sm text-gray-500">
            Current Status
          </p>

          <span
            className={`mt-4 inline-block rounded-full px-5 py-2 font-semibold ${badgeColor()}`}
          >
            {status}
          </span>

        </div>

      </div>

      {/* Update */}

      <div className="rounded-2xl bg-white p-6 shadow">

        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <h2 className="text-xl font-bold text-gray-900">
              Update Order Status
            </h2>

            <p className="mt-1 text-gray-500">
              Select a new status and save changes.
            </p>

          </div>

          <div className="flex gap-3">

            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value as OrderStatus)
              }
              className="rounded-xl border px-5 py-3 text-gray-900 focus:border-green-500 focus:outline-none"
            >
              <option value="PENDING">
                Pending
              </option>

              <option value="CONFIRMED">
                Confirmed
              </option>

              <option value="CANCELLED">
                Cancelled
              </option>

            </select>

            <button
              onClick={() => setConfirmOpen(true)}
              className="rounded-xl bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
            >
              Save Changes
            </button>

          </div>

        </div>

      </div>

      {/* Table */}

      <div className="overflow-hidden rounded-2xl bg-white shadow">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="px-6 py-4 text-left text-gray-700">
                Item
              </th>

              <th className="px-6 py-4 text-center text-gray-700">
                Qty
              </th>

              <th className="px-6 py-4 text-center text-gray-700">
                Unit Price
              </th>

              <th className="px-6 py-4 text-center text-gray-700">
                Subtotal
              </th>

            </tr>

          </thead>

          <tbody>

            {orderItems.map((item) => (

              <tr
                key={item.orderItemId}
                className="border-t transition hover:bg-gray-50"
              >

                <td className="px-6 py-5">

                  <p className="font-semibold text-gray-900">
                    {item.itemName}
                  </p>

                </td>

                <td className="text-center font-medium text-gray-700">
                  {item.quantity}
                </td>

                <td className="text-center text-gray-700">
                  ₹{Number(item.unitPrice).toFixed(2)}
                </td>

                <td className="text-center font-bold text-green-600">
                  ₹{Number(item.subtotal).toFixed(2)}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* Confirmation */}

      {confirmOpen && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

          <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">

            <h2 className="text-2xl font-bold text-gray-900">
              Update Status?
            </h2>

            <p className="mt-3 text-gray-600">
              Change the order status to{" "}
              <span className="font-semibold text-green-600">
                {status}
              </span>
              ?
            </p>

            <div className="mt-8 flex justify-end gap-3">

              <button
                onClick={() => setConfirmOpen(false)}
                className="rounded-xl bg-gray-200 px-5 py-2 hover:bg-gray-300"
              >
                Cancel
              </button>

              <button
                disabled={updating}
                onClick={updateStatus}
                className="rounded-xl bg-green-600 px-5 py-2 text-white hover:bg-green-700 disabled:opacity-50"
              >
                {updating ? "Updating..." : "Confirm"}
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}