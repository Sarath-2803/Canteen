import { CreateOrderItemDto, UpdateOrderItemDto } from "./orderItem.dto.js";
import OrderItem from "./orderItem.entity.js";
import { Transaction } from "sequelize";
import { PaginationOptions, PaginatedResult } from "../../utils/pagination.js";
declare class OrderItemRepository {
    create(data: CreateOrderItemDto, transaction?: Transaction): Promise<OrderItem>;
    findAll(options?: PaginationOptions): Promise<PaginatedResult<OrderItem>>;
    findById(id: string): Promise<OrderItem | null>;
    findAllByOrderId(orderId: string): Promise<OrderItem[]>;
    findAllByItemId(itemId: string): Promise<OrderItem[]>;
    update(orderItemId: string, data: UpdateOrderItemDto, transaction?: Transaction): Promise<OrderItem | null>;
    delete(orderItemId: string, transaction?: Transaction): Promise<boolean>;
    deleteByOrderId(orderId: string, transaction?: Transaction): Promise<boolean>;
}
declare const _default: OrderItemRepository;
export default _default;
//# sourceMappingURL=orderItem.repository.d.ts.map