import { asyncHandler } from '../../middleware/errorHandler.js';
import { ValidationError } from '../../utils/errors.js';
import { validate } from '../../utils/validate.js';
import { createItemSchema, updateItemSchema } from './item.dto.js';
import itemService from './item.service.js';
import { deleteImage, uploadImage } from '../../utils/cloudinary.js';
// Create a new item
const createItem = asyncHandler(async (req, res) => {
    let imageUrl;
    console.log('Request body:', req.body);
    if (req.file) {
        imageUrl = await uploadImage(req.file.buffer, 'canteen/items');
        console.log('Image uploaded to Cloudinary:', imageUrl);
    }
    const payload = validate(createItemSchema, { ...req.body, imageUrl });
    const item = await itemService.createItem(payload);
    res.status(201).json({
        success: true,
        message: 'Item created successfully',
        data: item,
    });
});
// Get all items
const getAllItems = asyncHandler(async (req, res) => {
    const { page, limit, sortBy, sortOrder } = req.query;
    const items = await itemService.getAllItems({
        page: Number(page) || 1,
        limit: Number(limit) || 10,
        sortBy: sortBy,
        sortOrder: sortOrder,
    });
    res.status(200).json({
        success: true,
        message: 'Items retrieved successfully',
        data: items,
    });
});
// Get item by ID
const getItemById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!id) {
        throw new ValidationError('Item ID is required');
    }
    const item = await itemService.getItemById(id);
    res.status(200).json({
        success: true,
        message: 'Item retrieved successfully',
        data: item,
    });
});
// Update item
const updateItem = asyncHandler(async (req, res) => {
    let imageUrl;
    const { id } = req.params;
    if (!id) {
        throw new ValidationError('Item ID is required');
    }
    if (req.file) {
        const existingItem = await itemService.getItemById(id);
        if (existingItem.imageUrl) {
            console.log('Deleting existing image from Cloudinary:', existingItem.imageUrl);
            await deleteImage(existingItem.imageUrl);
        }
        imageUrl = await uploadImage(req.file.buffer, 'canteen/items');
    }
    const payload = validate(updateItemSchema, { ...req.body, imageUrl });
    const item = await itemService.updateItem(id, payload);
    res.status(200).json({
        success: true,
        message: 'Item updated successfully',
        data: item,
    });
});
// Delete item
const deleteItem = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!id) {
        throw new ValidationError('Item ID is required');
    }
    const result = await itemService.deleteItem(id);
    res.status(200).json({
        success: true,
        message: result.message,
    });
});
export default {
    createItem,
    getAllItems,
    getItemById,
    updateItem,
    deleteItem,
};
//# sourceMappingURL=item.controller.js.map