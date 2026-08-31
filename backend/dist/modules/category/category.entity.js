import { DataTypes, Model } from "sequelize";
import sequelize from "../../config/database.js";
class Category extends Model {
}
Category.init({
    categoryId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    categoryName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    categoryDescription: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    tableName: 'categories',
    timestamps: true,
});
export default Category;
//# sourceMappingURL=category.entity.js.map