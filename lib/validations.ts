import * as z from "zod"

 export const QuestionSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }).max(130),
  explanation: z.string().min(100, {
    message: "Explanation must be at least 100 characters.",
  }),
  tags: z.array(
  z.string().min(1, { message: "Tag must be at least 1 character." }).max(15, {
    message: "Tag must be less than 15 characters.",
  })
)
.min(1, { message: "At least one tag is required." })
.max(5, { message: "Maximum 5 tags are allowed." }),
})

export const AnswerSchema = z.object({
  answer: z.string().min(100)
})