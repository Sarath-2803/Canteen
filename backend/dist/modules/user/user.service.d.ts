import type { CreateUserDTO, ForgotPasswordDTO, SignInDTO, UpdatePasswordDTO, UpdateUserDTO, UserDTO } from "./user.dto.js";
import type { PaginationOptions, PaginatedResult } from "../../utils/pagination.js";
declare const _default: {
    createUser: (data: CreateUserDTO) => Promise<UserDTO>;
    signIn: ({ email, password }: SignInDTO) => Promise<UserDTO>;
    getAllUsers: (options?: PaginationOptions) => Promise<PaginatedResult<UserDTO>>;
    getAllCustomers: (options?: PaginationOptions) => Promise<PaginatedResult<UserDTO>>;
    getUserById: (userId: string) => Promise<UserDTO>;
    getUserByEmail: (email: string) => Promise<UserDTO>;
    updateUser: (userId: string, data: UpdateUserDTO) => Promise<UserDTO>;
    updatePassword: (userId: string, { oldPassword, newPassword }: UpdatePasswordDTO) => Promise<UserDTO>;
    forgotPassword: ({ email, newPassword }: ForgotPasswordDTO) => Promise<UserDTO>;
    deleteUser: (userId: string) => Promise<{
        message: string;
    }>;
};
export default _default;
//# sourceMappingURL=user.service.d.ts.map