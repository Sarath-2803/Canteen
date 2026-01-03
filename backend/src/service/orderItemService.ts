import sequelize from '../config/database.js';
import OrderItem from '../models/OrderItem.js';
import Item from '../models/Item.js';
import { recalculateOrderTotal } from '../utils/recalculateOrderTotal.js';

export class OrderItemService {

  // ADD ITEM TO ORDER
  static async addItem(orderId: string, itemId: string, quantity: number) {
    return sequelize.transaction(async (t) => {

      if (quantity <= 0) {
        throw new Error('Quantity must be greater than zero');
      }

      const item = await Item.findByPk(itemId, { transaction: t });
      if (!item) throw new Error('Item not found');

      const price = Number(item.price);

      const existingItem = await OrderItem.findOne({
        where: { orderId, itemId },
        transaction: t,
      });

      let orderItem;

      if (existingItem) {
        const newQuantity = existingItem.quantity + quantity;
        const subTotal = newQuantity * price;

        orderItem = await existingItem.update(
          {
            quantity: newQuantity,
            price,
            subTotal,
          },
          { transaction: t }
        );
      } else {
        orderItem = await OrderItem.create(
          {
            orderId,
            itemId,
            quantity,
            price,
            subTotal: price * quantity,
          },
          { transaction: t }
        );
      }

      await recalculateOrderTotal(orderId, t);
      return orderItem;
    });
  }

  // GET ALL ITEMS OF AN ORDER
  static async getItemsByOrder(orderId: string) {
    return OrderItem.findAll({
      where: { orderId },
      include: ['Item'],
    });
  }

  // UPDATE ORDER ITEM
  static async updateItem(
    orderItemId: string,
    quantity: number,
    price?: number
  ) {
    return sequelize.transaction(async (t) => {

      const orderItem = await OrderItem.findByPk(orderItemId, {
        transaction: t,
      });

      if (!orderItem) {
        throw new Error('Order item not found');
      }

      if (quantity <= 0) {
        throw new Error('Quantity must be greater than zero');
      }

      const finalPrice = price ?? Number(orderItem.price);
      const subTotal = finalPrice * quantity;

      await orderItem.update(
        {
          quantity,
          price: finalPrice,
          subTotal,
        },
        { transaction: t }
      );

      await recalculateOrderTotal(orderItem.orderId, t);
      return orderItem;
    });
  }

  // DELETE SINGLE ORDER ITEM
  static async deleteItem(orderItemId: string) {
    return sequelize.transaction(async (t) => {

      const orderItem = await OrderItem.findByPk(orderItemId, {
        transaction: t,
      });

      if (!orderItem) {
        throw new Error('Order item not found');
      }

      const orderId = orderItem.orderId;
      await orderItem.destroy({ transaction: t });

      await recalculateOrderTotal(orderId, t);
    });
  }

  // CLEAR ALL ITEMS FROM ORDER
  static async clearOrder(orderId: string) {
    return sequelize.transaction(async (t) => {

      await OrderItem.destroy({
        where: { orderId },
        transaction: t,
      });

      await recalculateOrderTotal(orderId, t);
    });
  }
}