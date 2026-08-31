import type { CreatePaymentDto, UpdatePaymentDto, PaymentDto } from './payment.dto.js';
import { PaymentStats } from './payment.repository.js';
import { PaginationOptions, PaginatedResult } from '../../utils/pagination.js';
declare const _default: {
    createRazorpayOrder: (amount: number, orderId: string) => Promise<{
        razorpayOrderId: string;
        amount: string | number;
        currency: string;
        keyId: string | undefined;
    }>;
    verifyPayment: (razorpayOrderId: string, razorpayPaymentId: string, razorpaySignature: string, userId: string, orderId: string) => Promise<PaymentDto>;
    failPayment: (paymentId: string, orderId: string) => Promise<void>;
    createPayment: (data: CreatePaymentDto) => Promise<PaymentDto>;
    getAllPayments: (options?: PaginationOptions) => Promise<PaginatedResult<PaymentDto>>;
    getPaymentById: (id: string) => Promise<PaymentDto>;
    getPaymentByOrderId: (orderId: string) => Promise<PaymentDto>;
    getPaymentsByUserId: (userId: string) => Promise<PaymentDto[]>;
    getPaymentsByStatus: (paymentStatus: string) => Promise<PaymentDto[]>;
    updatePayment: (id: string, data: UpdatePaymentDto) => Promise<PaymentDto>;
    updatePaymentStatus: (id: string, paymentStatus: string) => Promise<PaymentDto>;
    deletePayment: (id: string) => Promise<{
        message: string;
    }>;
    getPaymentStats: () => Promise<PaymentStats>;
};
export default _default;
//# sourceMappingURL=payment.service.d.ts.map