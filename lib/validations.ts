import * as z from "zod"

 export const QuestionSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }).max(130),
  explanation: z.string().min(10, {
    message: "Explanation must be at least 15 characters.",
  }).max(400),
  tags: z.array(z.string().min(1, {
    message: "Tag must be at least 1 character.",
  }).min(15)).min(1, {
    message: "At least one tag is required.",
  }).max(3, {
    message: "Maximum 3 tags are allowed.",
  }),
})