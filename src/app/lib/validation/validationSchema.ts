// validationSchema.ts
import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^\d+$/, "Phone number must contain only digits"),
  address: z.string().min(1, "Address is required"),
  email: z.string().email("Invalid email address"),
  city: z.string().min(1, "City is required"),
});
export type FormData = z.infer<typeof formSchema>;