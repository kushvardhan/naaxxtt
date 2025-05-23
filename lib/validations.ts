import * as z from "zod"

 export const QuestionSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }).max(130),
  explanation: z.string().min(20, {
    message: "Explanation must be at least 20 characters.",
  }).max(600),
  tags: z.array(
  z.string().min(1, { message: "Tag must be at least 1 character." }).max(15, {
    message: "Tag must be less than 15 characters.",
  })
)
.min(1, { message: "At least one tag is required." })
.max(5, { message: "Maximum 5 tags are allowed." }),
})