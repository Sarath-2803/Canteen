"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";

import Header from "@/components/Header";

import { useOrder } from "@/contexts/OrderContext";

import { ordersService } from "@/services/orders";

import { Order } from "@/lib/types";

export default function OrderDetailsPage() {
    const router = useRouter();

    const params = useParams();
    const searchParams = useSearchParams();

    const orderId = params.id as string;

    const paymentSuccess =
        searchParams.get("payment") === "success";

    const {
        cancelOrder,
    } = useOrder();

    const [order, setOrder] =
        useState<Order | null>(null);

    const [loading, setLoading] =
        useState(true);

    const loadOrder = useCallback(async () => {
        try {
            setLoading(true);

            const response =
                await ordersService.getById(
                    orderId
                );

            setOrder(
                response.data
            );
        } catch (error) {
            console.error(
                "Failed to fetch order:",
                error
            );
        } finally {
            setLoading(false);
        }
    }, [orderId]);

    useEffect(() => {
        if (orderId) {
            loadOrder();
        }
    }, [loadOrder, orderId]);

    const canCancel = (
        status: string
    ) => status === "pending";

    const handleCancelOrder =
        async () => {
            if (!order) return;

            if (
                !confirm(
                    "Are you sure you want to cancel this order?"
                )
            ) {
                return;
            }

            try {
                await cancelOrder(
                    order.id
                );

                setOrder({
                    ...order,
                    status:
                        "cancelled",
                });

                alert(
                    "Order cancelled successfully."
                );
            } catch (
                error: unknown
            ) {
                console.error(
                    error
                );

                alert(
                    "Failed to cancel order."
                );
            }
        };

    const downloadReceipt =
        () => {
            if (!order) return;

            const content = `
ORDER RECEIPT

Order ID: ${order.id}
Date: ${new Date(order.createdAt).toLocaleString()}

Items:
${order.items?.map(
        (
            item
        ) =>
            `${item.itemName} x${item.quantity} = ₹${item.unitPrice * item.quantity}`
    )
    .join("\n")}

Total: ₹${order.totalAmount}

Status: ${order.status}

Thank you for your order.
`;

            const blob =
                new Blob(
                    [content],
                    {
                        type: "text/plain",
                    }
                );

            const url =
                URL.createObjectURL(
                    blob
                );

            const a =
                document.createElement(
                    "a"
                );

            a.href = url;
            a.download = `receipt-${order.id}.txt`;

            document.body.appendChild(
                a
            );

            a.click();

            document.body.removeChild(
                a
            );

            URL.revokeObjectURL(
                url
            );
        };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Header />

                <div className="flex justify-center py-20">
                    Loading order...
                </div>
            </div>
        );
    }

    if (!order) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Header />

                <main className="max-w-2xl mx-auto px-4 py-8">
                    <p className="text-center text-gray-600">
                        Order not found
                    </p>

                    <button
                        onClick={() =>
                            router.push(
                                "/user/orders"
                            )
                        }
                        className="mt-4 w-full bg-green-500 text-white py-2 rounded-lg"
                    >
                        Back to Orders
                    </button>
                </main>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <main className="max-w-2xl mx-auto px-4 py-8">
                {paymentSuccess && (
                    <div className="bg-green-100 border border-green-300 text-green-700 p-4 rounded mb-6">
                        Payment successful!
                    </div>
                )}

                <div className="bg-white rounded-lg shadow p-6">
                    <h1 className="text-2xl font-bold mb-6">
                        Order #{order.id}
                    </h1>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <div>
                            <p className="text-gray-500">
                                Status
                            </p>

                            <p className="font-semibold capitalize">
                                {order.status}
                            </p>
                        </div>

                        <div>
                            <p className="text-gray-500">
                                Date
                            </p>

                            <p>
                                {new Date(
                                    order.createdAt
                                ).toLocaleDateString()}
                            </p>
                        </div>

                        <div>
                            <p className="text-gray-500">
                                Total
                            </p>

                            <p className="font-semibold">
                                ₹
                                {
                                    order.totalAmount
                                }
                            </p>
                        </div>
                    </div>

                    <h2 className="text-xl font-semibold mb-4">
                        Items
                    </h2>

                    <div className="space-y-3">
                        {order.items?.map(
                            (
                                item
                            ) => (
                                <div
                                    key={
                                        item.id
                                    }
                                    className="flex justify-between bg-gray-50 p-3 rounded"
                                >
                                    <div>
                                        <p className="font-medium">
                                            {
                                                item.itemName
                                            }
                                        </p>

                                        <p className="text-sm text-gray-500">
                                            Qty:
                                            {" "}
                                            {
                                                item.quantity
                                            }
                                        </p>
                                    </div>

                                    <p>
                                        ₹
                                        {item.unitPrice *
                                            item.quantity}
                                    </p>
                                </div>
                            )
                        )}
                    </div>

                    <div className="mt-8 flex gap-2">
                        <button
                            onClick={() =>
                                router.push(
                                    "/user/orders"
                                )
                            }
                            className="flex-1 bg-gray-500 text-white py-2 rounded-lg"
                        >
                            Back
                        </button>

                        <button
                            onClick={
                                downloadReceipt
                            }
                            className="flex-1 bg-blue-500 text-white py-2 rounded-lg"
                        >
                            Receipt
                        </button>

                        {canCancel(
                            order.status
                        ) && (
                            <button
                                onClick={
                                    handleCancelOrder
                                }
                                className="flex-1 bg-red-500 text-white py-2 rounded-lg"
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}