import { z } from 'zod';

const blogValidationSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: "Title must be provided and must be a string",
      })
      .min(5, { message: "Title must be at least 5 characters long" })
      .max(100, { message: "Title cannot exceed 100 characters" }),

    content: z
      .string({
        required_error: "Content must be provided and must be a string",
      })
      .min(10, { message: "Content must be at least 10 characters long" }),

    author: z
      .string({
        required_error: "Author ID must be provided and must be a string",
      }).optional(),
      // .regex(/^[a-fA-F0-9]{24}$/, { message: "Invalid ObjectId format for author" }),

    isPublished: z
      .boolean()
      .optional()
      .default(false), 
  }),
});

export const BlogValidation = {
  blogValidationSchema,
};
