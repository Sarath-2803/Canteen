import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
declare const PaymentMethod: DataTypes.EnumDataType<"CREDIT_CARD" | "UPI" | "NET_BANKING">;
declare const PaymentStatus: DataTypes.EnumDataType<"PENDING" | "COMPLETED" | "FAILED">;
declare class Payment extends Model<InferAttributes<Payment>, InferCreationAttributes<Payment>> {
    paymentId: CreationOptional<string>;
    orderId: string;
    userId: string;
    paymentMethod: typeof PaymentMethod;
    amount: number;
    paymentStatus: typeof PaymentStatus;
    transactionId: string | null;
}
export default Payment;
//# sourceMappingURL=payment.entity.d.ts.map