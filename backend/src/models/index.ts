import User from "./User.js";
import Item from "./Item.js";
import Order from "./Order.js";
import OrderItem from "./OrderItem.js";
import Payment from "./Payment.js";

// Define associations
Order.hasOne(Payment, {
  foreignKey: 'orderId',
  as: 'payment',
});

Payment.belongsTo(Order, {
  foreignKey: 'orderId',
  as: 'order',
});

Order.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
});

User.hasMany(Order, {
  foreignKey: 'userId',
  as: 'orders',
});

Order.hasMany(OrderItem, {
  foreignKey: 'orderId',
  as: 'orderItems',
});

OrderItem.belongsTo(Order, {
  foreignKey: 'orderId',
});

Item.hasMany(OrderItem, {
  foreignKey: 'itemId',
});

OrderItem.belongsTo(Item, {
  foreignKey: 'itemId',
});

// Export all models
export {
  User,
  Item,
  Order,
  OrderItem,
  Payment,
};