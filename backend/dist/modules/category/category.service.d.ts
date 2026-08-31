import { CategoryDTO, CreateCategoryDTO, UpdateCategoryDTO } from "./category.dto.js";
declare const _default: {
    createCategory: (data: CreateCategoryDTO) => Promise<CategoryDTO>;
    getAllCategories: () => Promise<CategoryDTO[]>;
    getCategoryById: (id: string) => Promise<CategoryDTO>;
    updateCategory: (id: string, data: UpdateCategoryDTO) => Promise<CategoryDTO>;
    deleteCategory: (id: string) => Promise<{
        message: string;
    }>;
};
export default _default;
//# sourceMappingURL=category.service.d.ts.map