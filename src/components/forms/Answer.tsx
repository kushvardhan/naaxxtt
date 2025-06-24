"use client";

import React from 'react';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from 'react-hook-form';
import {AnswerSchema} from '@/lib/validations';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const Answer=()=>{
    const form = useForm<z.infer<typeof AnswerSchema>>({
        resolver: zodResolver(AnswerSchema),
        defaultValues:{
            answer: ''
        }
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

    return (
        <Form {...form}>
            <form className='mt-6 flex w-full flex-col gap-10' 
            onSubmit={form.handleSubmit(handleCreateAnswer)}
            >
                <FormField control={form.control} name="explanation" render={({ field }) => ( <FormItem className="w-full flex flex-col gap-5"> <FormLabel className={`font-semibold text-regular ${ isDark ? "text-white" : "text-black" }`} > Detailed explanation of your problem <span className={`${ isDark ? "text-red-400 font-semibold" : "text-red-600 font-semibold text-xl" }`} > * </span>{" "} </FormLabel> <FormControl className="mt-2"> <Editor apiKey={process.env.NEXT_PUBLIC_TINY_API_KEY} onInit={(_evt, editor) => (editorRef.current = editor)} onBlur={field.onBlur} onEditorChange={(content) => field.onChange(content)} initialValue="" init={{ height: 500, menubar: false, plugins: [ "advlist", "autolink", "lists", "link", "image", "charmap", "preview", "anchor", "searchreplace", "visualblocks", "code", "fullscreen", "insertdatetime", "media", "table", "codesample", "help", "wordcount", ], toolbar: "undo redo | blocks | bold italic forecolor | " + "alignleft aligncenter alignright alignjustify | bullist numlist | codesample", toolbar_mode: "wrap", content_style: contentStyle, }} /> </FormControl> <FormDescription className={`text-sm mt-2 ${ isDark ? "text-zinc-400" : "text-zinc-700/90" }`} > Introduce the problem and expand on what you put in the title. Mininum 100 characters. </FormDescription> <FormMessage /> </FormItem> )} />
            </form>
        </Form>
    )
}