"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/Shared/input"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { QuestionSchema } from "../../../lib/validations"
import { useContext } from "react"
import { ThemeContext } from "../../../context/ThemeContext"

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})



export function Question() {

  const theme = useContext(ThemeContext);
const isDark = theme.mode === "dark";

  const form = useForm<z.infer<typeof QuestionSchema>>({
    resolver: zodResolver(QuestionSchema),
    defaultValues: {
      title: "",
      explanation: "",
      tags: [],
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof QuestionSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }
  return (
     <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col gap-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="w-full flex flex-col">
              <FormLabel className={`font-bold ${isDark ? "text-white" : "text-black"}`}>Question Title<span className={`${isDark ? "text-red-400 font-semibold" : "text-red-600 font-semibold text-xl"}`}>*</span> </FormLabel>
              <FormControl className="mt-2">
                 <Input className={`font-mono text-lg no-focus outline-none min-h-[56px] paragraph ${isDark ? "text-white border-2 border-zinc-700 bg-zinc-900" : "text-black border-1 border-zinc-500/50 bg-zinc-900"}  !important`}
                 placeholder="Enter your question title" {...field} />
              </FormControl>
              <FormDescription>
                Be specific and imagine you are asking a question to another person.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export default Question;