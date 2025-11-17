import { z } from "zod";

export const productSchema = z.object({
  product_name: z
    .string()
    .min(3, "Product name must be at least 3 characters")
    .max(100, "Product name must not exceed 100 characters"),
  qty: z
    .number()
    .int("Quantity must be a whole number")
    .min(0, "Quantity cannot be negative")
    .max(999999, "Quantity is too large"),
});

export const productUpdateSchema = z.object({
  product_name: z
    .string()
    .min(3, "Product name must be at least 3 characters")
    .max(100, "Product name must not exceed 100 characters")
    .optional(),
  qty: z
    .number()
    .int("Quantity must be a whole number")
    .min(0, "Quantity cannot be negative")
    .max(999999, "Quantity is too large")
    .optional(),
});

export type ProductFormData = z.infer<typeof productSchema>;
export type ProductUpdateFormData = z.infer<typeof productUpdateSchema>;