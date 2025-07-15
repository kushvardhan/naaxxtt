"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "../Shared/input"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { Textarea } from "../ui/textarea"
import { useState } from "react"
import { ProfileSchema } from "../../../lib/validations"
import { usePathname, useRouter } from "next/navigation"
import { updateUser } from "../../../lib/actions/user.action"

interface Props {
  clerkId: string;
  user: string;
}

const Profile = ({ clerkId, user }: Props) => {
  const parsedUser = JSON.parse(user);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const pathname = usePathname()

  const form = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      name: parsedUser.name || '',
      username: parsedUser.username || '',
      portfolioWebsite: parsedUser.portfolioWebsite || '',
      location: parsedUser.location || '',
      about: parsedUser.about || '',
    },
  })

  async function onSubmit(values: z.infer<typeof ProfileSchema>) {
    setIsSubmitting(true);

    try {
      await updateUser({
        clerkId,
        updateData: {
          name: values.name,
          username: values.username,
          portfolioWebsite: values.portfolioWebsite,
          location: values.location,
          about: values.about,
        },
        path: pathname
      })

      router.back();
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-9 flex w-full flex-col gap-9">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="space-y-3.5">
              <FormLabel className="text-regular font-semibold text-zinc-900 dark:text-zinc-100">
                Name <span className="text-red-600 dark:text-red-400 text-regular">*</span>
              </FormLabel>
              <FormControl>
                <Input 
                  placeholder="Your name" 
                  className="no-focus  text-[16px] font-normal leading-[22.4px] border-light-700 dark:border-dark-400 bg-light-800 dark:bg-dark-300 text-dark-300 dark:text-light-700 min-h-[56px] border"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="space-y-3.5">
              <FormLabel className="text-regular font-semibold text-zinc-900 dark:text-zinc-100">
                Username <span className="text-red-600 dark:text-red-400 text-regular">*</span>
              </FormLabel>
              <FormControl>
                <Input 
                  placeholder="Your username" 
                  className="no-focus paragraph-regular light-border-2 background-light800_dark300 text-dark300_light700 min-h-[56px] border"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="portfolioWebsite"
          render={({ field }) => (
            <FormItem className="space-y-3.5">
              <FormLabel className="text-regular font-semibold text-zinc-900 dark:text-zinc-100">
                Portfolio Link
              </FormLabel>
              <FormControl>
                <Input 
                  type="url"
                  placeholder="Your portfolio URL" 
                  className="no-focus paragraph-regular light-border-2 background-light800_dark300 text-dark300_light700 min-h-[56px] border"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem className="space-y-3.5">
              <FormLabel className="text-regular font-semibold text-zinc-900 dark:text-zinc-100">
                Location 
              </FormLabel>
              <FormControl>
                <Input 
                  placeholder="Where are you from?" 
                  className="no-focus paragraph-regular light-border-2 background-light800_dark300 text-dark300_light700 min-h-[56px] border"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="about"
          render={({ field }) => (
            <FormItem className="space-y-3.5">
              <FormLabel className="text-regular font-semibold text-zinc-900 dark:text-zinc-100">
                Bio <span className="text-red-600 dark:text-red-400 text-regular">*</span>
              </FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="What's special about you?" 
                  className="no-focus paragraph-regular light-border-2 background-light800_dark300 text-dark300_light700 min-h-[56px] border"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="mt-7 flex justify-end">
            <Button
  type="submit"
  className="w-fit text-white px-4 py-2 rounded-md font-mono"
  style={{
    background: "linear-gradient(129deg, #ff7000 0%, #e2995f 100%)",
  }}
  disabled={isSubmitting}
>
  {isSubmitting ? "Saving..." : "Save"}
</Button>
        </div>
      </form>
    </Form>
  )
}

export default Profile;