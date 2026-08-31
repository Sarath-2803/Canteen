import { CreationOptional, InferAttributes, InferCreationAttributes, Model } from "sequelize";
declare class Category extends Model<InferAttributes<Category>, InferCreationAttributes<Category>> {
    categoryId: CreationOptional<string>;
    categoryName: string;
    categoryDescription: string;
}
export default Category;
//# sourceMappingURL=category.entity.d.ts.map