import { Transaction } from "sequelize";
import { CreateCategoryDTO, UpdateCategoryDTO } from "./category.dto.js";
import Category from "./category.entity.js";
declare class CategoryRepository {
    create(data: CreateCategoryDTO, transaction?: Transaction): Promise<Category>;
    findAll(): Promise<Category[]>;
    findById(id: string): Promise<Category | null>;
    update(id: string, data: UpdateCategoryDTO, transaction?: Transaction): Promise<Category | null>;
    delete(id: string, transaction?: Transaction): Promise<boolean>;
}
declare const _default: CategoryRepository;
export default _default;
//# sourceMappingURL=category.repository.d.ts.map