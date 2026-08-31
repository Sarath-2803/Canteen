import { z } from "zod";
export const userRoleSchema = z.enum(["admin", "customer"]);
const nameSchema = z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(255, "Name must not exceed 255 characters");
const emailSchema = z.email()
    .trim()
    .min(1, "Email is required")
    .max(255, "Email must not exceed 255 characters");
const phoneSchema = z
    .string()
    .trim()
    .regex(/^\d{10}$/, "Phone number must contain exactly 10 digits");
const passwordSchema = z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(72, "Password must not exceed 72 characters");
export const createUserSchema = z.object({
    firstName: nameSchema,
    lastName: nameSchema,
    email: emailSchema,
    phone: phoneSchema,
    password: passwordSchema,
    role: userRoleSchema.default("customer").optional(),
});
export const signInSchema = z.object({
    email: emailSchema,
    password: z.string().min(1, "Password is required"),
});
export const updateUserSchema = z
    .object({
    firstName: nameSchema.optional(),
    lastName: nameSchema.optional(),
    email: emailSchema.optional(),
    phone: phoneSchema.optional(),
})
    .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided for update",
});
export const updatePasswordSchema = z.object({
    oldPassword: passwordSchema,
    newPassword: passwordSchema,
});
export const forgotPasswordSchema = z.object({
    email: emailSchema,
    newPassword: passwordSchema,
});
export const userSchema = z.object({
    userId: z.uuid("Invalid user id"),
    firstName: nameSchema,
    lastName: nameSchema,
    email: emailSchema,
    phone: phoneSchema,
    role: userRoleSchema,
});
//# sourceMappingURL=user.dto.js.map