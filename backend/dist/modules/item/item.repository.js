import Item from "./item.entity.js";
class ItemRepository {
    async create(data, transaction) {
        return await Item.create(data, { transaction });
    }
    async findAll(options) {
        const { page = 1, limit = 10, sortBy = 'itemId', sortOrder = 'ASC' } = options;
        const offset = (page - 1) * limit;
        const order = [[sortBy, sortOrder]];
        const { rows, count } = await Item.findAndCountAll({
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
    async findById(id) {
        return await Item.findByPk(id);
    }
    async update(id, data, transaction) {
        const item = await this.findById(id);
        if (!item) {
            return null;
        }
        return await item.update(data, { transaction });
    }
    async delete(itemId, transaction) {
        const deleted = await Item.destroy({ where: { itemId }, transaction });
        return deleted > 0;
    }
}
export default new ItemRepository();
//# sourceMappingURL=item.repository.js.map