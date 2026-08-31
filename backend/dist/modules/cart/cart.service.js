import { ConflictError, NotFoundError } from "../../utils/errors.js";
import CartRepository from "./cart.repository.js";
const toCartDto = (cart) => {
    return cart.toJSON();
};
// create a cart
const createCart = async (data) => {
    const cart = await CartRepository.create(data);
    if (!cart) {
        throw new ConflictError('Cart already exists for the given userId');
    }
    return toCartDto(cart);
};
// get cart by userId
const getCartByUserId = async (userId) => {
    const cart = await CartRepository.findByUserId(userId);
    if (!cart) {
        throw new NotFoundError('Cart not found for the given userId');
    }
    return toCartDto(cart);
};
// get all carts
const getAllCarts = async (options) => {
    const carts = await CartRepository.findAll(options);
    return {
        ...carts,
        data: carts.data.map(toCartDto)
    };
};
export default {
    createCart,
    getCartByUserId,
    getAllCarts
};
//# sourceMappingURL=cart.service.js.map