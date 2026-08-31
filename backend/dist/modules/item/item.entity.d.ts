import { CreationOptional, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
declare class Item extends Model<InferAttributes<Item>, InferCreationAttributes<Item>> {
    itemId: CreationOptional<string>;
    categoryId: string;
    itemName: string;
    itemDescription: string;
    price: number;
    imageUrl: string;
    stockQuantity: number;
    isAvailable: CreationOptional<boolean>;
}
export default Item;
//# sourceMappingURL=item.entity.d.ts.map