import { NotFoundError } from "../../utils/errors.js";
import CategoryRepository from "./category.repository.js";
const toCategoryDTO = (category) => {
    return category.toJSON();
};
// create category
const createCategory = async (data) => {
    const newCategory = await CategoryRepository.create(data);
    return toCategoryDTO(newCategory);
};
// get all categories
const getAllCategories = async () => {
    const categories = await CategoryRepository.findAll();
    return categories.map(category => toCategoryDTO(category));
};
// get category by ID
const getCategoryById = async (id) => {
    const category = await CategoryRepository.findById(id);
    if (!category) {
        throw new NotFoundError('Category not found');
    }
    return toCategoryDTO(category);
};
// update category
const updateCategory = async (id, data) => {
    const updatedCategory = await CategoryRepository.update(id, data);
    if (!updatedCategory) {
        throw new NotFoundError('Category not found');
    }
    return toCategoryDTO(updatedCategory);
};
// delete category
const deleteCategory = async (id) => {
    const deleted = await CategoryRepository.delete(id);
    if (!deleted) {
        throw new NotFoundError('Category not found');
    }
    return { message: 'Category deleted successfully' };
};
export default {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
};
//# sourceMappingURL=category.service.js.map