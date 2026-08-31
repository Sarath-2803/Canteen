import { CreateOrderDto, UpdateOrderDto } from "./order.dto.js";
import Order from "./order.entity.js";
import { Transaction } from "sequelize";
import { PaginationOptions, PaginatedResult } from "../../utils/pagination.js";
declare class OrderRepository {
    create(data: CreateOrderDto, transaction?: Transaction): Promise<Order>;
    findAll(options?: PaginationOptions): Promise<PaginatedResult<Order>>;
    findById(id: string): Promise<Order | null>;
    findAllByUserId(options: PaginationOptions, userId: string): Promise<PaginatedResult<Order>>;
    update(orderId: string, data: UpdateOrderDto, transaction?: Transaction): Promise<Order | null>;
    updateStatus(orderId: string, status: string, transaction?: Transaction): Promise<Order | null>;
    delete(orderId: string, transaction?: Transaction): Promise<boolean>;
}
declare const _default: OrderRepository;
export default _default;
//# sourceMappingURL=order.repository.d.ts.map