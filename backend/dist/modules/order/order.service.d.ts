import type { CreateOrderDto, UpdateOrderDto, OrderDto } from './order.dto.js';
import { PaginationOptions, PaginatedResult } from '../../utils/pagination.js';
export interface CheckoutResult {
    orderId: string;
    razorpayOrderId: string;
    amount: number;
    currency: string;
    keyId: string | undefined;
}
declare const _default: {
    checkout: (userId: string, paymentMethod: string) => Promise<CheckoutResult>;
    createOrder: (data: CreateOrderDto) => Promise<OrderDto>;
    getAllOrders: (options: PaginationOptions) => Promise<PaginatedResult<OrderDto>>;
    getOrderById: (id: string) => Promise<OrderDto>;
    getOrdersByUserId: (options: PaginationOptions, userId: string) => Promise<PaginatedResult<OrderDto>>;
    updateOrder: (id: string, data: UpdateOrderDto) => Promise<OrderDto>;
    updateOrderStatus: (id: string, status: string) => Promise<OrderDto>;
    deleteOrder: (id: string) => Promise<{
        message: string;
    }>;
};
export default _default;
//# sourceMappingURL=order.service.d.ts.map