import { CreationOptional, InferAttributes, InferCreationAttributes, Model } from "sequelize";
declare class CartItem extends Model<InferAttributes<CartItem>, InferCreationAttributes<CartItem>> {
    cartItemId: CreationOptional<string>;
    cartId: string;
    itemId: string;
    quantity: number;
}
export default CartItem;
//# sourceMappingURL=cartItem.entity.d.ts.map