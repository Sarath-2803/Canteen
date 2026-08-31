import { Transaction } from "sequelize";
import { CreateCartItemDTO, UpdateCartItemDTO } from "./cartItem.dto.js";
import CartItem from "./cartItem.entity.js";
import { PaginatedResult, PaginationOptions } from "../../utils/pagination.js";
declare class CartItemRepository {
    create(data: CreateCartItemDTO, transaction?: Transaction): Promise<CartItem>;
    findAllByCartId(cartId: string): Promise<CartItem[]>;
    findAllByCartIdWithItems(cartId: string): Promise<CartItem[]>;
    findByCartIdAndItemId(cartId: string, itemId: string): Promise<CartItem | null>;
    findById(cartItemId: string): Promise<CartItem | null>;
    findAll(options: PaginationOptions): Promise<PaginatedResult<CartItem>>;
    update(cartItemId: string, data: UpdateCartItemDTO, transaction?: Transaction): Promise<CartItem | null>;
    delete(cartItemId: string, transaction?: Transaction): Promise<boolean>;
}
declare const _default: CartItemRepository;
export default _default;
//# sourceMappingURL=cartItem.repository.d.ts.map