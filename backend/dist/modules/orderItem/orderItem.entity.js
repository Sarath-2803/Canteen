import { DataTypes, Model } from "sequelize";
import sequelize from "../../config/database.js";
class OrderItem extends Model {
}
OrderItem.init({
    orderItemId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    orderId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    itemId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    unitPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    subtotal: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        field: "subTotal"
    }
}, {
    sequelize,
    modelName: "order_items",
    timestamps: true,
});
export default OrderItem;
//# sourceMappingURL=orderItem.entity.js.map