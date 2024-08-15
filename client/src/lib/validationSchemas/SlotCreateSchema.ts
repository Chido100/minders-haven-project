import * as z from "zod";

// Preprocess and validate date input
const dateSchema = z.preprocess((arg) => {
  if (typeof arg === "string" || arg instanceof Date) {
    const date = new Date(arg);
    if (!isNaN(date.getTime())) {
      return date;
    }
  }
  return undefined;
}, z.date().refine((date) => !isNaN(date.getTime()), {
  message: "Invalid date format",
}));

// Preprocess and validate time input
const timeSchema = z.preprocess((arg) => {
  if (typeof arg === "string") {
    const timeRegex = /^([01]\d|2[0-3]):?([0-5]\d)(:[0-5]\d)?$/;
    if (timeRegex.test(arg)) {
      return arg;
    }
  }
  return undefined;
}, z.string().refine((time) => {
  const timeParts = time.split(":");
  const hours = parseInt(timeParts[0], 10);
  const minutes = parseInt(timeParts[1], 10);
  return hours >= 0 && hours < 24 && minutes >= 0 && minutes < 60;
}, {
  message: "Invalid time format",
}));

export const slotCreateSchema = z.object({
  slot_date: dateSchema,
  slot_time: timeSchema,
  duration: z.string().max(1, {message: "Duration must be atleast 1 hr." }),
  number_of_kids: z.string().max(1, {message: "Number of kids must be atleast 1." }),
  kids_age: z.string().max(1, {message: "Age of kids must be atleast 1." }),
  location: z.enum(["parent_location", "minder_location"]),
  additional_info: z.string().optional(),
  status: z.enum(["created", "completed", "in_review"]),
});

export type TSlotCreateSchema = z.infer<typeof slotCreateSchema>;


