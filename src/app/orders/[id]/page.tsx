"use client";

import {
	useCallback,
	useEffect,
	useState,
} from "react";

import {
	useParams,
	useRouter,
	useSearchParams,
} from "next/navigation";

import Header from "@/components/Header";

import {
	OrderItem,
} from "@/lib/types";

import {
	orderItemsService,
} from "@/services/orderItems";


export default function OrderDetailsPage() {

	const router = useRouter();

	const params =
		useParams<{ id: string }>();

	const searchParams =
		useSearchParams();


	const orderId = params.id;


	const paymentSuccess =
		searchParams.get("payment") === "success";


	const [
		orderItems,
		setOrderItems
	] = useState<OrderItem[]>([]);


	const [
		loading,
		setLoading
	] = useState(true);



	const loadOrder =
		useCallback(async () => {

			try {

				setLoading(true);

				const response =
					await orderItemsService.getByOrderId(
						orderId
					);


				setOrderItems(
					response.data
				);


			} catch(error) {

				console.error(
					"Failed to fetch order items:",
					error
				);

			} finally {

				setLoading(false);

			}

		},[orderId]);



	useEffect(() => {

		if(orderId) {
			loadOrder();
		}

	},[
		orderId,
		loadOrder
	]);



	const totalAmount =
		orderItems.reduce(
			(sum,item)=>
				sum + Number(item.subtotal),
			0
		);



	const downloadReceipt = () => {


		const content = `

ORDER RECEIPT

Order ID:
${orderId}


Items:

${orderItems
	.map(
		item =>
`${item.itemName} x${item.quantity} = ₹${item.subtotal}`
	)
	.join("\n")}


Total:
₹${totalAmount}


Thank you for your order.

`;



		const blob =
			new Blob(
				[
					content
				],
				{
					type:"text/plain"
				}
			);



		const url =
			URL.createObjectURL(
				blob
			);



		const link =
			document.createElement(
				"a"
			);


		link.href=url;

		link.download =
			`receipt-${orderId}.txt`;


		document.body.appendChild(
			link
		);


		link.click();


		document.body.removeChild(
			link
		);


		URL.revokeObjectURL(
			url
		);

	};



	if(loading) {

		return (
			<div className="min-h-screen bg-gray-50">

				<Header />

				<div className="flex justify-center py-20">
					Loading order...
				</div>

			</div>
		);

	}



	if(orderItems.length===0) {

		return (

			<div className="min-h-screen bg-gray-50">

				<Header />

				<main className="max-w-2xl mx-auto px-4 py-8">

					<p className="text-center text-gray-600">
						Order not found
					</p>


					<button
						onClick={()=>
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


				{
					paymentSuccess && (

						<div className="bg-green-100 border border-green-300 text-green-700 p-4 rounded mb-6">

							Payment successful!

						</div>

					)

				}



				<div className="bg-white rounded-lg shadow p-6">


					<h1 className="text-2xl font-bold mb-6 text-gray-900">
						Order #{orderId}
					</h1>



					<h2 className="text-xl font-semibold mb-4 text-gray-900">
						Items
					</h2>



					<div className="space-y-3">

						{
							orderItems.map(
								item=>(

									<div
										key={
											item.itemId
										}
										className="flex justify-between bg-gray-50 p-3 rounded"
									>

										<div>

											<p className="font-medium text-gray-800">
												{item.itemName}
											</p>


											<p className="text-sm text-gray-500">
												Qty: {item.quantity}
											</p>

										</div>



										<p className="font-semibold text-gray-900">

											₹{item.subtotal}

										</p>


									</div>

								)
							)
						}

					</div>



					<div className="border-t mt-6 pt-4">

						<p className="text-xl font-bold text-gray-900">
							Total: ₹{totalAmount}
						</p>

					</div>




					<div className="mt-8 flex gap-2">


						<button
							onClick={()=>
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


					</div>


				</div>


			</main>


		</div>

	);

}