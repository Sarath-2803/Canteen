"use client";

import Script from "next/script";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import Header from "@/components/Header";

import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { useOrder } from "@/contexts/OrderContext";
import { usePayment } from "@/contexts/PaymentContext";
import { RazorpayPaymentSuccessResponse } from "@/lib/types";

export default function CheckoutPage() {
	const router = useRouter();

	const { user } = useAuth();

	const {
		cart,
		clearCart,
		refreshCart,
	} = useCart();

	const {
		checkout,
		updateOrderStatus,
	} = useOrder();

	const {
		verifyPayment,
	} = usePayment();

	const [loading, setLoading] =
		useState(false);

	const [cartLoading, setCartLoading] =
		useState(true);

	const [error, setError] =
		useState("");

	useEffect(() => {
		const loadCart = async () => {
			try {
				setCartLoading(true);
				await refreshCart();
			} catch (err) {
				console.error(
					"Failed to load cart:",
					err
				);
			} finally {
				setCartLoading(false);
			}
		};

		if (user?.userId) {
			loadCart();
		} else {
			setCartLoading(false);
		}
	}, [user, refreshCart]);

	const totalAmount =
		cart.reduce(
			(sum, item) =>
				sum +
				(item.item?.price ?? 0) *
				item.quantity,
			0
		);

	const handlePayment = async (
		e: React.FormEvent
	) => {
		e.preventDefault();

		setLoading(true);
		setError("");

		try {
			if (!user?.userId) {
				throw new Error(
					"You must be logged in to continue."
				);
			}

			if (cart.length === 0) {
				throw new Error(
					"Cart is empty."
				);
			}

			/*
				Create order in backend
			*/
			const order = await checkout("UPI");

			if (!order) {
				throw new Error(
					"Failed to create order."
				);
			}

			// console.log("Order created:", order);
			// console.log("window.Razorpay =", window.Razorpay);

			if (
				!order.keyId ||
				!order.currency ||
				!order.razorpayOrderId
			) {
				throw new Error(
					"Invalid Razorpay configuration received from server."
				);
			}

			const options = {
				key: order.keyId!,
				amount: order.totalAmount,
				currency: order.currency!,
				order_id: order.razorpayOrderId!,

				name: "College Canteen",
				description: "Order Payment",

				handler: async (
					response: RazorpayPaymentSuccessResponse
				) => {
					try {
						// console.log(
						// 	"Razorpay response:",
						// 	response
						// );

						const payment =
							await verifyPayment({
								razorpayOrderId:
									response.razorpay_order_id,

								razorpayPaymentId:
									response.razorpay_payment_id,

								razorpaySignature:
									response.razorpay_signature,

								userId: user.userId,
								orderId: order.orderId,
							});

						// console.log(
						// 	"Payment verified:",
						// 	payment
						// );

						clearCart();

						router.push(
							`/orders/${order.orderId}?payment=success`
						);
					} catch (error) {
						// console.error(
						// 	"Payment verification failed:",
						// 	error
						// );

						setError(
							"Payment verification failed."
						);
					}
				},

				prefill: {
					name:
						`${user?.firstName} ${user?.lastName}`,
					email: user?.email,
				},

				theme: {
					color: "#22c55e",
				},
			};

			// console.log("Creating options...");
			// console.log(options);

			const razorpay =
				new window.Razorpay(options);

			// console.log("Razorpay instance created");

			razorpay.open();

			// console.log("Razorpay opened");
			/*
				TODO:
				Replace this section with actual
				Razorpay checkout popup and
				verification.
			*/

			await updateOrderStatus(
				order.orderId,
				"CONFIRMED"
			);

			clearCart();

			router.push(
				`/orders/${order.orderId}?payment=success`
			);
		} catch (err: unknown) {
			if (err instanceof Error) {
				setError(err.message);
			} else {
				setError(
					"Payment failed. Please try again."
				);
			}
		} finally {
			setLoading(false);
		}
	};

	if (cartLoading) {
		return (
			<div className="min-h-screen bg-gray-50">
				<Header />

				<main className="max-w-2xl mx-auto px-4 py-8">
					<p className="text-center text-gray-600">
						Loading cart...
					</p>
				</main>
			</div>
		);
	}

	if (cart.length === 0) {
		return (
			<div className="min-h-screen bg-gray-50">
				<Header />

				<main className="max-w-2xl mx-auto px-4 py-8">
					<p className="text-center text-gray-600">
						Your cart is empty
					</p>

					<button
						onClick={() =>
							router.push("/")
						}
						className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg"
					>
						Continue Shopping
					</button>
				</main>
			</div>
		);
	}

	return (
		<>
			<Script
				src="https://checkout.razorpay.com/v1/checkout.js"
				strategy="afterInteractive"
				onLoad={() =>
					console.log(
						"Razorpay SDK loaded"
					)
				}
			/>

			<div className="min-h-screen bg-gray-50">
				<Header />

				<main className="mx-auto max-w-7xl px-4 py-8">

					<div className="mb-8">

						<h1 className="text-4xl font-bold text-gray-900">
							Checkout
						</h1>

						<p className="mt-2 text-gray-500">
							Review your order before making payment.
						</p>

					</div>

					<div className="grid gap-8 lg:grid-cols-3">

						{/* LEFT */}

						<div className="lg:col-span-2">

							<div className="rounded-3xl bg-white p-7 shadow-lg">

								<h2 className="mb-6 text-2xl font-bold text-gray-900">
									Order Summary
								</h2>

								<div className="space-y-5">

									{cart.map((item) => (

										<div
											key={item.cartItemId}
											className="flex items-center justify-between rounded-2xl border border-gray-200 p-5"
										>

											<div>

												<h3 className="text-lg font-semibold text-gray-900">
													{item.item?.itemName}
												</h3>

												<p className="mt-1 text-sm text-gray-500">
													₹{item.item?.price} × {item.quantity}
												</p>

											</div>

											<div className="text-right">

												<p className="text-sm text-gray-500">
													Subtotal
												</p>

												<h3 className="text-2xl font-bold text-green-600">
													₹
													{(item.item?.price ?? 0) *
														item.quantity}
												</h3>

											</div>

										</div>

									))}

								</div>

							</div>

						</div>

						{/* RIGHT */}

						<div>

							<div className="sticky top-24 rounded-3xl bg-white p-7 shadow-lg">

								<h2 className="text-2xl font-bold text-gray-900">
									Payment Summary
								</h2>

								<div className="mt-8 space-y-4">

									<div className="flex justify-between text-gray-600">

										<span>Items</span>

										<span>{cart.length}</span>

									</div>

									<div className="flex justify-between text-gray-600">

										<span>Total Quantity</span>

										<span>
											{cart.reduce(
												(sum, item) =>
													sum + item.quantity,
												0
											)}
										</span>

									</div>

								</div>

								<div className="my-6 border-t" />

								<div className="flex items-center justify-between">

									<span className="text-xl font-semibold text-gray-900">
										Total
									</span>

									<span className="text-3xl font-bold text-green-600">
										₹{totalAmount}
									</span>

								</div>

								<div className="mt-6 rounded-2xl border border-green-100 bg-green-50 p-4">

									<p className="font-semibold text-green-700">
										Razorpay Secure Payment
									</p>

									<p className="mt-2 text-sm text-green-600">
										Pay securely using UPI, Cards,
										Net Banking or Wallets.
									</p>

								</div>

								<form
									onSubmit={handlePayment}
									className="mt-6"
								>

									{error && (

										<div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
											{error}
										</div>

									)}

									<button
										type="submit"
										disabled={loading}
										className="w-full rounded-xl bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700 disabled:bg-gray-400"
									>
										{loading
											? "Processing Payment..."
											: `Pay ₹${totalAmount}`}
									</button>

									<button
										type="button"
										onClick={() => router.push("/cart")}
										className="mt-3 w-full rounded-xl bg-gray-200 py-3 font-semibold text-gray-800 transition hover:bg-gray-300"
									>
										Back to Cart
									</button>

								</form>

							</div>

						</div>

					</div>

				</main>
			</div>
		</>
	);
}