import { PaginatedResult, PaginationOptions } from "../../utils/pagination.js";
import { CartDto, CreateCartDto } from "./cart.dto.js";
declare const _default: {
    createCart: (data: CreateCartDto) => Promise<CartDto>;
    getCartByUserId: (userId: string) => Promise<CartDto>;
    getAllCarts: (options: PaginationOptions) => Promise<PaginatedResult<CartDto>>;
};
export default _default;
//# sourceMappingURL=cart.service.d.ts.map