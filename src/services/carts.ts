import api from '@/lib/api';
import { Cart, CartItem, ApiResponse } from '@/lib/types';

export const cartsService = {
  getByUserId: (userId: string) =>
    api.get<ApiResponse<Cart>>(`/cart/user/${userId}`),

  create: (userId: string) =>
    api.post<ApiResponse<Cart>>('/carts', { userId }),

  getItems: (cartId: string) =>
    api.get<ApiResponse<CartItem[]>>(`/cart-items/cart/${cartId}`),

  addItem: (cartId: string, itemId: string, quantity: number) =>
    api.post<ApiResponse<CartItem>>('/cart-items', { cartId, itemId, quantity }),

  updateItem: (cartItemId: string, quantity: number) =>
    api.put<ApiResponse<CartItem>>(`/cart-items/${cartItemId}`, { quantity }),

  removeItem: (cartItemId: string) =>
    api.delete<ApiResponse<void>>(`/cart-items/${cartItemId}`),
};
