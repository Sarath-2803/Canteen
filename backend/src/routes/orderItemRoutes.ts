import { Router } from 'express';
import { OrderItemController } from '../controller/orderItemController.js';

const router = Router();

// Add item to order
router.post('/orders/:orderId/items', OrderItemController.addItem);

// Get all items of an order
router.get('/orders/:orderId/items', OrderItemController.getItems);

// Update order item
router.put('/order-items/:id', OrderItemController.updateItem);

// Delete single order item
router.delete('/order-items/:id', OrderItemController.deleteItem);

// Clear entire order
router.delete('/orders/:orderId/items', OrderItemController.clearOrder);

export default router;
