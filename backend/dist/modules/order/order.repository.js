import Order from "./order.entity.js";
class OrderRepository {
    async create(data, transaction) {
        return await Order.create({
            ...data,
            placedAt: new Date(),
        }, { transaction });
    }
    async findAll(options = {}) {
        const { page = 1, limit = 10, sortBy = "orderId", sortOrder = "ASC" } = options;
        const offset = (page - 1) * limit;
        const order = [[sortBy, sortOrder]];
        const { count, rows } = await Order.findAndCountAll({
            limit,
            offset,
            order,
        });
        return {
            data: rows,
            total: count,
            page,
            limit,
            totalPages: Math.ceil(count / limit)
        };
    }
    async findById(id) {
        return await Order.findByPk(id);
    }
    async findAllByUserId(options, userId) {
        const { page = 1, limit = 10, sortBy = "createdAt", sortOrder = "DESC" } = options;
        const offset = (page - 1) * limit;
        const order = [[sortBy, sortOrder]];
        const { count, rows } = await Order.findAndCountAll({
            where: { userId },
            limit,
            offset,
            order,
        });
        return {
            data: rows,
            total: count,
            page,
            limit,
            totalPages: Math.ceil(count / limit)
        };
    }
    async update(orderId, data, transaction) {
        const order = await this.findById(orderId);
        if (!order) {
            return null;
        }
        return await order.update(data, { transaction });
    }
    async updateStatus(orderId, status, transaction) {
        const order = await this.findById(orderId);
        if (!order) {
            return null;
        }
        return await order.update({ status }, { transaction });
    }
    async delete(orderId, transaction) {
        const deleted = await Order.destroy({ where: { orderId }, transaction });
        return deleted > 0;
    }
}
export default new OrderRepository();
//# sourceMappingURL=order.repository.js.map