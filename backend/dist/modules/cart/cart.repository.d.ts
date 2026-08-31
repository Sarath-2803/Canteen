import { PaginatedResult, PaginationOptions } from "../../utils/pagination.js";
import { CreateCartDto } from "./cart.dto.js";
import Cart from "./cart.entity.js";
import { Transaction } from "sequelize";
declare class CartRepository {
    create(data: CreateCartDto, transaction?: Transaction): Promise<Cart | null>;
    findByUserId(userId: string): Promise<Cart | null>;
    findAll(options: PaginationOptions): Promise<PaginatedResult<Cart>>;
}
declare const _default: CartRepository;
export default _default;
//# sourceMappingURL=cart.repository.d.ts.map