import { z } from 'zod';
const cartIdSchema = z.uuid();
const userIdSchema = z.uuid();
export const createCartSchema = z.object({
    userId: userIdSchema,
});
export const getCartByIdSchema = z.object({
    cartId: cartIdSchema
});
export const cartSchema = z.object({
    cartId: cartIdSchema,
    userId: userIdSchema
});
//# sourceMappingURL=cart.dto.js.map