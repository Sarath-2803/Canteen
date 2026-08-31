import { z } from 'zod';
const orderIdSchema = z.uuid('Invalid order ID format');
const userIdSchema = z.uuid('Invalid user ID format');
const totalAmountSchema = z.number().min(0, 'Total amount must be a positive number');
const placedAtSchema = z.coerce.date();
export const orderStatusEnum = z.enum(['PENDING', 'CONFIRMED', 'CANCELLED']);
export const createOrderSchema = z.object({
    userId: userIdSchema,
    totalAmount: totalAmountSchema,
    placedAt: placedAtSchema.optional(),
});
export const updateOrderSchema = z.object({
    totalAmount: totalAmountSchema.optional(),
    placedAt: placedAtSchema.optional(),
});
export const orderSchema = z.object({
    orderId: orderIdSchema,
    userId: userIdSchema,
    totalAmount: totalAmountSchema,
    placedAt: placedAtSchema,
    createdAt: placedAtSchema.optional(),
    updatedAt: placedAtSchema.optional(),
});
//# sourceMappingURL=order.dto.js.map