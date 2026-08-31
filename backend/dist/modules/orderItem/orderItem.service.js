import { NotFoundError } from '../../utils/errors.js';
import orderItemRepository from './orderItem.repository.js';
const toOrderItemDto = (orderItem) => orderItem.toJSON();
/**
 * Create a new order item
 */
const createOrderItem = async (data) => {
    const newOrderItem = await orderItemRepository.create(data);
    return toOrderItemDto(newOrderItem);
};
/**
 * Get all order items - optional filtering by orderId
 */
const getAllOrderItems = async (options = {}) => {
    const result = await orderItemRepository.findAll(options);
    return { ...result, data: result.data.map(toOrderItemDto) };
};
/**
 * Get order item by ID
 */
const getOrderItemById = async (id) => {
    const orderItem = await orderItemRepository.findById(id);
    if (!orderItem) {
        throw new NotFoundError('Order item not found');
    }
    return toOrderItemDto(orderItem);
};
/**
 * Get order items by order ID
 */
const getOrderItemsByOrderId = async (orderId) => {
    const orderItems = await orderItemRepository.findAllByOrderId(orderId);
    return orderItems.map((orderItem) => ({
        ...orderItem.toJSON(),
        itemName: orderItem.item?.itemName ?? "Unknown Item"
    }));
};
/**
 * Get order items by item ID
 */
const getOrderItemsByItemId = async (itemId) => {
    const orderItems = await orderItemRepository.findAllByItemId(itemId);
    return orderItems.map(toOrderItemDto);
};
/**
 * Update order item
 */
const updateOrderItem = async (id, data) => {
    const updatedOrderItem = await orderItemRepository.update(id, data);
    if (!updatedOrderItem) {
        throw new NotFoundError('Order item not found');
    }
    return toOrderItemDto(updatedOrderItem);
};
/**
 * Delete order item
 */
const deleteOrderItem = async (id) => {
    const orderItem = await orderItemRepository.findById(id);
    if (!orderItem) {
        throw new NotFoundError('Order item not found');
    }
    await orderItemRepository.delete(id);
    return { message: 'Order item deleted successfully' };
};
/**
 * Delete all order items for an order
 */
const deleteOrderItemsByOrderId = async (orderId) => {
    await orderItemRepository.deleteByOrderId(orderId);
    return { message: 'Order items deleted successfully' };
};
export default {
    createOrderItem,
    getAllOrderItems,
    getOrderItemById,
    getOrderItemsByOrderId,
    getOrderItemsByItemId,
    updateOrderItem,
    deleteOrderItem,
    deleteOrderItemsByOrderId,
};
//# sourceMappingURL=orderItem.service.js.map