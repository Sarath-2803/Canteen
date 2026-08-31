import { Model, DataTypes } from "sequelize";
import sequelize from '../../config/database.js';
class User extends Model {
}
// Initialize the model
User.init({
    userId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    firstName: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING(10),
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM('admin', 'customer'),
        allowNull: false,
        defaultValue: 'customer',
    }
}, {
    sequelize,
    tableName: 'users',
    timestamps: true,
});
export default User;
//# sourceMappingURL=user.entity.js.map