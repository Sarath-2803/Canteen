import { get } from "http";
import { NotFoundError } from "../../utils/errors.js";
import { PaginatedResult, PaginationOptions } from "../../utils/pagination.js";
import { CartItemDTO, CreateCartItemDTO, UpdateCartItemDTO } from "./cartItem.dto.js";
import CartItem from "./cartItem.entity.js";
import CartItemRepository from "./cartItem.repository.js";
import itemService from "../item/item.service.js";
import connectRedis from "../../config/redis.js";

const redis = await connectRedis();

const toCartItemDto = (cartItem: CartItem): CartItemDTO => {
    return cartItem.toJSON() as CartItemDTO;
}

// create a cartItem
const createCartItem = async (data: CreateCartItemDTO): Promise<CartItemDTO> => {
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
}

// get cart item by ID
const getCartItemById = async (cartItemId: string): Promise<CartItemDTO> => {
    const cartItem = await CartItemRepository.findById(cartItemId);
    if (!cartItem) {
        throw new NotFoundError('Cart item not found');
    }
    return toCartItemDto(cartItem);
}

// get cart items by cartId
const getCartItemsByCartId = async (
    cartId: string
): Promise<CartItemDTO[]> => {

    const cachedCartItems = await redis?.get(`cartItems:${cartId}`);
    if (cachedCartItems) {
        return JSON.parse(cachedCartItems) as CartItemDTO[];
    }

    const cartItems = await CartItemRepository.findAllByCartId(cartId);

    const cartItemDtos = await Promise.all(
        cartItems.map(async (cartItem) => {
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
        })
    );

    await redis?.set(`cartItems:${cartId}`, JSON.stringify(cartItemDtos), {
        EX: 60 * 60,
    });

    return cartItemDtos;
};

// update cart item 
const updateCartItem = async (cartItemId: string, data: UpdateCartItemDTO): Promise<CartItemDTO> => {
    const cartId = (await CartItemRepository.findById(cartItemId))?.cartId;
    const updatedCartItem = await CartItemRepository.update(cartItemId, data);
    if (!updatedCartItem) {
        throw new NotFoundError('Cart item not found');
    }

    await redis?.del(`cartItems:${cartId}`);
    return toCartItemDto(updatedCartItem);
}

// get all cart items
const getAllCartItems = async (options: PaginationOptions): Promise<PaginatedResult<CartItemDTO>> => {
    const cartItems = await CartItemRepository.findAll(options);
    return {
        ...cartItems,
        data: cartItems.data.map(toCartItemDto),
    }
}

// delete cart item
const deleteCartItem = async (cartItemId: string): Promise<{ message: string }> => {
    const cartId = (await CartItemRepository.findById(cartItemId))?.cartId;
    const deleted = await CartItemRepository.delete(cartItemId);

    if (!deleted) {
        throw new NotFoundError('Cart item not found');
    }

    await redis?.del(`cartItems:${cartId}`);
    return { message: 'Cart item deleted successfully' };
}

export default {
    createCartItem,
    getCartItemById,
    getCartItemsByCartId,
    updateCartItem,
    getAllCartItems,
    deleteCartItem
}