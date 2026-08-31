import { Transaction } from "sequelize";
import { CreatePaymentDto, UpdatePaymentDto } from "./payment.dto.js";
import Payment from "./payment.entity.js";
import { PaginationOptions, PaginatedResult } from "../../utils/pagination.js";
export interface PaymentStats {
    totalPayments: number;
    completedPayments: number;
    pendingPayments: number;
    failedPayments: number;
    totalAmount: number;
    completedAmount: number;
}
declare class PaymentRepository {
    create(data: CreatePaymentDto, transaction?: Transaction): Promise<Payment>;
    findById(paymentId: string, transaction?: Transaction): Promise<Payment | null>;
    findByOrderId(orderId: string, transaction?: Transaction): Promise<Payment | null>;
    findAllByUserId(userId: string, transaction?: Transaction): Promise<Payment[]>;
    findAllByStatus(paymentStatus: string, transaction?: Transaction): Promise<Payment[]>;
    findAll(options?: PaginationOptions): Promise<PaginatedResult<Payment>>;
    update(paymentId: string, data: UpdatePaymentDto, transaction?: Transaction): Promise<Payment | null>;
    delete(paymentId: string, transaction?: Transaction): Promise<boolean>;
    getStats(): Promise<PaymentStats>;
}
declare const _default: PaymentRepository;
export default _default;
//# sourceMappingURL=payment.repository.d.ts.map