import { NotFoundError, ValidationError } from '../../utils/errors.js';
import paymentRepository from './payment.repository.js';
import razorpay from '../../config/razorpay.js';
import { createHmac } from 'crypto';
import orderRepository from '../order/order.repository.js';
import sequelize from '../../config/database.js';
const toPaymentDto = (payment) => payment.toJSON();
// Service 
// Create Razorpay order
const createRazorpayOrder = async (amount, orderId) => {
    const razorpayOrder = await razorpay.orders.create({
        amount: Math.round(amount * 100), // convert to paise
        currency: 'INR',
        receipt: orderId,
        notes: { orderId },
    });
    console.log('Razorpay order created:', razorpayOrder);
    return {
        razorpayOrderId: razorpayOrder.id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        keyId: process.env.RAZORPAY_KEY_ID,
    };
};
// Verify Razorpay payment signature
const verifyPayment = async (razorpayOrderId, razorpayPaymentId, razorpaySignature, userId, orderId) => {
    const body = razorpayOrderId + '|' + razorpayPaymentId;
    const expectedSignature = createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(body)
        .digest('hex');
    if (expectedSignature !== razorpaySignature) {
        console.error('Invalid payment signature:', {
            expectedSignature,
            receivedSignature: razorpaySignature,
        });
        throw new ValidationError('Invalid payment signature');
    }
    const transaction = await sequelize.transaction();
    try {
        const razorpayOrder = await razorpay.orders.fetch(razorpayOrderId);
        const payment = await paymentRepository.create({
            orderId: orderId,
            userId: userId,
            amount: razorpayOrder.amount / 100,
            paymentMethod: "UPI",
            paymentStatus: "COMPLETED",
            transactionId: razorpayPaymentId,
        }, transaction);
        console.log('Payment record created:', payment);
        if (!payment)
            throw new NotFoundError('Payment record could not be created');
        const updatedOrder = await orderRepository.update(payment.orderId, { status: 'CONFIRMED' }, transaction);
        if (!updatedOrder)
            throw new NotFoundError('Associated order not found');
        await transaction.commit();
        return toPaymentDto(payment);
    }
    catch (error) {
        await transaction.rollback();
        throw error;
    }
};
// Handle failed payment
const failPayment = async (paymentId, orderId) => {
    const transaction = await sequelize.transaction();
    try {
        await paymentRepository.update(paymentId, { paymentStatus: 'FAILED' }, transaction);
        await orderRepository.update(orderId, { status: 'CANCELLED' }, transaction);
        await transaction.commit();
    }
    catch (error) {
        await transaction.rollback();
        throw error;
    }
};
// Create a new payment record
const createPayment = async (data) => {
    const newPayment = await paymentRepository.create(data);
    return toPaymentDto(newPayment);
};
const getAllPayments = async (options = {}) => {
    const result = await paymentRepository.findAll(options);
    return { ...result, data: result.data.map(toPaymentDto) };
};
const getPaymentById = async (id) => {
    const payment = await paymentRepository.findById(id);
    if (!payment)
        throw new NotFoundError('Payment not found');
    return toPaymentDto(payment);
};
const getPaymentByOrderId = async (orderId) => {
    const payment = await paymentRepository.findByOrderId(orderId);
    if (!payment)
        throw new NotFoundError('Payment not found for this order');
    return toPaymentDto(payment);
};
const getPaymentsByUserId = async (userId) => {
    const payments = await paymentRepository.findAllByUserId(userId);
    return payments.map(toPaymentDto);
};
const getPaymentsByStatus = async (paymentStatus) => {
    const payments = await paymentRepository.findAllByStatus(paymentStatus);
    return payments.map(toPaymentDto);
};
const updatePayment = async (id, data) => {
    const updatedPayment = await paymentRepository.update(id, data);
    if (!updatedPayment)
        throw new NotFoundError('Payment not found');
    return toPaymentDto(updatedPayment);
};
const updatePaymentStatus = async (id, paymentStatus) => {
    const updatedPayment = await paymentRepository.update(id, { paymentStatus });
    if (!updatedPayment)
        throw new NotFoundError('Payment not found');
    return toPaymentDto(updatedPayment);
};
const deletePayment = async (id) => {
    const payment = await paymentRepository.findById(id);
    if (!payment)
        throw new NotFoundError('Payment not found');
    await paymentRepository.delete(id);
    return { message: 'Payment deleted successfully' };
};
const getPaymentStats = async () => {
    return await paymentRepository.getStats();
};
export default {
    createRazorpayOrder,
    verifyPayment,
    failPayment,
    createPayment,
    getAllPayments,
    getPaymentById,
    getPaymentByOrderId,
    getPaymentsByUserId,
    getPaymentsByStatus,
    updatePayment,
    updatePaymentStatus,
    deletePayment,
    getPaymentStats,
};
//# sourceMappingURL=payment.service.js.map