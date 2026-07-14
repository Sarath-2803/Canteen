"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import Header from "@/components/Header";

import { useCart } from "@/contexts/CartContext";

export default function CartPage() {
    const router = useRouter();

    const {
        cart,
        loading,
        cartCount,
        refreshCart,
        removeFromCart,
        clearCart,
    } = useCart();

	console.log("CartPage cart:", cart);

    useEffect(() => {
        refreshCart();
    }, [refreshCart]);

    const totalPrice = cart.reduce(
        (sum, cartItem) =>
            sum +
            ((cartItem.item?.price ?? 0) *
                cartItem.quantity),
        0
    );

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Header />

                <main className="max-w-6xl mx-auto px-4 py-8">
                    <div className="text-center py-20">
                        Loading cart...
                    </div>
                </main>
            </div>
        );
    }

    if (cart.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Header />

                <main className="max-w-6xl mx-auto px-4 py-8">
                    <div className="bg-white rounded-lg shadow p-12 text-center">
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">
                            Your cart is empty
                        </h1>

                        <p className="text-gray-600 mb-8">
                            Add some delicious food to get started.
                        </p>

                        <button
                            onClick={() =>
                                router.push("/")
                            }
                            className="bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
                        >
                            Continue Shopping
                        </button>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <main className="max-w-6xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">
                    Shopping Cart
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow">
                            {cart.map(
                                (cartItem) => (
                                    <div
                                        key={
                                            cartItem.cartItemId
                                        }
                                        className="flex justify-between items-center p-4 border-b last:border-b-0"
                                    >
                                        <div>
                                            <h3 className="font-semibold text-gray-900">
                                                {cartItem.item?.itemName ??
                                                    "Unknown Item"}
                                            </h3>

                                            <p className="text-gray-600">
                                                ₹
                                                {cartItem
                                                    .item?.price ??
                                                    0}
                                            </p>

                                            <p className="text-gray-600">
                                                Quantity:{" "}
                                                {
                                                    cartItem.quantity
                                                }
                                            </p>

                                            <p className="text-green-600 font-medium mt-1">
                                                ₹
                                                {(
                                                    (cartItem
                                                        .item?.price ??
                                                        0) *
                                                    cartItem.quantity
                                                ).toFixed(
                                                    2
                                                )}
                                            </p>
                                        </div>

                                        <button
                                            onClick={() =>
                                                removeFromCart(
                                                    cartItem.cartItemId
                                                )
                                            }
                                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                )
                            )}
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6 h-fit">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">
                            Order Summary
                        </h2>

                        <div className="space-y-2 mb-4">
                            <div className="flex justify-between text-gray-700">
                                <span>
                                    Subtotal
                                </span>
                                <span>
                                    ₹
                                    {totalPrice.toFixed(
                                        2
                                    )}
                                </span>
                            </div>

                            <div className="flex justify-between text-gray-700">
                                <span>
                                    Total Items
                                </span>
                                <span>
                                    {
                                        cartCount
                                    }
                                </span>
                            </div>
                        </div>

                        <div className="border-t pt-4 mb-6">
                            <div className="flex justify-between text-lg font-bold text-gray-900">
                                <span>
                                    Total
                                </span>

                                <span>
                                    ₹
                                    {totalPrice.toFixed(
                                        2
                                    )}
                                </span>
                            </div>
                        </div>

                        <button
                            onClick={() =>
                                router.push(
                                    "/checkout"
                                )
                            }
                            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg mb-3 transition-colors"
                        >
                            Proceed to Checkout
                        </button>

                        <button
                            onClick={() =>
                                router.push("/")
                            }
                            className="w-full bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 rounded-lg transition-colors"
                        >
                            Continue Shopping
                        </button>

                        <button
                            onClick={() =>
                                clearCart()
                            }
                            className="w-full mt-3 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg transition-colors"
                        >
                            Clear Cart
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}