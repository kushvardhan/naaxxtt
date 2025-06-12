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
import { zodResolver } from "@hookform/resolvers/zod";
import { Editor } from "@tinymce/tinymce-react";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ThemeContext } from "../../../context/ThemeContext";
import { createQuestion } from "../../../lib/actions/question.action";
import { QuestionSchema } from "../../../lib/validations";

const type: unknown = "create";

interface Props {
  mongoUserId: string;
}

export function Question({ mongoUserId }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const editorRef = useRef(null);

  const [isSubmmitting, setIsSubmitting] = useState(false);

  const theme = useContext(ThemeContext);
  const form = useForm<z.infer<typeof QuestionSchema>>({
    resolver: zodResolver(QuestionSchema),
    defaultValues: {
      title: "",
      explanation: "",
      tags: [],
    },
  });

  if (!theme) {
    return <div>Loading...</div>;
  }

  const isDark = theme?.mode === "dark";

  const contentStyle = `
  body {
    font-family: monospace;
    font-size: 18px;
    background-color: ${isDark ? "#1e1e1e" : "#ffffff"};
    color: ${isDark ? "#f1f1f1" : "#111111"};
    border: none;
  }

  pre, code {
    background-color: ${isDark ? "#2d2d2d" : "#f5f5f5"};
    color: ${isDark ? "#dcdcdc" : "#333"};
    padding: 12px;
    border-radius: 6px;
    border: 1px solid ${isDark ? "#333" : "#ddd"};
  }

  table, th, td {
    border: 1px solid ${isDark ? "#444" : "#ccc"};
  }

  a {
    color: ${isDark ? "#80bfff" : "#0066cc"};
  }

  hr {
    border: 1px solid ${isDark ? "#333" : "#ccc"};
  }

  ::selection {
    background: ${isDark ? "#555" : "#cce4ff"};
    color: ${isDark ? "#fff" : "#000"};
  }

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-thumb {
    background: ${isDark ? "#444" : "#bbb"};
    border-radius: 4px;
  }
`;

  interface Field {
    name: string;
    value: string[];
  }

  const handleInputKeyDown = (
    e: React.KeyboardEvent<HTMLElement>,
    field: Field
  ) => {
    if (e.key === "Enter" && field.name === "tags") {
      e.preventDefault();

      const tagInput = e.target as HTMLInputElement;
      const tagValue = tagInput.value.trim();

      if (field.value.length >= 5) {
        form.setError("tags", {
          type: "manual",
          message: "You can add up to 5 tags only.",
        });
        return;
      }

      if (tagValue !== "") {
        if (tagValue.length > 15) {
          return form.setError("tags", {
            type: "required",
            message: "Tag must be less than 15 characters.",
          });
        }

        if (!field.value.includes(tagValue)) {
          form.setValue("tags", [...field.value, tagValue]);
          tagInput.value = "";
          form.clearErrors("tags");
        } else {
          form.trigger();
        }
      }
    }
  };

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof QuestionSchema>) {
    setIsSubmitting(true);
    try {
      await createQuestion({
        title: values.title,
        explanation: values.explanation,
        tags: values.tags,
        author: mongoUserId,
        path: pathname,
      });

      router.push("/");
    } catch (error) {
      console.error("Error posting question:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        // action={createQuestion()}
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
                  className={`font-mono text-xl no-focus outline-none min-h-[56px] paragraph ${
                    isDark
                      ? "text-white border-2 border-zinc-700 bg-zinc-900 text- font-bold"
                      : "text-black border-1 border-zinc-500/50 bg-zinc-200 text-semibold"
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
                  onBlur={field.onBlur}
                  onEditorChange={(content) => field.onChange(content)}
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
                    content_style: contentStyle,
                  }}
                />
              </FormControl>
              <FormDescription
                className={`text-sm mt-2 ${
                  isDark ? "text-zinc-400" : "text-zinc-700/90"
                }`}
              >
                Introduce the problem and expand on what you put in the title.
                Mininum 100 characters.
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
                <div>
                  <Input
                    className={`font-mono text-xl no-focus text-semibold outline-none min-h-[56px] paragraph ${
                      isDark
                        ? "text-white border-2 border-zinc-700 bg-zinc-900"
                        : "text-black border-1 border-zinc-500/50 bg-zinc-200"
                    }  !important`}
                    placeholder="Add tags"
                    onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                      handleInputKeyDown(e, field)
                    }
                  />
                  {field.value.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {field.value.map((tag: string, index: number) => (
                        <div
                          key={tag}
                          className={`flex items-center gap-1 px-2 py-[0.8] rounded-md text-sm font-medium 
        border transition cursor-pointer group 
        ${
          isDark
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
            ${
              isDark
                ? "text-zinc-400 hover:text-red-400"
                : "text-zinc-700 hover:text-red-600"
            }
          `}
                          >
                            ×
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </FormControl>
              <FormDescription
                className={`text-sm mt-2 ${
                  isDark ? "text-zinc-400" : "text-zinc-700/90"
                }`}
              >
                Add up to 5 tags to describe what your question is about. You
                need to press enter to add a tag.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="w-full flex items-center justify-center ">
          <Button
            disabled={isSubmmitting}
            className={`w-[90%] py-5 rounded-md font-bold text-lg mb-10 no-focus border-none outline-none focus:0
        bg-gradient-to-r from-orange-400 to-orange-600
        hover:from-orange-600 hover:to-orange-700
        cursor-pointer
        text-white shadow-md transition
        focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 !important
      `}
            type="submit"
          >
            {isSubmmitting ? (
              <>{type === "edit" ? "Editing..." : "Posting..."}</>
            ) : (
              <>{type === "edit" ? "Edit Question" : "Ask Question"}</>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default Question;
