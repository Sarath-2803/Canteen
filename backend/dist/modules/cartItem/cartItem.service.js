import { NotFoundError } from "../../utils/errors.js";
import CartItemRepository from "./cartItem.repository.js";
import itemService from "../item/item.service.js";
import connectRedis from "../../config/redis.js";
const redis = await connectRedis();
const toCartItemDto = (cartItem) => {
    return cartItem.toJSON();
};
// create a cartItem
const createCartItem = async (data) => {
    const existingCartItem = await CartItemRepository.findByCartIdAndItemId(data.cartId, data.itemId);
    if (existingCartItem) {
        const updatedQuantity = existingCartItem.quantity + data.quantity;
        const updatedCartItem = await CartItemRepository.update(existingCartItem.cartItemId, { quantity: updatedQuantity });
        if (!updatedCartItem) {
            throw new NotFoundError('Cart item not found');
        }
        return toCartItemDto(updatedCartItem);
    }
    const cartItem = await CartItemRepository.create(data);
    await redis?.del(`cartItems:${data.cartId}`);
    return toCartItemDto(cartItem);
};
// get cart item by ID
const getCartItemById = async (cartItemId) => {
    const cartItem = await CartItemRepository.findById(cartItemId);
    if (!cartItem) {
        throw new NotFoundError('Cart item not found');
    }
    return toCartItemDto(cartItem);
};
// get cart items by cartId
const getCartItemsByCartId = async (cartId) => {
    const cachedCartItems = await redis?.get(`cartItems:${cartId}`);
    if (cachedCartItems) {
        return JSON.parse(cachedCartItems);
    }
    const cartItems = await CartItemRepository.findAllByCartId(cartId);
    const cartItemDtos = await Promise.all(cartItems.map(async (cartItem) => {
        const item = await itemService.getItemById(cartItem.itemId);
        return {
            ...toCartItemDto(cartItem),
            item: {
                itemId: item.itemId,
                itemName: item.itemName,
                price: item.price,
                imageUrl: item.imageUrl,
                available: item.isAvailable
            }
        };
    }));
    await redis?.set(`cartItems:${cartId}`, JSON.stringify(cartItemDtos), {
        EX: 60 * 60,
    });
    return cartItemDtos;
};
// update cart item 
const updateCartItem = async (cartItemId, data) => {
    const cartId = (await CartItemRepository.findById(cartItemId))?.cartId;
    const updatedCartItem = await CartItemRepository.update(cartItemId, data);
    if (!updatedCartItem) {
        throw new NotFoundError('Cart item not found');
    }
    await redis?.del(`cartItems:${cartId}`);
    return toCartItemDto(updatedCartItem);
};
// get all cart items
const getAllCartItems = async (options) => {
    const cartItems = await CartItemRepository.findAll(options);
    return {
        ...cartItems,
        data: cartItems.data.map(toCartItemDto),
    };
};
// delete cart item
const deleteCartItem = async (cartItemId) => {
    const cartId = (await CartItemRepository.findById(cartItemId))?.cartId;
    const deleted = await CartItemRepository.delete(cartItemId);
    if (!deleted) {
        throw new NotFoundError('Cart item not found');
    }
    await redis?.del(`cartItems:${cartId}`);
    return { message: 'Cart item deleted successfully' };
};
export default {
    createCartItem,
    getCartItemById,
    getCartItemsByCartId,
    updateCartItem,
    getAllCartItems,
    deleteCartItem
};
//# sourceMappingURL=cartItem.service.js.map