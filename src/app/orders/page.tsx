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

			<main className="max-w-6xl mx-auto px-4 py-8">
				<h1 className="text-3xl font-bold text-gray-900 mb-8">
					My Orders
				</h1>

				{orders.length === 0 ? (
					<div className="text-center py-12">
						<p className="text-gray-600 mb-4">
							No orders yet
						</p>

						<button
							onClick={() =>
								router.push("/")
							}
							className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded-lg"
						>
							Start Ordering
						</button>
					</div>
				) : (
					<div className="space-y-4">
						{orders.map(
							(order) => (
								<div
									key={
										order.orderId
									}
									className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6"
								>
									<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
										<div>
											<h3 className="text-lg font-semibold text-gray-900">
												Order #
												{order.orderId}
											</h3>

											<p className="text-sm text-gray-600">
												{new Date(
													order.createdAt
												).toLocaleDateString()}
											</p>
										</div>

										<span
											className={`px-3 py-1 rounded-full text-sm font-medium w-fit ${getStatusColor(
												order.status
											)}`}
										>
											{
												order.status
											}
										</span>
									</div>

									<div className="mb-4">
										<h4 className="font-semibold text-gray-700 mb-2">
											Items
										</h4>

										<div className="space-y-2">
											{order
												.items
												?.length ? (
												order.items.map(
													(
														item
													) => (
														<div
															key={
																item.itemId
															}
															className="flex justify-between text-sm text-gray-600"
														>
															<div>
																<span className="font-medium">
																	{
																		item.itemName
																	}
																</span>

																<span>
																	{" "}
																	x
																	{
																		item.quantity
																	}
																</span>
															</div>

															<div className="text-right">
																<div>
																	₹
																	{
																		item.subtotal
																	}
																</div>

																<div className="text-xs text-gray-500">
																	₹
																	{
																		item.unitPrice
																	}{" "}
																	each
																</div>
															</div>
														</div>
													)
												)
											) : (
												<p className="text-sm text-gray-500">
													No
													item
													details
													available
												</p>
											)}
										</div>
									</div>

									<div className="border-t pt-4 mb-4 flex justify-between items-center">
										<p className="text-lg font-bold text-gray-900">
											Total:
											₹
											{
												order.totalAmount
											}
										</p>
									</div>

									<div className="flex gap-2 flex-wrap">
										<button
											onClick={() =>
												router.push(
													`/orders/${order.orderId}`
												)
											}
											className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg text-sm"
										>
											View
											Details
										</button>

										{canCancel(
											order
										) && (
											<button
												disabled={
													loading
												}
												onClick={async () => {
													if (
														confirm(
															"Cancel this order?"
														)
													) {
														await cancelOrder(
															order.orderId
														);
													}
												}}
												className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white font-semibold px-4 py-2 rounded-lg text-sm"
											>
												Cancel
												Order
											</button>
										)}

										<button
											disabled={
												loading
											}
											onClick={async () => {
												if (
													confirm(
														"Delete this order from history?"
													)
												) {
													await deleteOrder(
														order.orderId
													);
												}
											}}
											className="bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white font-semibold px-4 py-2 rounded-lg text-sm"
										>
											Delete
										</button>
									</div>
								</div>
							)
						)}
					</div>
				)}
			</main>
		</div>
	);
}