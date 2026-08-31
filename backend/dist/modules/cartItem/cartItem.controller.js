import { asyncHandler } from '../../middleware/errorHandler.js';
import { ValidationError } from '../../utils/errors.js';
import { validate } from '../../utils/validate.js';
import { createCartItemSchema, updateCartItemSchema } from './cartItem.dto.js';
import cartItemService from './cartItem.service.js';
// create cart item
const createCartItem = asyncHandler(async (req, res) => {
    console.log('Received request to create cart item with body:', req.body);
    const payload = validate(createCartItemSchema, req.body);
    // console.log('Creating cart item with payload:', payload);
    const cartItem = await cartItemService.createCartItem(payload);
    res.status(201).json({
        success: true,
        message: 'Cart item created successfully',
        data: cartItem,
    });
});
// get cart item by ID
const getCartItemById = asyncHandler(async (req, res) => {
    const { cartItemId } = req.params;
    const cartItem = await cartItemService.getCartItemById(cartItemId);
    res.status(200).json({
        success: true,
        message: 'Cart item retrieved successfully',
        data: cartItem,
    });
});
// get cart items by cartId
const getCartItemsByCartId = asyncHandler(async (req, res) => {
    const { cartId } = req.params;
    if (!cartId) {
        throw new ValidationError('Cart ID is required');
    }
    const cartItems = await cartItemService.getCartItemsByCartId(cartId);
    res.status(200).json({
        success: true,
        message: 'Cart items retrieved successfully',
        data: cartItems,
    });
});
// update cart item
const updateCartItem = asyncHandler(async (req, res) => {
    const { cartItemId } = req.params;
    if (!cartItemId) {
        throw new ValidationError('Cart item ID is required');
    }
    const payload = validate(updateCartItemSchema, req.body);
    const updatedCartItem = await cartItemService.updateCartItem(cartItemId, payload);
    res.status(200).json({
        success: true,
        message: 'Cart item updated successfully',
        data: updatedCartItem,
    });
});
// get all cart items
const getAllCartItems = asyncHandler(async (req, res) => {
    const { page, limit, sortBy, sortOrder } = req.query;
    const cartItems = await cartItemService.getAllCartItems({
        page: Number(page) || 1,
        limit: Number(limit) || 10,
        sortBy: sortBy,
        sortOrder: sortOrder,
    });
    res.status(200).json({
        success: true,
        message: 'Cart items retrieved successfully',
        data: cartItems,
    });
});
// delete cart item
const deleteCartItem = asyncHandler(async (req, res) => {
    const { cartItemId } = req.params;
    if (!cartItemId) {
        throw new ValidationError('Cart item ID is required');
    }
    const result = await cartItemService.deleteCartItem(cartItemId);
    res.status(200).json({
        success: true,
        message: result.message,
    });
});
export default {
    createCartItem,
    getCartItemById,
    getCartItemsByCartId,
    updateCartItem,
    getAllCartItems,
    deleteCartItem,
};
//# sourceMappingURL=cartItem.controller.js.map