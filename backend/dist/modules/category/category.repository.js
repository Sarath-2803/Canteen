import Category from "./category.entity.js";
class CategoryRepository {
    async create(data, transaction) {
        return await Category.create(data, { transaction });
    }
    async findAll() {
        return await Category.findAll();
    }
    async findById(id) {
        return await Category.findByPk(id);
    }
    async update(id, data, transaction) {
        const category = await this.findById(id);
        if (!category) {
            return null;
        }
        return await category.update(data, { transaction });
    }
    async delete(id, transaction) {
        const deleted = await Category.destroy({ where: { categoryId: id }, transaction });
        return deleted > 0;
    }
}
export default new CategoryRepository();
//# sourceMappingURL=category.repository.js.map