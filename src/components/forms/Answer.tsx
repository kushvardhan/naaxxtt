"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Editor } from "@tinymce/tinymce-react";
import { Sparkles } from "lucide-react";
import { usePathname } from "next/navigation";
import { useContext, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ThemeContext } from "../../../context/ThemeContext";
import { createAnswer } from "../../../lib/actions/answer.action";
import { AnswerSchema } from "../../../lib/validations";
import { Button } from "../ui/button";

interface Props {
  question: string;
  questionId: string;
  authorId: string;
}

const Answer = ({ question, questionId, authorId }: Props) => {
  // console.log("Question: ", question , " , questionId: ", questionId, " ,authorId: ", authorId);
  const pathname = usePathname();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmittingAI, setSetIsSubmittingAI] = useState(false);
  const editorRef = useRef(null);
  const theme = useContext(ThemeContext);

  // console.log({ question, questionId, authorId });

  const form = useForm<z.infer<typeof AnswerSchema>>({
    resolver: zodResolver(AnswerSchema),
    defaultValues: {
      answer: "",
    },
  });

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
    ::-webkit-scrollbar-thumb {
      background: ${isDark ? "#444" : "#bbb"};
    }
  `;

  const handleCreateAnswer = async (values: z.infer<typeof AnswerSchema>) => {
    setIsSubmitting(true);

    try {
      await createAnswer({
        content: values.answer,
        author: JSON.parse(authorId),
        question: JSON.parse(questionId),
        path: pathname,
      });

      form.reset();

      if (editorRef.current) {
        const editor = editorRef.current as any;

        editor.setContent("");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateAIAnswer = async () => {
    try {
      if (!authorId) return;

      setSetIsSubmittingAI(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000" }/api/chatgpt`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ question }),
        }
      );

      const aiAnswer = await response.json();

      if (aiAnswer.error) {
        alert(`AI Error: ${aiAnswer.error}`);
        return;
      }

      const formattedAnswer = aiAnswer.reply.replace(/\n/g, "<br />");

      if (editorRef.current) {
        const editor = editorRef.current as any;
        editor.setContent(formattedAnswer);
      }
    } catch (error) {
      console.error("AI Generation Error:", error);
      alert("Failed to generate AI answer. Please try again later.");
    } finally {
      setSetIsSubmittingAI(false);
    }
  };

  return (
    <div className="mt-14 pt-10">
      <h2 className="text-2xl font-semibold mb-6">Write your Answer here</h2>

      {/* Generate AI Button */}
      <div className="flex justify-end mb-4">
        <Button
          className="flex items-center gap-2 bg-orange-100 dark:bg-orange-900/30 text-orange-600 hover:text-orange-800 dark:text-orange-300 hover:bg-orange-200 dark:hover:bg-orange-800/50 px-4 py-2 rounded-md font-medium shadow-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={generateAIAnswer}
          disabled={isSubmittingAI || isSubmitting}
        >
          <Sparkles
            className={`w-5 h-5 text-orange-500 ${
              isSubmittingAI ? "animate-spin" : ""
            }`}
          />
          {isSubmittingAI ? "Generating..." : "Generate Answer with AI"}
        </Button>
      </div>

      <Form {...form}>
        <form
          className="mt-6 flex w-full flex-col gap-10"
          onSubmit={form.handleSubmit(handleCreateAnswer)}
        >
          <FormField
            control={form.control}
            name="answer"
            render={({ field }) => (
              <FormItem className="w-full flex flex-col gap-5">
                <FormControl className="mt-2">
                  <Editor
                    apiKey={process.env.NEXT_PUBLIC_TINY_API_KEY}
                    onInit={(_evt: any, editor: any) => (editorRef.current = editor)}
                    onBlur={field.onBlur}
                    onEditorChange={(content: string) => field.onChange(content)}
                    initialValue=""
                    init={{
                      height: 400,
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
                      skin: isDark ? "oxide-dark" : "oxide",
                      content_css: isDark ? "dark" : "light",
                    }}
                  />
                </FormControl>
                <FormDescription
                  className={`text-sm mt-2 ${
                    isDark ? "text-zinc-400" : "text-zinc-700/90"
                  }`}
                >
                  Explain your Answer clearly and with enough details. Minimum
                  100 characters.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <Button
              type="submit"
              className="px-6 py-2 bg-orange-600 text-white font-semibold rounded-md hover:bg-orange-700/50 transition disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting || isSubmittingAI}
            >
              {isSubmitting
                ? "Submitting..."
                : isSubmittingAI
                ? "AI Generating..."
                : "Submit"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Answer;
