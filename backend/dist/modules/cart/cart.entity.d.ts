import { CreationOptional, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
declare class Cart extends Model<InferAttributes<Cart>, InferCreationAttributes<Cart>> {
    cartId: CreationOptional<string>;
    userId: string;
}
export default Cart;
//# sourceMappingURL=cart.entity.d.ts.map