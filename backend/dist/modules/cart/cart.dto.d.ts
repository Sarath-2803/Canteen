import { z } from 'zod';
export declare const createCartSchema: z.ZodObject<{
    userId: z.ZodUUID;
}, z.core.$strip>;
export declare const getCartByIdSchema: z.ZodObject<{
    cartId: z.ZodUUID;
}, z.core.$strip>;
export declare const cartSchema: z.ZodObject<{
    cartId: z.ZodUUID;
    userId: z.ZodUUID;
}, z.core.$strip>;
export type CreateCartDto = z.infer<typeof createCartSchema>;
export type CartByIdDto = z.infer<typeof getCartByIdSchema>;
export type CartDto = z.infer<typeof cartSchema>;
//# sourceMappingURL=cart.dto.d.ts.map