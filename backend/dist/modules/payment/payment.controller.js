import { asyncHandler } from '../../middleware/errorHandler.js';
import { ValidationError } from '../../utils/errors.js';
import { validate } from '../../utils/validate.js';
import { createPaymentSchema, updatePaymentSchema } from './payment.dto.js';
import paymentService from './payment.service.js';
// Create Razorpay order
const createRazorpayOrder = asyncHandler(async (req, res) => {
    const { amount, orderId } = req.body;
    if (!amount || !orderId) {
        throw new ValidationError('Amount and orderId are required');
    }
    const razorpayOrder = await paymentService.createRazorpayOrder(amount, orderId);
    res.status(200).json({
        success: true,
        message: 'Razorpay order created successfully',
        data: razorpayOrder,
    });
});
// Verify payment after frontend completes payment
const verifyPayment = asyncHandler(async (req, res) => {
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature, userId, orderId } = req.body;
    const payment = await paymentService.verifyPayment(razorpayOrderId, razorpayPaymentId, razorpaySignature, userId, orderId);
    res.status(200).json({
        success: true,
        message: 'Payment verified successfully',
        data: payment,
    });
});
// Mark payment as failed and cancel order
const failPayment = asyncHandler(async (req, res) => {
    const { paymentId, orderId } = req.body;
    if (!paymentId || !orderId) {
        throw new ValidationError('paymentId and orderId are required');
    }
    await paymentService.failPayment(paymentId, orderId);
    res.status(200).json({
        success: true,
        message: 'Payment marked as failed, order cancelled',
    });
});
// Create a new payment
const createPayment = asyncHandler(async (req, res) => {
    const payload = validate(createPaymentSchema, req.body);
    const payment = await paymentService.createPayment(payload);
    res.status(201).json({
        success: true,
        message: 'Payment created successfully',
        data: payment,
    });
});
// Get all payments with pagination and sorting
const getAllPayments = asyncHandler(async (req, res) => {
    const { page, limit, sortBy, sortOrder } = req.query;
    const payments = await paymentService.getAllPayments({
        page: Number(page) || 1,
        limit: Number(limit) || 10,
        sortBy: sortBy,
        sortOrder: sortOrder,
    });
    res.status(200).json({
        success: true,
        message: 'Payments retrieved successfully',
        data: payments,
    });
});
// Get payment by ID
const getPaymentById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!id) {
        throw new ValidationError('Payment ID is required');
    }
    const payment = await paymentService.getPaymentById(id);
    res.status(200).json({
        success: true,
        message: 'Payment retrieved successfully',
        data: payment,
    });
});
// Get payment by order ID
const getPaymentByOrderId = asyncHandler(async (req, res) => {
    const { orderId } = req.params;
    if (!orderId) {
        throw new ValidationError('Order ID is required');
    }
    const payment = await paymentService.getPaymentByOrderId(orderId);
    res.status(200).json({
        success: true,
        message: 'Payment retrieved successfully',
        data: payment,
    });
});
// Get all payments by user ID
const getPaymentsByUserId = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    if (!userId) {
        throw new ValidationError('User ID is required');
    }
    const payments = await paymentService.getPaymentsByUserId(userId);
    res.status(200).json({
        success: true,
        message: 'User payments retrieved successfully',
        data: payments,
    });
});
// Get all payments by status
const getPaymentsByStatus = asyncHandler(async (req, res) => {
    const { status } = req.params;
    if (!status) {
        throw new ValidationError('Payment status is required');
    }
    const payments = await paymentService.getPaymentsByStatus(status);
    res.status(200).json({
        success: true,
        message: 'Payments retrieved successfully',
        data: payments,
    });
});
// Update payment details
const updatePayment = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!id) {
        throw new ValidationError('Payment ID is required');
    }
    const payload = validate(updatePaymentSchema, req.body);
    const payment = await paymentService.updatePayment(id, payload);
    res.status(200).json({
        success: true,
        message: 'Payment updated successfully',
        data: payment,
    });
});
// Update payment status
const updatePaymentStatus = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { paymentStatus } = validate(updatePaymentSchema, req.body);
    if (!id) {
        throw new ValidationError('Payment ID is required');
    }
    const payment = await paymentService.updatePaymentStatus(id, paymentStatus);
    res.status(200).json({
        success: true,
        message: 'Payment status updated successfully',
        data: payment,
    });
});
// Delete payment
const deletePayment = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!id) {
        throw new ValidationError('Payment ID is required');
    }
    const result = await paymentService.deletePayment(id);
    res.status(200).json({
        success: true,
        message: result.message,
    });
});
// Get payment statistics
const getPaymentStats = asyncHandler(async (req, res) => {
    const stats = await paymentService.getPaymentStats();
    res.status(200).json({
        success: true,
        message: 'Payment statistics retrieved successfully',
        data: stats,
    });
});
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
//# sourceMappingURL=payment.controller.js.map