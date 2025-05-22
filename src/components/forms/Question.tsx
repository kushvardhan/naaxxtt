"use client";

import { Input } from "@/components/Shared/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { Editor } from "@tinymce/tinymce-react";

import { useContext, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ThemeContext } from "../../../context/ThemeContext";
import { QuestionSchema } from "../../../lib/validations";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export function Question() {
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  const theme = useContext(ThemeContext);
  const isDark = theme.mode === "dark";

  const handleInputKeyDown = (e:React.KeyboardEvent<HTMLElement>,field:any)=>{
    if(e.key === "Enter" && field.name==='tags'){
      e.preventDefault();

      const tagInput = e.target as HTMLInputElement;
      const tagValue = tagInput.value.trim();

      if(tagValue !== ""){
        if(tagValue.length > 15){
          return form.setError('tags',{
            type:'required',
            message:'Tag must be less than 15 characters.',
          })
        }

        if(!field.value.includes(tagValue)){
          form.setValue('tags',[...field.value,tagValue]);
          tagInput.value = "";
          form.clearErrors('tags');
        }else{
          form.trigger();
        }

      }
    }
     
  }

  const form = useForm<z.infer<typeof QuestionSchema>>({
    resolver: zodResolver(QuestionSchema),
    defaultValues: {
      title: "",
      explanation: "",
      tags: [],
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof QuestionSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-10 overflow-y-auto "
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="w-full flex flex-col">
              <FormLabel
                className={`font-semibold text-regular ${
                  isDark ? "text-white" : "text-black"
                }`}
              >
                Question Title
                <span
                  className={`${
                    isDark
                      ? "text-red-400 font-semibold"
                      : "text-red-600 font-semibold text-xl"
                  }`}
                >
                  *
                </span>{" "}
              </FormLabel>
              <FormControl className="mt-1">
                <Input
                  className={`font-mono text-lg no-focus outline-none min-h-[56px] paragraph ${
                    isDark
                      ? "text-white border-2 border-zinc-700 bg-zinc-900"
                      : "text-black border-1 border-zinc-500/50 bg-zinc-900"
                  }  !important`}
                  placeholder="Enter your question title"
                  {...field}
                />
              </FormControl>
              <FormDescription
                className={`text-sm mt-2 ${
                  isDark ? "text-zinc-400" : "text-zinc-700/90"
                }`}
              >
                Be specific and imagine you are asking a question to another
                person.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="explanation"
          render={({ field }) => (
            <FormItem className="w-full flex flex-col gap-5">
              <FormLabel
                className={`font-semibold text-regular ${
                  isDark ? "text-white" : "text-black"
                }`}
              >
                Detailed explanation of your problem
                <span
                  className={`${
                    isDark
                      ? "text-red-400 font-semibold"
                      : "text-red-600 font-semibold text-xl"
                  }`}
                >
                  *
                </span>{" "}
              </FormLabel>
              <FormControl className="mt-2">
                <Editor
                  apiKey={process.env.NEXT_PUBLIC_TINY_API_KEY}
                  onInit={(_evt, editor) => (editorRef.current = editor)}
                  initialValue=""
                  init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                      "advlist",
                      "autolink",
                      "lists",
                      "link",
                      "image",
                      "charmap",
                      "preview",
                      "anchor",
                      "searchreplace",
                      "visualblocks",
                      "code",
                      "fullscreen",
                      "insertdatetime",
                      "media",
                      "table",
                      "codesample",
                      "help",
                      "wordcount",
                    ],
                    toolbar:
                      "undo redo | blocks | bold italic forecolor | " +
                      "alignleft aligncenter alignright alignjustify | bullist numlist | codesample",
                    toolbar_mode: "wrap",
                    content_style: "body { font-family:Inter; font-size:16px }",
                  }}
                />
              </FormControl>
              <FormDescription
                className={`text-sm mt-2 ${
                  isDark ? "text-zinc-400" : "text-zinc-700/90"
                }`}
              >
                Introduce the problem and expand on what you put in the title.
                Mininum 20 characters.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem className="w-full flex flex-col">
              <FormLabel
                className={`font-semibold text-regular ${
                  isDark ? "text-white" : "text-black"
                }`}
              >
                Tags
                <span
                  className={`${
                    isDark
                      ? "text-red-400 font-semibold"
                      : "text-red-600 font-semibold text-xl"
                  }`}
                >
                  *
                </span>{" "}
              </FormLabel>
              <FormControl className="mt-1">
                <>

                    <Input
                  className={`font-mono text-lg no-focus outline-none min-h-[56px] paragraph ${
                    isDark
                      ? "text-white border-2 border-zinc-700 bg-zinc-900"
                      : "text-black border-1 border-zinc-500/50 bg-zinc-900"
                  }  !important`}
                  placeholder="Add tags"
                  onKeyDown={(e)=>handleInputKeyDown(e,field)}
                />
                {field.value.length > 0 && (
  <div className="flex flex-wrap gap-2 mt-2">
    {field.value.map((tag: string, index: number) => (
      <div
        key={tag}
        className={`flex items-center gap-1 px-2 py-[0.8] rounded-md text-sm font-medium 
        border transition cursor-pointer group 
        ${isDark 
          ? "bg-zinc-800 text-white border-zinc-600 hover:bg-zinc-700" 
          : "bg-orange-100 text-orange-800 border-orange-300 hover:bg-orange-200"
        }`}
      >
        <span>{tag}</span>
        <span
          onClick={() => {
            const updatedTags = [...field.value];
            updatedTags.splice(index, 1);
            form.setValue("tags", updatedTags);
            form.trigger();
          }}
          className={`ml-1 text-base font-bold transition 
            ${isDark ? "text-zinc-400 hover:text-red-400" : "text-zinc-700 hover:text-red-600"}
          `}
        >
          ×
        </span>
      </div>
    ))}
  </div>
)}
                </>
              </FormControl>
              <FormDescription
                className={`text-sm mt-2 ${
                  isDark ? "text-zinc-400" : "text-zinc-700/90"
                }`}
              >
                Add up to 3 tags to describe what your question is about. You
                need to press enter to add a tag.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          className={`rounded-md font-bold text-lg
        bg-gradient-to-r from-orange-400 to-orange-600
        hover:from-orange-600 hover:to-orange-700
        cursor-pointer
        text-white shadow-md transition
        focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 !important
      `}
          type="submit"
        >
          Ask a Question
        </Button>
      </form>
    </Form>
  );
}

export default Question;
