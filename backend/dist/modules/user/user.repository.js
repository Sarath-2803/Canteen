import { Op } from "sequelize";
import User from "./user.entity.js";
// Repository
class UserRepository {
    async create(data, transaction) {
        return await User.create(data, { transaction });
    }
    async findById(userId, transaction) {
        return await User.findOne({ where: { userId }, transaction });
    }
    async findByEmail(email, transaction) {
        return await User.findOne({ where: { email }, transaction });
    }
    async findAll(options = {}) {
        const { page = 1, limit = 10, sortBy = "userId", sortOrder = "ASC", } = options;
        const offset = (page - 1) * limit;
        const order = [[sortBy, sortOrder]];
        const { count, rows } = await User.findAndCountAll({
            limit,
            offset,
            order,
            attributes: { exclude: ["password"] },
        });
        return {
            data: rows,
            total: count,
            page,
            limit,
            totalPages: Math.ceil(count / limit),
        };
    }
    async findAllByRole(role, options = {}) {
        const { page = 1, limit = 10, sortBy = "userId", sortOrder = "ASC", } = options;
        const offset = (page - 1) * limit;
        const order = [[sortBy, sortOrder]];
        const { count, rows } = await User.findAndCountAll({
            where: { role },
            limit,
            offset,
            order,
            attributes: { exclude: ["password"] },
        });
        return {
            data: rows,
            total: count,
            page,
            limit,
            totalPages: Math.ceil(count / limit),
        };
    }
    async update(userId, data, transaction) {
        const user = await User.findOne({ where: { userId }, transaction });
        if (!user)
            return null;
        return await user.update(data, { transaction });
    }
    async updatePassword(userId, newPassword, transaction) {
        const user = await User.findOne({ where: { userId }, transaction });
        if (!user)
            return null;
        return await user.update({ password: newPassword }, { transaction });
    }
    async delete(userId, transaction) {
        const deleted = await User.destroy({ where: { userId }, transaction });
        return deleted > 0;
    }
    async existsByEmail(email, excludeUserId) {
        const where = excludeUserId
            ? { email, userId: { [Op.ne]: excludeUserId } }
            : { email };
        const count = await User.count({ where });
        return count > 0;
    }
}
export default new UserRepository();
//# sourceMappingURL=user.repository.js.map