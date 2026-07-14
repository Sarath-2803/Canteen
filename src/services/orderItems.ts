import api from '@/lib/api';
import { OrderItem, ApiResponse } from '@/lib/types';

export const orderItemsService = {
  getAll: () =>
    api.get<ApiResponse<OrderItem[]>>('/order-items'),

  getById: (id: string) =>
    api.get<ApiResponse<OrderItem>>(`/order-items/${id}`),

  getByOrderId: (orderId: string) =>
    api.get<ApiResponse<OrderItem[]>>(`/order-items/order/${orderId}`),

  create: (payload: Partial<OrderItem>) =>
    api.post<ApiResponse<OrderItem>>('/order-items', payload),

  update: (id: string, payload: Partial<OrderItem>) =>
    api.put<ApiResponse<OrderItem>>(`/order-items/${id}`, payload),

  delete: (id: string) =>
    api.delete<ApiResponse<void>>(`/order-items/${id}`),
};
