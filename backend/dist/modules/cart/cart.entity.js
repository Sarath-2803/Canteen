import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/database.js';
class Cart extends Model {
}
Cart.init({
    cartId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
    }
}, {
    sequelize,
    tableName: 'carts',
    timestamps: true,
});
export default Cart;
//# sourceMappingURL=cart.entity.js.map