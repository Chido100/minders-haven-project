import * as z from "zod";

export const profileSchema = z.object({
	gender: z.enum(["male", "female", "other"]),
	occupation: z.enum([
		"parent",
		"minder",
	]),
	city: z.string().min(1, "City is required"),
	bio: z.string().optional(),
	first_name: z.string().min(1, "First name is required"),
	last_name: z.string().min(1, "Last name is required"),
	username: z.string().min(1, "Username is required"),
	phone_number: z.string().trim(),
});

export type TProfileSchema = z.infer<typeof profileSchema>;