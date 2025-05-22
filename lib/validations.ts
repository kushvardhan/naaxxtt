import * as z from "zod"

 export const QuestionSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }).max(130),
})