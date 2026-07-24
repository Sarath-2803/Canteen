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
    updateCartItem,
  } = useCart();

  // console.log("CartPage cart:", cart);

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

        <main className="max-w-6xl mx-auto px-4 py-8 pt-30">
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

        <main className="max-w-6xl mx-auto px-4 py-8 pt-30">
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

      <main className="mx-auto max-w-7xl px-4 py-8 pt-30">

        {/* Heading */}

        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

          <div>
            <h1 className="text-4xl font-bold text-gray-900">
              Shopping Cart
            </h1>

            <p className="mt-2 text-gray-500">
              {cartCount} item{cartCount !== 1 && "s"} in your cart
            </p>
          </div>

        </div>

        <div className="grid gap-8 lg:grid-cols-3">

          {/* Cart Items */}

          <div className="space-y-5 lg:col-span-2">

            {cart.map((cartItem) => (

              <div
                key={cartItem.cartItemId}
                className="rounded-2xl bg-white p-6 shadow-sm transition hover:shadow-lg"
              >

                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                  <div>

                    <h2 className="text-xl font-bold text-gray-900">
                      {cartItem.item?.itemName ?? "Unknown Item"}
                    </h2>

                    <p className="mt-2 text-gray-500">
                      Unit Price
                    </p>

                    <p className="font-semibold text-green-600">
                      ₹{cartItem.item?.price ?? 0}
                    </p>

                    <div className="mt-4 flex items-center gap-3">
                      <span className="text-gray-600">
                        Quantity:
                      </span>

                      <div className="flex items-center rounded-lg border border-gray-200 bg-gray-50">
                        <button
                          onClick={() =>
                            updateCartItem(
                              cartItem.cartItemId,
                              cartItem.quantity - 1
                            )
                          }
                          disabled={cartItem.quantity <= 1}
                          className="flex h-9 w-9 items-center justify-center rounded-l-lg text-lg font-semibold text-gray-700 transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          −
                        </button>

                        <span className="flex h-9 w-10 items-center justify-center border-x border-gray-200 bg-white font-semibold text-gray-900">
                          {cartItem.quantity}
                        </span>

                        <button
                          onClick={() =>
                            updateCartItem(
                              cartItem.cartItemId,
                              cartItem.quantity + 1
                            )
                          }
                          className="flex h-9 w-9 items-center justify-center rounded-r-lg text-lg font-semibold text-gray-700 transition hover:bg-gray-200"
                        >
                          +
                        </button>
                      </div>
                    </div>

                  </div>

                  <div className="text-right">

                    <p className="text-sm text-gray-500">
                      Total
                    </p>

                    <h3 className="mt-1 text-3xl font-bold text-gray-900">
                      ₹
                      {(
                        (cartItem.item?.price ?? 0) *
                        cartItem.quantity
                      ).toFixed(2)}
                    </h3>

                    <button
                      onClick={() =>
                        removeFromCart(cartItem.cartItemId)
                      }
                      className="mt-5 rounded-xl bg-red-500 px-5 py-2 font-medium text-white transition hover:bg-red-600"
                    >
                      Remove
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

          {/* Summary */}

          <div>

            <div className="sticky top-24 rounded-3xl bg-white p-7 shadow-lg">

              <h2 className="text-2xl font-bold text-gray-900">
                Order Summary
              </h2>

              <div className="mt-8 space-y-4">

                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>

                  <span className="font-medium">
                    ₹{totalPrice.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Total Items</span>

                  <span className="font-medium">
                    {cartCount}
                  </span>
                </div>

              </div>

              <div className="my-6 border-t" />

              <div className="flex items-center justify-between">

                <span className="text-xl font-semibold text-gray-900">
                  Total
                </span>

                <span className="text-3xl font-bold text-green-600">
                  ₹{totalPrice.toFixed(2)}
                </span>

              </div>

              <button
                onClick={() => router.push("/checkout")}
                className="mt-8 w-full rounded-xl bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700"
              >
                Proceed to Checkout
              </button>

              <button
                onClick={() => router.push("/")}
                className="mt-3 w-full rounded-xl bg-gray-200 py-3 font-semibold text-gray-800 transition hover:bg-gray-300"
              >
                Continue Shopping
              </button>

              <button
                onClick={clearCart}
                className="mt-3 w-full rounded-xl bg-red-500 py-3 font-semibold text-white transition hover:bg-red-600"
              >
                Clear Cart
              </button>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}