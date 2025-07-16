"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "../Shared/input"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { Textarea } from "../ui/textarea"
import { useEffect, useState } from "react";
import { ProfileSchema } from "../../../lib/validations"
import { usePathname, useRouter } from "next/navigation"
import { updateUser } from "../../../lib/actions/user.action"
import { toast } from "../ui/sonner";

interface Props {
  clerkId: string;
  user: string;
}

const Profile = ({ clerkId, user }: Props) => {
  const parsedUser = JSON.parse(user);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const pathname = usePathname()

  const [mounted, setMounted] = useState(false);

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
      toast("Profile Updated")

      router.back();
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  }


useEffect(() => {
  setMounted(true);
}, []);

if (!mounted) {
  return (
    <div className="w-full h-full" suppressHydrationWarning>
      <div className="animate-pulse space-y-6">
        <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-32 bg-gray-200 dark:bg-gray-700 rounded"
          ></div>
        ))}
      </div>
    </div>
  );
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
  disabled={isSubmitting}
  className="w-fit text-white px-5 py-2.5 rounded-md transition-all duration-300 ease-in-out font-semibold"
  style={{
    background: isSubmitting
      ? "linear-gradient(129deg, #ff6a00 0%, #ff9900 100%)"
      : "linear-gradient(129deg, #ff6a00 0%, #ff9900 100%)",
    cursor: isSubmitting ? "not-allowed" : "pointer",
  }}
  onMouseEnter={(e) => {
    if (!isSubmitting) {
      e.currentTarget.style.background =
        "linear-gradient(129deg, #ff7b00 0%, #ffaa00 100%)";
    }
  }}
  onMouseLeave={(e) => {
    if (!isSubmitting) {
      e.currentTarget.style.background =
        "linear-gradient(129deg, #ff6a00 0%, #ff9900 100%)";
    }
  }}
>
  {isSubmitting ? "Saving..." : "Save"}
</Button>
        </div>
      </form>
    </Form>
  )
}

export default Profile;