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

			// console.log("user is", user);

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
				<section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-green-600 via-emerald-500 to-green-700 p-8 md:p-10 mb-10 text-white shadow-xl">

					<div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-white/10" />
					<div className="absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-white/10" />

					<div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">

						<div className="space-y-4">

							<div className="inline-flex items-center rounded-full bg-white/20 px-4 py-1 backdrop-blur">
								<span className="text-sm font-medium tracking-wide">
									🍴 Fresh • Fast • Affordable
								</span>
							</div>

							<h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
								Nosh<span className="text-yellow-300">&</span>Go
							</h1>

							<p className="max-w-xl text-lg text-green-100">
								Skip the queue and order your favourite meals in seconds.
								Freshly prepared food delivered right from your college canteen.
							</p>

						</div>

						{cartCount > 0 && (
							<button
								onClick={() => router.push("/checkout")}
								className="rounded-2xl bg-white text-green-700 font-semibold px-8 py-4 shadow-xl hover:scale-105 transition"
							>
								Proceed to Checkout • {cartCount} Items
							</button>
						)}

					</div>

				</section>

				{/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">

					<div className="rounded-2xl bg-white p-5 shadow">
						<p className="text-3xl font-bold text-green-600">
							{menuItems.length}
						</p>
						<p className="text-gray-500">
							Menu Items
						</p>
					</div>

					<div className="rounded-2xl bg-white p-5 shadow">
						<p className="text-3xl font-bold text-green-600">
							Fresh
						</p>
						<p className="text-gray-500">
							Everyday
						</p>
					</div>

					<div className="rounded-2xl bg-white p-5 shadow">
						<p className="text-3xl font-bold text-green-600">
							5★
						</p>
						<p className="text-gray-500">
							Student Rated
						</p>
					</div>

					<div className="rounded-2xl bg-white p-5 shadow">
						<p className="text-3xl font-bold text-green-600">
							Fast
						</p>
						<p className="text-gray-500">
							Checkout
						</p>
					</div>

				</div> */}

				{loading ? (
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

						{[...Array(6)].map((_, i) => (

							<div
								key={i}
								className="rounded-3xl overflow-hidden bg-white shadow animate-pulse"
							>

								<div className="h-52 bg-gray-200" />

								<div className="p-5 space-y-3">

									<div className="h-5 rounded bg-gray-200" />

									<div className="h-4 w-2/3 rounded bg-gray-200" />

									<div className="h-11 rounded-xl bg-gray-200" />

								</div>

							</div>

						))}

					</div>
				) : menuItems.length === 0 ? (
					<div className="bg-white rounded-3xl shadow p-16 text-center">

						<div className="text-7xl">
							🍽️
						</div>

						<h2 className="mt-6 text-3xl font-bold text-gray-900">
							Nothing Available
						</h2>

						<p className="mt-2 text-gray-500">
							The kitchen is preparing today&apos;s menu.
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
										className={`group overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${!available ? "opacity-80" : ""
											}`}
									>
										<div className="relative h-56 overflow-hidden">
											<Image
												src={
													item.imageUrl ||
													"/placeholder-food.jpg"
												}
												alt={
													name
												}
												fill
												className="object-cover transition duration-500 group-hover:scale-110"
												sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
											/>

											<div className="absolute right-4 top-4 rounded-full bg-white px-4 py-2 shadow-lg">

												<span className="font-bold text-green-600">
													₹{item.price}
												</span>

											</div>

											<div className="absolute left-4 top-4">

												<span
													className={`rounded-full px-3 py-1 text-xs font-semibold text-white

        ${available
															? "bg-green-500"
															: "bg-red-500"
														}`}
												>
													{available ? "Available" : "Unavailable"}
												</span>

											</div>
										</div>

										<div className="p-4">
											<h3 className="text-lg font-semibold text-gray-900 mb-2">
												{
													name
												}
											</h3>

											<p className="mt-2 text-sm text-gray-500 line-clamp-2">
												{item.itemDescription}
											</p>

											<div className="rounded-2xl bg-gray-50 px-4 py-3 flex justify-between items-center">
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
												className={`w-full text-white font-semibold py-2 rounded-lg transition-colors duration-300 ${!available
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
													<div className="mt-4 rounded-xl bg-green-50 px-4 py-3 flex justify-between">

														<span className="text-gray-600">
															Total
														</span>

														<span className="font-bold text-green-600">
															₹{item.price * quantity}
														</span>

													</div>
												)}
										</div>
									</div>
								);
							}
						)}
					</div>
				)}
			</main>

			<footer className="mt-20 border-t bg-white">

				<div className="max-w-7xl mx-auto px-6 py-12">

					<div className="flex flex-col md:flex-row justify-between gap-10">

						<div>

							<h2 className="text-2xl font-bold text-green-600">
								🍽 Nosh&Go
							</h2>

							<p className="mt-3 max-w-md text-gray-500">
								Skip the queue. Order instantly. Enjoy fresh meals prepared just for you.
							</p>

						</div>

						<div className="grid grid-cols-2 gap-10">

							<div>

								<h3 className="font-semibold text-gray-900">
									Company
								</h3>

								<div className="mt-3 space-y-2 text-gray-500">

									<p>About</p>
									<p>Contact</p>
									<p>Support</p>

								</div>

							</div>

							<div>

								<h3 className="font-semibold text-gray-900">
									Legal
								</h3>

								<div className="mt-3 space-y-2 text-gray-500">

									<p>Privacy</p>
									<p>Terms</p>
									<p>Cookies</p>

								</div>

							</div>

						</div>

					</div>

					<div className="mt-10 border-t pt-6 text-center text-sm text-gray-500">

						© 2026 Nosh&Go • Smart College Food Ordering Platform

					</div>

				</div>

			</footer>
		</div>
	);
}