import { DataTypes, ENUM, Model } from "sequelize";
import sequelize from "../../config/database.js";
const PaymentMethod = ENUM("CREDIT_CARD", "UPI", "NET_BANKING");
const PaymentStatus = ENUM("PENDING", "COMPLETED", "FAILED");
class Payment extends Model {
}
Payment.init({
    paymentId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    orderId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    paymentMethod: {
        type: PaymentMethod,
        allowNull: false,
        defaultValue: "UPI"
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    paymentStatus: {
        type: PaymentStatus,
        allowNull: false,
        defaultValue: "PENDING"
    }, transactionId: {
        type: DataTypes.STRING,
        allowNull: true,
    }
}, {
    sequelize,
    modelName: "payments",
    timestamps: true,
});
export default Payment;
//# sourceMappingURL=payment.entity.js.map