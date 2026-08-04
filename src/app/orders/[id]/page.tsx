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


			<main className="mx-auto max-w-5xl px-4 py-8">

  {paymentSuccess && (
    <div className="mb-8 rounded-2xl border border-green-200 bg-green-50 p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-600 text-white text-xl">
          ✓
        </div>

        <div>
          <h2 className="text-lg font-semibold text-green-800">
            Payment Successful
          </h2>

          <p className="text-sm text-green-700">
            Your order has been placed successfully.
          </p>
        </div>
      </div>
    </div>
  )}

  <div className="rounded-3xl bg-white shadow-lg overflow-hidden">

    {/* Header */}

    <div className="border-b bg-gradient-to-r from-green-600 to-green-500 px-8 py-8 text-white">

      <p className="text-sm uppercase tracking-wider opacity-80">
        Order Details
      </p>

      <h1 className="mt-2 text-3xl font-bold">
        #{orderId}
      </h1>

    </div>

    {/* Items */}

    <div className="p-8">

      <h2 className="mb-6 text-xl font-bold text-gray-900">
        Ordered Items
      </h2>

      <div className="space-y-4">

        {orderItems.map((item) => (

          <div
            key={item.itemId}
            className="flex items-center justify-between rounded-2xl border border-gray-200 p-5 hover:shadow-md transition"
          >

            <div>

              <h3 className="text-lg font-semibold text-gray-900">
                {item.itemName}
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Quantity: {item.quantity}
              </p>

              <p className="mt-1 text-sm text-gray-500">
                ₹{item.unitPrice} each
              </p>

            </div>

            <div className="text-right">

              <p className="text-sm text-gray-500">
                Subtotal
              </p>

              <p className="text-2xl font-bold text-green-600">
                ₹{item.subtotal}
              </p>

            </div>

          </div>

        ))}

      </div>

      {/* Total */}

      <div className="mt-10 rounded-2xl bg-gray-50 p-6">

        <div className="flex items-center justify-between">

          <div>

            <p className="text-gray-600">
              Total Amount
            </p>

            <h2 className="mt-1 text-3xl font-bold text-gray-900">
              ₹{totalAmount}
            </h2>

          </div>

        </div>

      </div>

      {/* Buttons */}

      <div className="mt-8 flex flex-col gap-4 sm:flex-row">

        <button
          onClick={() => router.push("/user/orders")}
          className="flex-1 rounded-xl bg-gray-200 py-3 font-semibold text-gray-800 transition hover:bg-gray-300"
        >
          Back to Orders
        </button>

        <button
          onClick={downloadReceipt}
          className="flex-1 rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          Download Receipt
        </button>

      </div>

    </div>

  </div>

</main>


		</div>

	);

}