import { NotFoundError, ValidationError } from '../../utils/errors.js';
import orderRepository from './order.repository.js';
import cartRepository from '../cart/cart.repository.js';
import cartItemRepository from '../cartItem/cartItem.repository.js';
import sequelize from '../../config/database.js';
import orderItemRepository from '../orderItem/orderItem.repository.js';
import CartItem from '../cartItem/cartItem.entity.js';
import paymentService from '../payment/payment.service.js';
const toOrderDto = (order) => order.toJSON();
const checkout = async (userId, paymentMethod) => {
    // get cart for user
    const cart = await cartRepository.findByUserId(userId);
    if (!cart) {
        throw new NotFoundError('Cart not found for the given userId');
    }
    // get items from cart
    const cartItems = await cartItemRepository.findAllByCartIdWithItems(cart.cartId);
    if (cartItems.length === 0) {
        throw new NotFoundError('Cart is empty');
    }
    // Validate stock and availability of items
    for (const cartItem of cartItems) {
        const item = cartItem.item;
        if (!item)
            throw new NotFoundError(`Item not found`);
        if (!item.isAvailable)
            throw new ValidationError(`${item.itemName} is no longer available`);
        if (item.stockQuantity < cartItem.quantity) {
            throw new ValidationError(`Insufficient stock for ${item.itemName}. Available: ${item.stockQuantity}`);
        }
    }
    // calculate total
    const totalAmount = cartItems.reduce((sum, cartItem) => {
        const item = cartItem.item;
        return sum + item.price * cartItem.quantity;
    }, 0);
    // transaction
    const transaction = await sequelize.transaction();
    try {
        // a. create order
        const order = await orderRepository.create({ userId, totalAmount }, transaction);
        // b. create order items + deduct stock
        for (const cartItem of cartItems) {
            const item = cartItem.item;
            await orderItemRepository.create({
                orderId: order.orderId,
                itemId: cartItem.itemId,
                quantity: cartItem.quantity,
                unitPrice: item.price,
                subtotal: item.price * cartItem.quantity,
            }, transaction);
            // deduct stock
            // await item.update(
            //     { stockQuantity: item.stockQuantity - cartItem.quantity },
            //     { transaction }
            // );
        }
        // // c. create payment record
        // await paymentRepository.create({
        //     orderId: order.orderId,
        //     userId,
        //     amount: totalAmount,
        //     paymentMethod: paymentMethod as any,
        //     paymentStatus: 'PENDING',
        // }, transaction);
        // d. clear cart items
        await CartItem.destroy({ where: { cartId: cart.cartId }, transaction });
        // 6. create razorpay order (outside transaction — external API call)
        const razorpayOrder = await paymentService.createRazorpayOrder(totalAmount, order.orderId);
        await transaction.commit();
        return {
            orderId: order.orderId,
            razorpayOrderId: razorpayOrder.razorpayOrderId,
            amount: razorpayOrder.amount,
            currency: razorpayOrder.currency,
            keyId: process.env.RAZORPAY_KEY_ID,
        };
    }
    catch (error) {
        await transaction.rollback();
        throw error;
    }
};
// standard CRUD operations
/**
 * Create a new order
 */
const createOrder = async (data) => {
    const newOrder = await orderRepository.create(data);
    return toOrderDto(newOrder);
};
/**
 * Get all orders
 */
const getAllOrders = async (options) => {
    const orders = await orderRepository.findAll(options);
    return {
        ...orders,
        data: orders.data.map(toOrderDto)
    };
};
/**
 * Get order by ID
 */
const getOrderById = async (id) => {
    const order = await orderRepository.findById(id);
    if (!order) {
        throw new NotFoundError('Order not found');
    }
    return toOrderDto(order);
};
/**
 * Get orders by user ID
 */
const getOrdersByUserId = async (options, userId) => {
    const orders = await orderRepository.findAllByUserId(options, userId);
    return {
        ...orders,
        data: orders.data.map(toOrderDto)
    };
};
/**
 * Update order
 */
const updateOrder = async (id, data) => {
    const order = await orderRepository.update(id, data);
    if (!order) {
        throw new NotFoundError('Order not found');
    }
    return toOrderDto(order);
};
const updateOrderStatus = async (id, status) => {
    const order = await orderRepository.updateStatus(id, status);
    if (!order) {
        throw new NotFoundError('Order not found');
    }
    return toOrderDto(order);
};
/**
 * Delete order
 */
const deleteOrder = async (id) => {
    const order = await orderRepository.findById(id);
    if (!order) {
        throw new NotFoundError('Order not found');
    }
    await orderRepository.delete(id);
    return { message: 'Order deleted successfully' };
};
export default {
    checkout,
    createOrder,
    getAllOrders,
    getOrderById,
    getOrdersByUserId,
    updateOrder,
    updateOrderStatus,
    deleteOrder,
};
//# sourceMappingURL=order.service.js.map