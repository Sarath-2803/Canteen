import type { CreateOrderItemDto, UpdateOrderItemDto, OrderItemDto } from './orderItem.dto.js';
import type { PaginationOptions, PaginatedResult } from '../../utils/pagination.js';
declare const _default: {
    createOrderItem: (data: CreateOrderItemDto) => Promise<OrderItemDto>;
    getAllOrderItems: (options?: PaginationOptions) => Promise<PaginatedResult<OrderItemDto>>;
    getOrderItemById: (id: string) => Promise<OrderItemDto>;
    getOrderItemsByOrderId: (orderId: string) => Promise<OrderItemDto[]>;
    getOrderItemsByItemId: (itemId: string) => Promise<OrderItemDto[]>;
    updateOrderItem: (id: string, data: UpdateOrderItemDto) => Promise<OrderItemDto>;
    deleteOrderItem: (id: string) => Promise<{
        message: string;
    }>;
    deleteOrderItemsByOrderId: (orderId: string) => Promise<{
        message: string;
    }>;
};
export default _default;
//# sourceMappingURL=orderItem.service.d.ts.map