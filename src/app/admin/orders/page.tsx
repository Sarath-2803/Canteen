"use client";
import { useEffect, useState } from "react";

type OrderStatus = "Pending" | "Completed" | "Cancelled" | "Refunded";

type Order = {
  id: string;
  customerEmail: string;
  total: number;
  status: OrderStatus;
};

const DEFAULT_ORDERS = [
  {
    id: "ORD001",
    customerEmail: "user1@example.com",
    total: 398,
    status: "Pending",
  },
  {
    id: "ORD002",
    customerEmail: "user2@example.com",
    total: 249,
    status: "Completed",
  },
];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState(DEFAULT_ORDERS);

  useEffect(() => {
    const stored = localStorage.getItem("admin_orders");
    if (stored) {
      setOrders(JSON.parse(stored));
    } else {
      localStorage.setItem("admin_orders", JSON.stringify(DEFAULT_ORDERS));
    }
  }, []);
  const updateOrderStatus = (id: string, status: OrderStatus) => {
    const updated = orders.map((o) => (o.id === id ? { ...o, status } : o));
    setOrders(updated);
    localStorage.setItem("admin_orders", JSON.stringify(updated));
  };

  const viewOrder = (id: string) => {
    alert(`Order details for ${id} (details page later)`);
  };

  const getStatusColor = (status: String) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Orders</h1>

      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3">Order ID</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Total (₹)</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-t">
                <td className="px-4 py-3 font-medium">{order.id}</td>
                <td className="px-4 py-3">{order.customerEmail}</td>
                <td className="px-4 py-3">₹{order.total}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-4 py-3 flex gap-2">
                  <button
                    className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={() => viewOrder(order.id)}
                  >
                    View
                  </button>

                  <button
                    disabled={order.status !== "Completed"}
                    className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-gray-300"
                    onClick={() => updateOrderStatus(order.id, "Cancelled")}
                  >
                    Cancel and Refund
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
