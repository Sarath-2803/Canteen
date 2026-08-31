import type { CreateItemDto, UpdateItemDto, ItemDto } from './item.dto.js';
import { PaginationOptions, PaginatedResult } from '../../utils/pagination.js';
declare const _default: {
    createItem: (data: CreateItemDto) => Promise<ItemDto>;
    getAllItems: (options: PaginationOptions) => Promise<PaginatedResult<ItemDto>>;
    getItemById: (id: string) => Promise<ItemDto>;
    updateItem: (id: string, data: UpdateItemDto) => Promise<ItemDto>;
    deleteItem: (id: string) => Promise<{
        message: string;
    }>;
};
export default _default;
//# sourceMappingURL=item.service.d.ts.map