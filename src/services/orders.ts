import api from '@/lib/api';
import { Order, OrderStatus, ApiResponse, PaginatedResponse } from '@/lib/types';

export const ordersService = {
  checkout: (userId: string, paymentMethod: string) =>
    api.post<ApiResponse<Order>>('/orders/checkout', { userId, paymentMethod }),

  getAll(page = 1, limit = 10) {
  return api.get<ApiResponse<PaginatedResponse<Order>>>(
    `/orders?page=${page}&limit=${limit}`
  );
},

  getById: (id: string) =>
    api.get<ApiResponse<Order>>(`/orders/${id}`),

  getByUserId: (userId: string, page: number = 1, limit: number = 10) =>
    api.get<ApiResponse<PaginatedResponse<Order>>>(`/orders/user/${userId}?page=${page}&limit=${limit}`),

  updateStatus(orderId: string, status: OrderStatus) {
  return api.patch<ApiResponse<Order>>(
    `/orders/${orderId}/status`,
    { status }
  );
},

  delete: (id: string) =>
    api.delete<ApiResponse<void>>(`/orders/${id}`),
};
