import { CreationOptional, InferAttributes, InferCreationAttributes, Model } from "sequelize";
declare class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    userId: CreationOptional<string>;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    role: 'admin' | 'customer';
}
export default User;
//# sourceMappingURL=user.entity.d.ts.map