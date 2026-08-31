import CartItem from "./cartItem.entity.js";
import Item from "../item/item.entity.js";
class CartItemRepository {
    async create(data, transaction) {
        return await CartItem.create(data, { transaction });
    }
    async findAllByCartId(cartId) {
        return await CartItem.findAll({ where: { cartId }, order: [['updatedAt', 'DESC']] });
    }
    async findAllByCartIdWithItems(cartId) {
        return await CartItem.findAll({
            where: { cartId },
            include: [{ model: Item, as: 'item' }],
        });
    }
    async findByCartIdAndItemId(cartId, itemId) {
        return await CartItem.findOne({ where: { cartId, itemId } });
    }
    async findById(cartItemId) {
        return await CartItem.findByPk(cartItemId);
    }
    async findAll(options) {
        const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'ASC' } = options;
        const offset = (page - 1) * limit;
        const order = [[sortBy, sortOrder]];
        const { rows, count } = await CartItem.findAndCountAll({
            limit,
            offset,
            order,
        });
        return {
            data: rows,
            total: count,
            page,
            limit,
            totalPages: Math.ceil(count / limit),
        };
    }
    async update(cartItemId, data, transaction) {
        const cartItem = await this.findById(cartItemId);
        if (!cartItem) {
            return null;
        }
        return await cartItem.update(data, { transaction });
    }
    async delete(cartItemId, transaction) {
        const deleted = await CartItem.destroy({ where: { cartItemId }, transaction });
        return deleted > 0;
    }
}
export default new CartItemRepository();
//# sourceMappingURL=cartItem.repository.js.map