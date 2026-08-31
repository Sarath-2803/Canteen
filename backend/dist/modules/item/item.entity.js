import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/database.js';
class Item extends Model {
}
// Initialize the model
Item.init({
    itemId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    categoryId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    itemName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    itemDescription: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        get() {
            const value = this.getDataValue('price');
            return value ? parseFloat(value) : value;
        },
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    stockQuantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    isAvailable: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    }
}, {
    sequelize,
    tableName: 'items',
    timestamps: true,
});
export default Item;
//# sourceMappingURL=item.entity.js.map