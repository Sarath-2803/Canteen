import { CreationOptional, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { OrderStatus } from "./order.dto.js";
declare class Order extends Model<InferAttributes<Order>, InferCreationAttributes<Order>> {
    orderId: CreationOptional<string>;
    userId: string;
    totalAmount: number;
    placedAt: Date;
    status: CreationOptional<OrderStatus>;
}
export default Order;
//# sourceMappingURL=order.entity.d.ts.map