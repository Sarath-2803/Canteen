import { DataTypes, Model } from "sequelize";
import sequelize from "../../config/database.js";
class Order extends Model {
}
Order.init({
    orderId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    totalAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    placedAt: {
        type: DataTypes.DATE,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('PENDING', 'CONFIRMED', 'CANCELLED'),
        allowNull: false,
        defaultValue: 'PENDING'
    }
}, {
    sequelize,
    modelName: "orders",
    timestamps: true,
});
export default Order;
//# sourceMappingURL=order.entity.js.map