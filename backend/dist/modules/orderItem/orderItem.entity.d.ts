import { CreationOptional, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import Item from "../item/item.entity.js";
declare class OrderItem extends Model<InferAttributes<OrderItem>, InferCreationAttributes<OrderItem>> {
    orderItemId: CreationOptional<string>;
    orderId: string;
    itemId: string;
    quantity: number;
    unitPrice: number;
    subtotal: number;
    item?: Item;
}
export default OrderItem;
//# sourceMappingURL=orderItem.entity.d.ts.map