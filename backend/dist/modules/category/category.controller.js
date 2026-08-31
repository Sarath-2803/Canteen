import { asyncHandler } from '../../middleware/errorHandler.js';
import { ValidationError } from '../../utils/errors.js';
import { validate } from '../../utils/validate.js';
import { createCategorySchema } from './category.dto.js';
import categoryService from './category.service.js';
// create category
const createCategory = asyncHandler(async (req, res) => {
    const payload = validate(createCategorySchema, req.body);
    const category = await categoryService.createCategory(payload);
    res.status(201).json({
        success: true,
        message: 'Category created successfully',
        data: category,
    });
});
// get all categories
const getAllCategories = asyncHandler(async (req, res) => {
    const categories = await categoryService.getAllCategories();
    res.status(200).json({
        success: true,
        message: 'Categories retrieved successfully',
        data: categories,
    });
});
// get category by ID
const getCategoryById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!id) {
        throw new ValidationError('Category ID is required');
    }
    const category = await categoryService.getCategoryById(id);
    res.status(200).json({
        success: true,
        message: 'Category retrieved successfully',
        data: category,
    });
});
// update category
const updateCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!id) {
        throw new ValidationError('Category ID is required');
    }
    const payload = validate(createCategorySchema, req.body);
    const category = await categoryService.updateCategory(id, payload);
    res.status(200).json({
        success: true,
        message: 'Category updated successfully',
        data: category,
    });
});
// delete category
const deleteCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!id) {
        throw new ValidationError('Category ID is required');
    }
    const result = await categoryService.deleteCategory(id);
    res.status(200).json({
        success: true,
        message: result.message,
    });
});
export default {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
};
//# sourceMappingURL=category.controller.js.map