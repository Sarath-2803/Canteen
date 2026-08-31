import sequelize from "../../config/database.js";
import Payment from "./payment.entity.js";
class PaymentRepository {
    async create(data, transaction) {
        return await Payment.create(data, { transaction });
    }
    async findById(paymentId, transaction) {
        return await Payment.findOne({ where: { paymentId }, transaction });
    }
    async findByOrderId(orderId, transaction) {
        return await Payment.findOne({ where: { orderId }, transaction });
    }
    async findAllByUserId(userId, transaction) {
        return await Payment.findAll({ where: { userId }, transaction });
    }
    async findAllByStatus(paymentStatus, transaction) {
        return await Payment.findAll({ where: { paymentStatus }, transaction });
    }
    async findAll(options = {}) {
        const { page = 1, limit = 10, sortBy = "createdAt", sortOrder = "DESC" } = options;
        const offset = (page - 1) * limit;
        const { count, rows } = await Payment.findAndCountAll({
            limit,
            offset,
            order: [[sortBy, sortOrder]],
        });
        return {
            data: rows,
            total: count,
            page,
            limit,
            totalPages: Math.ceil(count / limit),
        };
    }
    async update(paymentId, data, transaction) {
        const payment = await Payment.findOne({ where: { paymentId }, transaction });
        if (!payment)
            return null;
        return await payment.update(data, { transaction });
    }
    async delete(paymentId, transaction) {
        const deleted = await Payment.destroy({ where: { paymentId }, transaction });
        return deleted > 0;
    }
    async getStats() {
        const rows = await Payment.findAll({
            attributes: [
                "paymentStatus",
                [sequelize.fn("COUNT", sequelize.col("payment_id")), "count"],
                [sequelize.fn("SUM", sequelize.col("amount")), "total"],
            ],
            group: ["paymentStatus"],
            raw: true,
        });
        const statsMap = { COMPLETED: { count: 0, total: 0 }, PENDING: { count: 0, total: 0 }, FAILED: { count: 0, total: 0 } };
        for (const row of rows) {
            const status = row.paymentStatus;
            if (status in statsMap) {
                statsMap[status] = { count: Number(row.count), total: Number(row.total) };
            }
        }
        return {
            totalPayments: statsMap.COMPLETED.count + statsMap.PENDING.count + statsMap.FAILED.count,
            completedPayments: statsMap.COMPLETED.count,
            pendingPayments: statsMap.PENDING.count,
            failedPayments: statsMap.FAILED.count,
            totalAmount: statsMap.COMPLETED.total + statsMap.PENDING.total + statsMap.FAILED.total,
            completedAmount: statsMap.COMPLETED.total,
        };
    }
}
export default new PaymentRepository();
//# sourceMappingURL=payment.repository.js.map