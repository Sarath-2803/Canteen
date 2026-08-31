import { PaginatedResult, PaginationOptions } from "../../utils/pagination.js";
import { CartItemDTO, CreateCartItemDTO, UpdateCartItemDTO } from "./cartItem.dto.js";
declare const _default: {
    createCartItem: (data: CreateCartItemDTO) => Promise<CartItemDTO>;
    getCartItemById: (cartItemId: string) => Promise<CartItemDTO>;
    getCartItemsByCartId: (cartId: string) => Promise<CartItemDTO[]>;
    updateCartItem: (cartItemId: string, data: UpdateCartItemDTO) => Promise<CartItemDTO>;
    getAllCartItems: (options: PaginationOptions) => Promise<PaginatedResult<CartItemDTO>>;
    deleteCartItem: (cartItemId: string) => Promise<{
        message: string;
    }>;
};
export default _default;
//# sourceMappingURL=cartItem.service.d.ts.map