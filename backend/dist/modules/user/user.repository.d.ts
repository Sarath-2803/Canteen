import { Transaction } from "sequelize";
import User from "./user.entity.js";
import { CreateUserDTO, UpdateUserDTO } from "./user.dto.js";
import { PaginationOptions, PaginatedResult } from "../../utils/pagination.js";
declare class UserRepository {
    create(data: CreateUserDTO, transaction?: Transaction): Promise<User>;
    findById(userId: string, transaction?: Transaction): Promise<User | null>;
    findByEmail(email: string, transaction?: Transaction): Promise<User | null>;
    findAll(options?: PaginationOptions): Promise<PaginatedResult<User>>;
    findAllByRole(role: string, options?: PaginationOptions): Promise<PaginatedResult<User>>;
    update(userId: string, data: UpdateUserDTO, transaction?: Transaction): Promise<User | null>;
    updatePassword(userId: string, newPassword: string, transaction?: Transaction): Promise<User | null>;
    delete(userId: string, transaction?: Transaction): Promise<boolean>;
    existsByEmail(email: string, excludeUserId?: string): Promise<boolean>;
}
declare const _default: UserRepository;
export default _default;
//# sourceMappingURL=user.repository.d.ts.map