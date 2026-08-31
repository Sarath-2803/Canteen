import { z } from 'zod';
export declare const createOrderItemSchema: z.ZodObject<{
    orderId: z.ZodUUID;
    itemId: z.ZodUUID;
    quantity: z.ZodNumber;
    unitPrice: z.ZodNumber;
    subtotal: z.ZodNumber;
}, z.core.$strip>;
export declare const updateOrderItemSchema: z.ZodObject<{
    quantity: z.ZodOptional<z.ZodNumber>;
    unitPrice: z.ZodOptional<z.ZodNumber>;
    subtotal: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
export declare const orderItemSchema: z.ZodObject<{
    orderItemId: z.ZodUUID;
    orderId: z.ZodUUID;
    itemId: z.ZodUUID;
    quantity: z.ZodNumber;
    unitPrice: z.ZodNumber;
    subtotal: z.ZodNumber;
    createdAt: z.ZodOptional<z.ZodCoercedDate<unknown>>;
    updatedAt: z.ZodOptional<z.ZodCoercedDate<unknown>>;
}, z.core.$strip>;
export type CreateOrderItemDto = z.infer<typeof createOrderItemSchema>;
export type UpdateOrderItemDto = z.infer<typeof updateOrderItemSchema>;
export type OrderItemDto = z.infer<typeof orderItemSchema>;
//# sourceMappingURL=orderItem.dto.d.ts.map