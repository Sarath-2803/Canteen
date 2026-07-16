import { RazorpayPaymentSuccessResponse } from "@/lib/types";

declare global {
	interface Window {
		Razorpay: new (options: {
			key: string;
			amount: number;
			currency: string;
			order_id: string;
			name?: string;
			description?: string;
			handler: (
				response: RazorpayPaymentSuccessResponse
			) => void | Promise<void>;
			prefill?: {
				name?: string;
				email?: string;
				contact?: string;
			};
			theme?: {
				color?: string;
			};
		}) => {
			open(): void;
		};
	}
}

export {};