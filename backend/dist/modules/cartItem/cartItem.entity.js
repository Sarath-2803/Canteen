import { DataTypes, Model } from "sequelize";
import sequelize from "../../config/database.js";
class CartItem extends Model {
}
CartItem.init({
    cartItemId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    cartId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    itemId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
}, {
    sequelize,
    tableName: 'cart_items',
    timestamps: true,
});
export default CartItem;
//# sourceMappingURL=cartItem.entity.js.map