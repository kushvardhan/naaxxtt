"use client";

import { useContext, useState } from "react";
import { ThemeContext } from "../../../../context/ThemeContext";
import Link from "next/link";
import { Button } from "../../../components/Shared/button";
import LocalSearchBar from "@/components/Shared/Search/LocalSearchBar";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/Shared/dropdown-menu";

export default function Home() {
  const theme = useContext(ThemeContext);
  const isDark = theme?.mode === "dark";

const questions = [
  {
    _id: 1,
    title: "Cascading Deletes in SQLAlchemy?",
    tags: [{ _id: 1, name: "python" }, { _id: 2, name: "sqlalchemy" }],
    user: {
      _id: 1,
      name: "John Doe",
      image: "https://github.com/shadcn.png",
    },
    upvotes: 10,
    likes: 5,
    createdAt: "2021-01-01",
    answers: 2,
    views: 10,
  },
  {
    _id: 2,
    title: "How to use useEffect properly in React?",
    tags: [{ _id: 3, name: "react" }, { _id: 4, name: "javascript" }],
    user: {
      _id: 2,
      name: "Alice Smith",
      image: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    upvotes: 25,
    likes: 18,
    createdAt: "2023-08-12",
    answers: 5,
    views: 120,
  },
  {
    _id: 3,
    title: "Best practices for MongoDB schema design?",
    tags: [{ _id: 5, name: "mongodb" }, { _id: 1, name: "python" }],
    user: {
      _id: 3,
      name: "Robert Miles",
      image: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    upvotes: 15,
    likes: 12,
    createdAt: "2022-03-30",
    answers: 3,
    views: 80,
  },
  {
    _id: 4,
    title: "TypeScript vs JavaScript: When to choose what?",
    tags: [{ _id: 6, name: "typescript" }, { _id: 4, name: "javascript" }],
    user: {
      _id: 4,
      name: "Clara Jensen",
      image: "https://randomuser.me/api/portraits/women/4.jpg",
    },
    upvotes: 30,
    likes: 22,
    createdAt: "2023-11-18",
    answers: 4,
    views: 140,
  },
  {
    _id: 5,
    title: "How to handle async errors in Node.js?",
    tags: [{ _id: 7, name: "node.js" }, { _id: 1, name: "python" }],
    user: {
      _id: 5,
      name: "Mike Taylor",
      image: "https://randomuser.me/api/portraits/men/5.jpg",
    },
    upvotes: 18,
    likes: 14,
    createdAt: "2024-02-25",
    answers: 2,
    views: 60,
  },
  {
    _id: 6,
    title:
      "Building responsive layouts with Tailwind C g responsive layouts with Tailwind C g responsive layouts with Tailwind CSS?",
    tags: [{ _id: 8, name: "css" }, { _id: 9, name: "tailwindcss" }],
    user: {
      _id: 6,
      name: "Emily Zhang",
      image: "https://randomuser.me/api/portraits/women/6.jpg",
    },
    upvotes: 22,
    likes: 17,
    createdAt: "2024-05-02",
    answers: 1,
    views: 90,
  },
  {
    _id: 7,
    title: "What is REST API and how does it work?",
    tags: [{ _id: 10, name: "api" }, { _id: 11, name: "rest" }],
    user: {
      _id: 7,
      name: "David Lee",
      image: "https://randomuser.me/api/portraits/men/7.jpg",
    },
    upvotes: 40,
    likes: 30,
    createdAt: "2021-09-10",
    answers: 7,
    views: 300,
  },
  {
    _id: 8,
    title: "How to optimize performance in Next.js?",
    tags: [{ _id: 12, name: "next.js" }, { _id: 6, name: "typescript" }],
    user: {
      _id: 8,
      name: "Sara Ali",
      image: "https://randomuser.me/api/portraits/women/8.jpg",
    },
    upvotes: 35,
    likes: 26,
    createdAt: "2024-07-01",
    answers: 3,
    views: 200,
  },
];


  const Tags = [
    { tag: "JavaScript" },
    { tag: "React" },
    { tag: "Next.js aRCHITECHTURE" },
    { tag: "MongoDB" },
  
    { tag: "Node.js" },
    { tag: "CSS" },
    { tag: "HTML" },
    { tag: "TypeScript" },
    { tag: "Express" },
    { tag: "Node.js" },
    { tag: "CSS" },
    { tag: "HTML" },
    { tag: "TypeScript" },
    { tag: "Express" },
  ];

  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  if (!theme) return null;

  return (
    <div className={`h-[calc(100vh-120px)] w-full mt-20 ${isDark ? "bg-black" : "bg-white"} `}>
      {/* Header */}
      <div
        className={`flex w-full justify-between items-center py-3 px-2 gap-4 ${
          isDark ? "bg-black" : "bg-white"
        }`}
      >
        <h1
          className={`text-2xl font-bold font-mono ${
            isDark ? "text-white" : "text-black"
          }`}
        >
          All Questions
        </h1>
        <Link href="/ask-question" className="flex justify-end max-sm:w-full">
          <Button className="bg-orange-400 min-h-[46px] px-4 py-3 font-semibold">
            Ask Question
          </Button>
        </Link>
      </div>

      {/* Search + Dropdown for tags */}
      <div
        className={`mt-8 flex gap-4 flex-wrap items-center ${
          isDark ? "bg-black" : "bg-white"
        }`}
      >
        {/* Search Bar */}
        <LocalSearchBar
          route="/"
          iconPosition="left"
          placeholder="Search for questions"
          otherClasses="flex-1"
        />

        {/* Dropdown for sm/md screens */}
        {/* Dropdown for sm/md screens */}
<div className="block lg:hidden">
  <DropdownMenu>
<DropdownMenuTrigger asChild>
  <Button className="font-mono px-3 py-2 text-sm flex items-center gap-3">
    Select Filters
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-4 h-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m19.5 8.25-7.5 7.5-7.5-7.5"
      />
    </svg>
  </Button>
</DropdownMenuTrigger>

    <DropdownMenuContent
      className={`w-48 rounded-md py-1 px-2 max-h-56 overflow-y-auto ${
        isDark ? "bg-zinc-900 text-white" : "bg-white text-black"
      }`}
      style={{
        scrollbarWidth: "none", 
        msOverflowStyle: "none", 
      }}
    >
      <div
        className="flex flex-col gap-1"
        style={{
          overflowY: "scroll",
          scrollbarWidth: "none", // Firefox
        }}
      >
        {Tags.map((item, idx) => (
          <DropdownMenuCheckboxItem
            key={idx}
            checked={selectedTags.includes(item.tag)}
            onCheckedChange={() => toggleTag(item.tag)}
            className={`font-mono text-sm border-b last:border-none ${
  isDark
    ? "border-zinc-700 hover:bg-zinc-900"
    : "border-gray-200 hover:bg-gray-300"
}`}

            style={{
              WebkitScrollbar: "none", // Chrome/Safari
            }}
          >
            {item.tag}
          </DropdownMenuCheckboxItem>
        ))}
      </div>
    </DropdownMenuContent>
  </DropdownMenu>
</div>

      </div>

      {/* Tags for large screens - Show only first 6 */}
      <div className="hidden lg:flex flex-wrap gap-3 mt-4">
        {Tags.slice(0, 6).map((item, idx) => (
          <Button
            key={idx}
            className={`text-xs px-2 py-0.5 font-mono rounded-md hover:cursor-pointer ${
              isDark
                ? "bg-zinc-700 text-white hover:bg-zinc-600"
                : "bg-gray-200/70 text-black hover:bg-gray-300"
            }`}
          >
            {item.tag}
          </Button>
        ))}
      </div>
<div className="mt-8 flex w-full flex-col gap-6">
  {questions.length > 0 ? (
    questions.map((que) => (
<div
  key={que._id}
  className={`w-full rounded-xl border p-4 shadow-sm transition-all duration-200 hover:shadow-md
    ${isDark ? 'bg-zinc-900 border-zinc-700' : 'bg-white border-zinc-200'}
  `}
>
  {/* Title */}
  <h2
    className={`text-base sm:text-lg font-semibold line-clamp-2 break-words
      ${isDark ? 'text-zinc-100' : 'text-zinc-800'}
    `}
  >
    {que.title}
  </h2>

  {/* Tags */}
  <div className="mt-3 flex flex-wrap gap-2">
    {que.tags.map((tag) => (
      <span
        key={tag._id}
        className={`rounded-md px-2 py-0.5 text-xs font-mono
          ${isDark ? 'bg-zinc-700 text-white' : 'bg-zinc-100 text-zinc-700'}
        `}
      >
        {tag.name}
      </span>
    ))}
  </div>

  {/* Meta Info */}
  <div
    className={`mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-sm
      ${isDark ? 'text-zinc-400' : 'text-zinc-500'}
    `}
  >
    {/* User */}
    <div className="flex items-center gap-3">
      <img
        src={que.user.image}
        alt={que.user.name}
        className="h-8 w-8 rounded-full object-cover"
      />
      <span className="text-sm font-medium">{que.user.name}</span>
    </div>

    {/* Stats */}
    <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm">
      {/* Upvotes */}
      <span className={`flex items-center gap-1 ${isDark ? 'text-white' : 'text-red-600'}`}>
        <svg
          className="w-4 h-4"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          stroke="none"
        >
          <path d="M12.781 2.375c-.381-.475-1.181-.475-1.562 0l-8 10A1.001 1.001 0 0 0 4 14h4v7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7h4a1.001 1.001 0 0 0 .781-1.625l-8-10zM15 12h-1v8h-4v-8H6.081L12 4.601 17.919 12H15z" />
        </svg>
        {que.upvotes}
      </span>

      {/* Comments */}
      <span className={`flex items-center gap-1 ${isDark ? 'text-zinc-100' : 'text-zinc-700'}`}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4.5">
  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
</svg>

        {que.answers}
      </span>

      {/* Views */}
      <span className={`flex items-center gap-1 ${isDark ? 'text-zinc-100' : 'text-zinc-700'}`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
        </svg>
        {que.views}
      </span>

      {/* Like */}
      <span className={`flex items-center gap-1 ${isDark ? 'text-zinc-100' : 'text-zinc-700'}`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
          />
        </svg>
        {que.likes}
      </span>

      {/* Date */}
      <span>{new Date(que.createdAt).toLocaleDateString()}</span>
    </div>
  </div>
</div>


    ))
  ) : (
    <p className="text-center text-zinc-500 dark:text-zinc-300">No questions found</p>
  )}
</div>


    </div>
  );
}
