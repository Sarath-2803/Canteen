"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect, useMemo, useCallback } from "react";

import Header from "@/components/Header";

import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";

import { itemsService } from "@/services/items";

import { Item } from "@/lib/types";

export default function Home() {
	const router = useRouter();

	const { addToCart, cart } = useCart();
	const { user, loading: authLoading } = useAuth();

	const [menuItems, setMenuItems] = useState<Item[]>([]);
	const [loading, setLoading] = useState(true);

	const [quantities, setQuantities] = useState<Record<string, number>>({});
	const [addedItems, setAddedItems] = useState<Record<string, boolean>>({});

	// Redirect admin users away from customer menu
	useEffect(() => {
		if (!authLoading && user?.role?.toLowerCase() === "admin") {
			router.replace("/admin/dashboard");
		}
	}, [authLoading, user, router]);

	// Fetch menu items
	useEffect(() => {
		const fetchItems = async () => {
			try {
				setLoading(true);

				const response = await itemsService.getAll();

				// Supports both paginated and plain responses
				const items =
					response?.data?.data ??
					response?.data ??
					[];

				setMenuItems(items);

				const initialQuantities: Record<string, number> = {};

				items.forEach((item: Item) => {
					if (
						item.isAvailable
					) {
						initialQuantities[item.itemId] = 1;
					}
				});

				setQuantities(initialQuantities);
			} catch (error) {
				console.error(
					"Failed to fetch menu items:",
					error
				);
			} finally {
				setLoading(false);
			}
		};

		fetchItems();
	}, []);

	const cartCount = useMemo(
		() =>
			cart.reduce(
				(sum, item) =>
					sum + item.quantity,
				0
			),
		[cart]
	);

	const handleQuantityChange = useCallback(
		(itemId: string, change: number) => {
			setQuantities((prev) => {
				const current =
					prev[itemId] ?? 0;

				return {
					...prev,
					[itemId]: Math.max(
						0,
						current + change
					),
				};
			});
		},
		[]
	);

	const handleAddToCart = useCallback(
		async (item: Item) => {
			if (!user) {
				router.push("/login");
				return;
			}

			console.log("user is", user);

			const quantity =
				quantities[item.itemId] || 1;

			try {
				await addToCart(
					item.itemId,
					quantity
				);

				setQuantities((prev) => ({
					...prev,
					[item.itemId]: 1,
				}));

				setAddedItems((prev) => ({
					...prev,
					[item.itemId]: true,
				}));

				setTimeout(() => {
					setAddedItems(
						(prev) => ({
							...prev,
							[item.itemId]:
								false,
						})
					);
				}, 2000);
			} catch (error) {
				console.error(
					"Failed to add item to cart:",
					error
				);

				alert(
					"Failed to add item to cart. Please try again."
				);
			}
		},
		[
			user,
			router,
			addToCart,
			quantities,
		]
	);

	return (
		<div className="min-h-screen bg-gray-50">
			<Header />

			<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<div className="flex justify-between items-center mb-8">
					<h1 className="text-4xl font-bold text-gray-900">
						Menu
					</h1>

					{cartCount > 0 && (
						<button
							onClick={() =>
								router.push(
									"/checkout"
								)
							}
							className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded-lg transition-colors"
						>
							Checkout (
							{cartCount})
						</button>
					)}
				</div>

				{loading ? (
					<div className="text-center py-20">
						<p className="text-xl text-gray-600">
							Loading
							menu...
						</p>
					</div>
				) : menuItems.length === 0 ? (
					<div className="text-center py-20">
						<p className="text-gray-600 text-lg">
							No menu items
							available.
						</p>
					</div>
				) : (
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
						{menuItems.map(
							(item) => {
								const quantity =
									quantities[
										item.itemId
									] || 0;

								const isAdded =
									addedItems[
										item.itemId
									];

								const available =
									item.isAvailable;

								const name =
									item.itemName;

								return (
									<div
										key={
											item.itemId
										}
										className={`bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 ${
											!available
												? "opacity-75"
												: ""
										}`}
									>
										<div className="relative h-48 bg-gray-200">
											<Image
												src={
													item.imageUrl ||
													"/placeholder-food.jpg"
												}
												alt={
													name
												}
												fill
												className="object-cover"
												sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
											/>

											{!available && (
												<div className="absolute inset-0 bg-black/50 flex items-center justify-center">
													<span className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold">
														NOT
														AVAILABLE
													</span>
												</div>
											)}
										</div>

										<div className="p-4">
											<h3 className="text-lg font-semibold text-gray-900 mb-2">
												{
													name
												}
											</h3>

											<p className="text-gray-700 font-medium mb-3">
												₹
												{
													item.price
												}
											</p>

											<div className="flex items-center gap-3 mb-3">
												<button
													onClick={() =>
														handleQuantityChange(
															item.itemId,
															-1
														)
													}
													disabled={
														quantity ===
															0 ||
														!available
													}
													className="w-8 h-8 rounded-full bg-gray-200 text-black hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed flex items-center justify-center"
												>
													-
												</button>

												<span className="font-semibold text-gray-900 w-12 text-center text-lg">
													{
														quantity
													}
												</span>

												<button
													onClick={() =>
														handleQuantityChange(
															item.itemId,
															1
														)
													}
													disabled={
														!available
													}
													className="w-8 h-8 rounded-full bg-gray-200 text-black hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed flex items-center justify-center"
												>
													+
												</button>
											</div>

											<button
												onClick={() =>
													handleAddToCart(
														item
													)
												}
												disabled={
													(quantity ===
														0 &&
														!isAdded) ||
													!available
												}
												className={`w-full text-white font-semibold py-2 rounded-lg transition-colors duration-300 ${
													!available
														? "bg-gray-400 cursor-not-allowed"
														: isAdded
														? "bg-green-600"
														: quantity ===
														  0
														? "bg-gray-300 cursor-not-allowed"
														: "bg-green-500 hover:bg-green-600"
												}`}
											>
												{isAdded
													? "Added to Cart"
													: quantity ===
													  0
													? "Select Quantity"
													: `Add ${quantity} to Cart`}
											</button>

											{quantity >
												0 && (
												<p className="text-center text-sm text-gray-600 mt-2">
													Total:
													₹
													{item.price *
														quantity}
												</p>
											)}
										</div>
									</div>
								);
							}
						)}
					</div>
				)}
			</main>

			<footer className="bg-white border-t mt-16">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
					<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
						<div>
							<div className="flex items-center gap-2 mb-4">
								<span className="text-2xl">
									🍵
								</span>
							</div>

							<p className="text-sm text-gray-600">
								© 2026 Food
								Ordering.
								All rights
								reserved.
							</p>
						</div>

						<div>
							<h4 className="font-semibold text-gray-900 mb-4">
								About Us
							</h4>

							<ul className="space-y-2 text-sm text-gray-600">
								<li>
									Our Story
								</li>
								<li>
									Blog
								</li>
								<li>
									Careers
								</li>
							</ul>
						</div>

						<div>
							<h4 className="font-semibold text-gray-900 mb-4">
								Support
							</h4>

							<ul className="space-y-2 text-sm text-gray-600">
								<li>
									Help
									Center
								</li>
								<li>
									Contact
									Us
								</li>
								<li>
									FAQs
								</li>
							</ul>
						</div>

						<div>
							<h4 className="font-semibold text-gray-900 mb-4">
								Legal
							</h4>

							<ul className="space-y-2 text-sm text-gray-600">
								<li>
									Terms of
									Service
								</li>
								<li>
									Privacy
									Policy
								</li>
								<li>
									Cookie
									Policy
								</li>
							</ul>
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
}