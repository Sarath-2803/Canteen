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

			console.log("Razorpay instance created");

			razorpay.open();

			console.log("Razorpay opened");
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

				<main className="max-w-2xl mx-auto px-4 py-8">
					<h1 className="text-3xl font-bold text-gray-900 mb-8">
						Checkout
					</h1>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">

						{/* ORDER SUMMARY */}

						<div className="bg-white p-6 rounded-lg shadow">
							<h2 className="text-xl font-semibold mb-4 text-gray-900">
								Order Summary
							</h2>

							<div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
								{cart.map(
									(item) => (
										<div
											key={
												item.cartItemId
											}
											className="flex justify-between text-gray-700"
										>
											<span>
												{
													item
														.item
														?.itemName
												}{" "}
												×{" "}
												{
													item.quantity
												}
											</span>

											<span>
												₹
												{(
													item
														.item
														?.price ??
													0
												) *
													item.quantity}
											</span>
										</div>
									)
								)}
							</div>

							<div className="border-t pt-4 text-xl font-bold text-gray-900">
								Total: ₹
								{totalAmount}
							</div>
						</div>

						{/* PAYMENT */}

						<div className="bg-white p-6 rounded-lg shadow">
							<h2 className="text-xl font-semibold mb-4 text-gray-900">
								Payment
							</h2>

							<form
								onSubmit={
									handlePayment
								}
								className="space-y-4"
							>
								{error && (
									<div className="bg-red-100 border border-red-300 text-red-700 p-3 rounded">
										{error}
									</div>
								)}

								{/* <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
									<h3 className="font-semibold text-purple-900 mb-2">
										UPI Payment via Razorpay
									</h3>

									<p className="text-sm text-purple-700">
										Click the button below
										to continue with UPI
										payment using Google
										Pay, PhonePe, Paytm,
										BHIM or any other UPI
										app.
									</p>
								</div> */}

								<button
									type="submit"
									disabled={loading}
									className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white py-3 rounded-lg font-semibold"
								>
									{loading
										? "Processing Payment..."
										: `Pay ₹${totalAmount}`}
								</button>

								<button
									type="button"
									onClick={() =>
										router.push("/")
									}
									className="w-full bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-lg font-semibold"
								>
									Cancel
								</button>
							</form>
						</div>

					</div>
				</main>
			</div>
		</>
	);
}