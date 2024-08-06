import * as z from "zod";

export const postUpdateSchema = z.object({
	title: z.string().trim().min(1, "Post title is required"),
	body: z.string().min(1, "Add content"),
});

export type TPostUpdateSchema = z.infer<typeof postUpdateSchema>;