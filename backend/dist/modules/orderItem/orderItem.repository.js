import OrderItem from "./orderItem.entity.js";
import Item from "../item/item.entity.js";
class OrderItemRepository {
    async create(data, transaction) {
        const orderItem = await OrderItem.create(data, { transaction });
        return orderItem;
    }
    async findAll(options = {}) {
        const { page = 1, limit = 10, sortBy = "orderItemId", sortOrder = "ASC" } = options;
        const offset = (page - 1) * limit;
        const order = [[sortBy, sortOrder]];
        const { count, rows } = await OrderItem.findAndCountAll({
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
        return await OrderItem.findByPk(id);
    }
    async findAllByOrderId(orderId) {
        return await OrderItem.findAll({
            where: { orderId },
            include: [
                {
                    model: Item,
                    as: "item",
                    attributes: [
                        "itemName"
                    ]
                }
            ]
        });
    }
    async findAllByItemId(itemId) {
        return await OrderItem.findAll({ where: { itemId } });
    }
    async update(orderItemId, data, transaction) {
        const orderItem = await OrderItem.findByPk(orderItemId);
        if (!orderItem) {
            return null;
        }
        return await orderItem.update(data, { transaction });
    }
    async delete(orderItemId, transaction) {
        const deleted = await OrderItem.destroy({ where: { orderItemId }, transaction });
        return deleted > 0;
    }
    async deleteByOrderId(orderId, transaction) {
        const deleted = await OrderItem.destroy({ where: { orderId }, transaction });
        return deleted > 0;
    }
}
export default new OrderItemRepository();
//# sourceMappingURL=orderItem.repository.js.map