import { z } from 'zod';
export declare const createCartItemSchema: z.ZodObject<{
    cartId: z.ZodUUID;
    itemId: z.ZodUUID;
    quantity: z.ZodCoercedNumber<unknown>;
}, z.core.$strip>;
export declare const updateCartItemSchema: z.ZodObject<{
    cartId: z.ZodOptional<z.ZodUUID>;
    itemId: z.ZodOptional<z.ZodUUID>;
    quantity: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
}, z.core.$strip>;
declare const cartItemSchema: z.ZodObject<{
    cartItemId: z.ZodUUID;
    cartId: z.ZodUUID;
    itemId: z.ZodUUID;
    quantity: z.ZodCoercedNumber<unknown>;
}, z.core.$strip>;
export declare const getCartItemByCartIdSchema: z.ZodObject<{
    cartItemId: z.ZodUUID;
    itemId: z.ZodUUID;
    quantity: z.ZodCoercedNumber<unknown>;
}, z.core.$strip>;
export type CreateCartItemDTO = z.infer<typeof createCartItemSchema>;
export type UpdateCartItemDTO = z.infer<typeof updateCartItemSchema>;
export type CartItemDTO = z.infer<typeof cartItemSchema>;
export type CartItemByCartIdDTO = z.infer<typeof getCartItemByCartIdSchema>;
export {};
//# sourceMappingURL=cartItem.dto.d.ts.map