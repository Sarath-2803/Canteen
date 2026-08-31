import { z } from "zod";
export declare const userRoleSchema: z.ZodEnum<{
    admin: "admin";
    customer: "customer";
}>;
export declare const createUserSchema: z.ZodObject<{
    firstName: z.ZodString;
    lastName: z.ZodString;
    email: z.ZodEmail;
    phone: z.ZodString;
    password: z.ZodString;
    role: z.ZodOptional<z.ZodDefault<z.ZodEnum<{
        admin: "admin";
        customer: "customer";
    }>>>;
}, z.core.$strip>;
export declare const signInSchema: z.ZodObject<{
    email: z.ZodEmail;
    password: z.ZodString;
}, z.core.$strip>;
export declare const updateUserSchema: z.ZodObject<{
    firstName: z.ZodOptional<z.ZodString>;
    lastName: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodEmail>;
    phone: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const updatePasswordSchema: z.ZodObject<{
    oldPassword: z.ZodString;
    newPassword: z.ZodString;
}, z.core.$strip>;
export declare const forgotPasswordSchema: z.ZodObject<{
    email: z.ZodEmail;
    newPassword: z.ZodString;
}, z.core.$strip>;
export declare const userSchema: z.ZodObject<{
    userId: z.ZodUUID;
    firstName: z.ZodString;
    lastName: z.ZodString;
    email: z.ZodEmail;
    phone: z.ZodString;
    role: z.ZodEnum<{
        admin: "admin";
        customer: "customer";
    }>;
}, z.core.$strip>;
export type CreateUserDTO = z.infer<typeof createUserSchema>;
export type SignInDTO = z.infer<typeof signInSchema>;
export type UpdateUserDTO = z.infer<typeof updateUserSchema>;
export type UpdatePasswordDTO = z.infer<typeof updatePasswordSchema>;
export type ForgotPasswordDTO = z.infer<typeof forgotPasswordSchema>;
export type UserDTO = z.infer<typeof userSchema>;
//# sourceMappingURL=user.dto.d.ts.map