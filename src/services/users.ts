import api from '@/lib/api';
import { User, ApiResponse } from '@/lib/types';

export const usersService = {
  signIn: (email: string, password: string) =>
    api.post<ApiResponse<{token:string;user:User}>>('/users/signin', { email, password }),

  signUp: (data: Omit<User,'userId'> & { password: string }) =>
    api.post<ApiResponse<{token:string;user:User}>>('/users/signup', data),

  getAll: () =>
    api.get<ApiResponse<User[]>>('/users'),

  getCustomers: () =>
    api.get<ApiResponse<User[]>>('/users/customers'),
};
