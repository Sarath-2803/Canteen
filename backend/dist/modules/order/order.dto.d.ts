import { z } from 'zod';
export declare const orderStatusEnum: z.ZodEnum<{
    PENDING: "PENDING";
    CONFIRMED: "CONFIRMED";
    CANCELLED: "CANCELLED";
}>;
export declare const createOrderSchema: z.ZodObject<{
    userId: z.ZodUUID;
    totalAmount: z.ZodNumber;
    placedAt: z.ZodOptional<z.ZodCoercedDate<unknown>>;
}, z.core.$strip>;
export declare const updateOrderSchema: z.ZodObject<{
    totalAmount: z.ZodOptional<z.ZodNumber>;
    placedAt: z.ZodOptional<z.ZodCoercedDate<unknown>>;
}, z.core.$strip>;
export declare const orderSchema: z.ZodObject<{
    orderId: z.ZodUUID;
    userId: z.ZodUUID;
    totalAmount: z.ZodNumber;
    placedAt: z.ZodCoercedDate<unknown>;
    createdAt: z.ZodOptional<z.ZodCoercedDate<unknown>>;
    updatedAt: z.ZodOptional<z.ZodCoercedDate<unknown>>;
}, z.core.$strip>;
export type CreateOrderDto = z.infer<typeof createOrderSchema>;
export type UpdateOrderDto = z.infer<typeof updateOrderSchema>;
export type OrderDto = z.infer<typeof orderSchema>;
export type OrderStatus = z.infer<typeof orderStatusEnum>;
//# sourceMappingURL=order.dto.d.ts.map