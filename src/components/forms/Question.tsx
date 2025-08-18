"use client";

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
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Editor } from "@tinymce/tinymce-react";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ThemeContext } from "../../../context/ThemeContext";
import {
  createQuestion,
  editQuestion,
} from "../../../lib/actions/question.action";
import { QuestionSchema } from "../../../lib/validations";

interface Props {
  type?: string;
  mongoUserId: string;
  questionDetails?: string;
}

export function Question({
  type = "Create",
  mongoUserId,
  questionDetails,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const editorRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const parsedQuestionDetails = questionDetails
    ? JSON.parse(questionDetails)
    : null;
  const tags = parsedQuestionDetails?.tags?.map((tag: any) => tag.name) || [];

  const theme = useContext(ThemeContext);
  const isDark = theme?.mode === "dark";

  const form = useForm<z.infer<typeof QuestionSchema>>({
    resolver: zodResolver(QuestionSchema),
    defaultValues: {
      title: parsedQuestionDetails?.title || "",
      explanation: parsedQuestionDetails?.explanation || "",
      tags: tags,
    },
  });

  const contentStyle = `
    body {
      font-family: monospace;
      font-size: 18px;
      background-color: ${isDark ? "#1e1e1e" : "#ffffff"};
      color: ${isDark ? "#f1f1f1" : "#111111"};
    }
    pre, code {
      background-color: ${isDark ? "#2d2d2d" : "#f5f5f5"};
      color: ${isDark ? "#dcdcdc" : "#333"};
      padding: 12px;
      border-radius: 6px;
    }
    ::-webkit-scrollbar {
      width: 8px;
    }
    ::-webkit-scrollbar-thumb {
      background: ${isDark ? "#444" : "#bbb"};
      border-radius: 4px;
    }
  `;

  function handleInputKeyDown(
    e: React.KeyboardEvent<HTMLElement>,
    field: { name: string; value: string[] }
  ) {
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
            type: "manual",
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
  }

  const onSubmit = async (values: z.infer<typeof QuestionSchema>) => {
    setIsSubmitting(true);

    try {
      if (type === "Edit") {
        await editQuestion({
          questionId: parsedQuestionDetails._id,
          title: values.title,
          content: values.explanation,
          tags: values.tags,
          path: pathname,
        });

        router.push(`/question/${parsedQuestionDetails._id}`);
      } else {
        await createQuestion({
          title: values.title,
          explanation: values.explanation,
          tags: values.tags,
          author: new (require("bson").ObjectId)(mongoUserId),
          path: pathname,
        });

        router.push("/");
      }
    } catch (error) {
      console.error("Error posting question:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-10 overflow-y-auto"
      >
        {/* Title */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="w-full flex flex-col">
              <FormLabel
                className={`font-semibold ${
                  isDark ? "text-white" : "text-black"
                }`}
              >
                Question Title <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  className={`font-mono text-xl min-h-[56px] ${
                    isDark
                      ? "bg-zinc-900 text-white border-zinc-700"
                      : "bg-zinc-200 text-black border-zinc-400"
                  }`}
                  placeholder="Enter your question title"
                  {...field}
                />
              </FormControl>
              <FormDescription
                className={isDark ? "text-zinc-400" : "text-zinc-700"}
              >
                Be specific and imagine you are asking a question to another
                person.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Explanation */}
        <FormField
          control={form.control}
          name="explanation"
          render={({ field }) => (
            <FormItem className="w-full flex flex-col gap-5">
              <FormLabel
                className={`font-semibold ${
                  isDark ? "text-white" : "text-black"
                }`}
              >
                Detailed explanation <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Editor
                  apiKey={process.env.NEXT_PUBLIC_TINY_API_KEY}
                  onInit={(_evt, editor) => (editorRef.current = editor)}
                  onBlur={field.onBlur}
                  onEditorChange={(content) => field.onChange(content)}
                  initialValue={parsedQuestionDetails?.explanation || ""}
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
                    content_style: contentStyle,
                    skin: isDark ? "oxide-dark" : "oxide",
                    content_css: isDark ? "dark" : "light",
                  }}
                />
              </FormControl>
              <FormDescription
                className={isDark ? "text-zinc-400" : "text-zinc-700"}
              >
                Expand on your problem. Minimum 100 characters.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Tags */}
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem className="w-full flex flex-col">
              <FormLabel
                className={`font-semibold ${
                  isDark ? "text-white" : "text-black"
                }`}
              >
                Tags <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <>
                  <Input
                    className={`font-mono text-xl min-h-[56px] ${
                      isDark
                        ? "bg-zinc-900 text-white border-zinc-700"
                        : "bg-zinc-200 text-black border-zinc-400"
                    }`}
                    placeholder="Press enter to add tags"
                    onKeyDown={(e) => handleInputKeyDown(e, field)}
                  />
                  {field.value.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {field.value.map((tag: string, index: number) => (
                        <div
                          key={tag}
                          className={`flex items-center gap-1 px-2 py-[0.8] rounded-md text-sm font-medium border ${
                            isDark
                              ? "bg-zinc-800 text-white border-zinc-600"
                              : "bg-orange-100 text-orange-800 border-orange-300"
                          }`}
                        >
                          <span>{tag}</span>
                          <span
                            onClick={() => {
                              const updatedTags = [...field.value];
                              updatedTags.splice(index, 1);
                              form.setValue("tags", updatedTags);
                            }}
                            className={`ml-1 text-base font-bold cursor-pointer ${
                              isDark
                                ? "text-zinc-400 hover:text-red-400"
                                : "text-zinc-700 hover:text-red-600"
                            }`}
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
                className={isDark ? "text-zinc-400" : "text-zinc-700"}
              >
                Add up to 5 tags. Press enter after each tag.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <div className="w-full flex items-center justify-center">
          <Button
            disabled={isSubmitting}
            className="w-fit py-6 px-4 rounded-md font-bold text-lg bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-md"
            type="submit"
          >
            {isSubmitting
              ? type === "Edit"
                ? "Editing..."
                : "Posting..."
              : type === "Edit"
              ? "Edit Question"
              : "Ask Question"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default Question;
