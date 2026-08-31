import { z } from 'zod';
export declare const paymentMethodEnum: z.ZodEnum<{
    CREDIT_CARD: "CREDIT_CARD";
    UPI: "UPI";
    NET_BANKING: "NET_BANKING";
}>;
export declare const paymentStatusEnum: z.ZodEnum<{
    PENDING: "PENDING";
    COMPLETED: "COMPLETED";
    FAILED: "FAILED";
}>;
export declare const createPaymentSchema: z.ZodObject<{
    orderId: z.ZodUUID;
    userId: z.ZodUUID;
    paymentMethod: z.ZodEnum<{
        CREDIT_CARD: "CREDIT_CARD";
        UPI: "UPI";
        NET_BANKING: "NET_BANKING";
    }>;
    transactionId: z.ZodString;
    amount: z.ZodNumber;
    paymentStatus: z.ZodDefault<z.ZodOptional<z.ZodEnum<{
        PENDING: "PENDING";
        COMPLETED: "COMPLETED";
        FAILED: "FAILED";
    }>>>;
}, z.core.$strip>;
export declare const updatePaymentSchema: z.ZodObject<{
    paymentMethod: z.ZodOptional<z.ZodEnum<{
        CREDIT_CARD: "CREDIT_CARD";
        UPI: "UPI";
        NET_BANKING: "NET_BANKING";
    }>>;
    amount: z.ZodOptional<z.ZodNumber>;
    paymentStatus: z.ZodOptional<z.ZodEnum<{
        PENDING: "PENDING";
        COMPLETED: "COMPLETED";
        FAILED: "FAILED";
    }>>;
}, z.core.$strip>;
export declare const paymentSchema: z.ZodObject<{
    paymentId: z.ZodUUID;
    orderId: z.ZodUUID;
    userId: z.ZodUUID;
    paymentMethod: z.ZodEnum<{
        CREDIT_CARD: "CREDIT_CARD";
        UPI: "UPI";
        NET_BANKING: "NET_BANKING";
    }>;
    amount: z.ZodNumber;
    paymentStatus: z.ZodEnum<{
        PENDING: "PENDING";
        COMPLETED: "COMPLETED";
        FAILED: "FAILED";
    }>;
    transactionId: z.ZodString;
    createdAt: z.ZodOptional<z.ZodCoercedDate<unknown>>;
    updatedAt: z.ZodOptional<z.ZodCoercedDate<unknown>>;
}, z.core.$strip>;
export type CreatePaymentDto = z.infer<typeof createPaymentSchema>;
export type UpdatePaymentDto = z.infer<typeof updatePaymentSchema>;
export type PaymentDto = z.infer<typeof paymentSchema>;
export type PaymentStatusEnum = z.infer<typeof paymentStatusEnum>;
//# sourceMappingURL=payment.dto.d.ts.map