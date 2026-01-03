import OrderItem from '../models/OrderItem.js';
import Order from '../models/Order.js';

export const recalculateOrderTotal = async (
  orderId: string,
  transaction?: any
) => {
  const orderItems = await OrderItem.findAll({
    where: { orderId },
    transaction,
  });

  const totalAmount = orderItems.reduce(
    (sum, item) => sum + Number(item.subTotal),
    0
  );

  await Order.update(
    { totalAmount },
    { where: { id: orderId }, transaction }
  );
};
