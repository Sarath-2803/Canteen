import api from "@/lib/api";
import {
  ApiResponse,
  Payment,
  RazorpayOrderResponse,
  VerifyPaymentRequest,
} from "@/lib/types";

export const paymentsService = {
  createOrder: (
    orderId: string,
    amount: number
  ) =>
    api.post<ApiResponse<RazorpayOrderResponse>>(
      "/payments/create-order",
      {
        amount,
        orderId,
      }
    ),

  verify: (
    payload: VerifyPaymentRequest
  ) =>
    api.post<ApiResponse<Payment>>(
      "/payments/verify",
      payload
    ),

  getByOrderId: (
    orderId: string
  ) =>
    api.get<ApiResponse<Payment>>(
      `/payments/order/${orderId}`
    ),

  getAll: () =>
    api.get<ApiResponse<Payment[]>>(
      "/payments"
    ),
};