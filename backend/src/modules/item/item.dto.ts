import { z }    from "zod";

const categoryIdSchema = z.uuid("Invalid category ID format");

const itemNameSchema = z.string().trim().min(1, "Item name is required").max(255, "Item name must not exceed 255 characters");

const itemDescriptionSchema = z.string().trim().max(255, "Item description must not exceed 255 characters");

const priceSchema = z.coerce.number().min(0, "Price must be a positive number");

const imageUrlSchema = z.url("Invalid image URL format");

const stockQuantitySchema = z.coerce.number().int().min(0, "Stock quantity must be a non-negative integer");

const isAvailableSchema = z.preprocess(
  (val) => val === "true" ,
  z.boolean()
)   

export const createItemSchema = z.object({
  categoryId: categoryIdSchema,
  itemName: itemNameSchema,
  itemDescription: itemDescriptionSchema,
  price: priceSchema,
  imageUrl: imageUrlSchema,
  stockQuantity: stockQuantitySchema,
  isAvailable: isAvailableSchema.optional()
});

export const updateItemSchema = z.object({
  categoryId: categoryIdSchema.optional(),
  itemName: itemNameSchema.optional(),
  itemDescription: itemDescriptionSchema.optional(),
  price: priceSchema.optional(),
  imageUrl: imageUrlSchema.optional(),
  stockQuantity: stockQuantitySchema.optional(),
  isAvailable: isAvailableSchema.optional()
});

export const itemSchema = z.object({
  itemId: z.uuid("Invalid item ID format"),
  categoryId: categoryIdSchema,
  itemName: itemNameSchema,
  itemDescription: itemDescriptionSchema,
  price: priceSchema,
  imageUrl: imageUrlSchema,
  stockQuantity: stockQuantitySchema,
  isAvailable: isAvailableSchema
});

export type CreateItemDto = z.infer<typeof createItemSchema>;
export type UpdateItemDto = z.infer<typeof updateItemSchema>;
export type ItemDto = z.infer<typeof itemSchema>;