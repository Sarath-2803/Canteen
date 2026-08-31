import { CreateItemDto, UpdateItemDto } from "./item.dto.js";
import Item from "./item.entity.js";
import { Transaction } from "sequelize";
import { PaginationOptions, PaginatedResult } from "../../utils/pagination.js";
declare class ItemRepository {
    create(data: CreateItemDto, transaction?: Transaction): Promise<Item>;
    findAll(options: PaginationOptions): Promise<PaginatedResult<Item>>;
    findById(id: string): Promise<Item | null>;
    update(id: string, data: UpdateItemDto, transaction?: Transaction): Promise<Item | null>;
    delete(itemId: string, transaction?: Transaction): Promise<boolean>;
}
declare const _default: ItemRepository;
export default _default;
//# sourceMappingURL=item.repository.d.ts.map