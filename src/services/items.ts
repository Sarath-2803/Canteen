import api from '@/lib/api';
import { Item, ApiResponse, PaginatedResponse } from '@/lib/types';

export const itemsService = {
  getAll: () =>
    api.get<ApiResponse<PaginatedResponse<Item>>>('/items'),

  getById: (id: string) =>
    api.get<ApiResponse<Item>>(`/items/${id}`),

  create: (formData: FormData) =>
    api.post<ApiResponse<Item>>('/items', formData),

  update: (id: string, formData: FormData) =>
    api.put<ApiResponse<Item>>(`/items/${id}`, formData),

  delete: (id: string) =>
    api.delete<ApiResponse<void>>(`/items/${id}`),
};
