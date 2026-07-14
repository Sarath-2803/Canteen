import api from '@/lib/api';
import { Order, OrderStatus, ApiResponse, PaginatedResponse } from '@/lib/types';

export const ordersService = {
  checkout: (userId: string, paymentMethod: string) =>
    api.post<ApiResponse<Order>>('/orders/checkout', { userId, paymentMethod }),

  getAll: () =>
    api.get<ApiResponse<PaginatedResponse<Order>>>('/orders'),

  getById: (id: string) =>
    api.get<ApiResponse<Order>>(`/orders/${id}`),

  getByUserId: (userId: string) =>
    api.get<ApiResponse<Order[]>>(`/orders/user/${userId}`),

  updateStatus: (id: string, status: OrderStatus) =>
    api.patch<ApiResponse<Order>>(`/orders/${id}/status`, { status }),

  delete: (id: string) =>
    api.delete<ApiResponse<void>>(`/orders/${id}`),
};
