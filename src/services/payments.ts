import api from '@/lib/api';
import { Payment, ApiResponse } from '@/lib/types';

export const paymentsService = {
  createOrder: (orderId: string, amount: number) =>
    api.post<ApiResponse<any>>('/payments/create-order', { orderId, amount }),

  verify: (payload: unknown) =>
    api.post<ApiResponse<Payment>>('/payments/verify', payload),

  getByOrderId: (orderId: string) =>
    api.get<ApiResponse<Payment>>(`/payments/order/${orderId}`),

  getAll: () =>
    api.get<ApiResponse<Payment[]>>('/payments'),
};
