import Cart from "./cart.entity.js";
class CartRepository {
    async create(data, transaction) {
        const existingCart = await Cart.findOne({ where: { userId: data.userId } });
        if (existingCart) {
            return null;
        }
        return await Cart.create(data, { transaction });
    }
    async findByUserId(userId) {
        return await Cart.findOne({ where: { userId } });
    }
    async findAll(options) {
        const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'ASC' } = options;
        const offset = (page - 1) * limit;
        const order = [[sortBy, sortOrder]];
        const { rows, count } = await Cart.findAndCountAll({
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
}
export default new CartRepository();
//# sourceMappingURL=cart.repository.js.map