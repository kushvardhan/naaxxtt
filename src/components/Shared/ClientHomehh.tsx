"use client";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/Shared/dropdown-menu";
import LocalSearchBar from "@/components/Shared/Search/LocalSearchBar";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import { Button } from "./button";

type Tag = {
  _id: string;
  name: string;
};

type Author = {
  name: string;
  image: string;
  clerkId: string;
  userId: string;
};

type Question = {
  _id: string;
  title: string;
  tags: Tag[];
  user: Author;
  upvotes: number;
  answers: number;
  views: number;
  createdAt: string;
};

type Props = {
  mappedQuestions: Question[];
  searchParams?: { [key: string]: string | string[] | undefined };
};

const Tags = [
  { tag: "python" },
  { tag: "json" },
  { tag: "file-io" },
  { tag: "data" },
  { tag: "dictionary" },
  { tag: "serialization" },
];

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now.getTime() - date.getTime();

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const weeks = Math.floor(days / 7);

  if (minutes < 1) return `${seconds} seconds ago`;
  if (hours < 1) return `${minutes} minutes ago`;
  if (days < 1) return `${hours} hours ago`;
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${weeks} weeks ago`;

  // If older than a month - use fixed month names to avoid locale issues
  const day = date.getDate();
  const suffix =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
      ? "nd"
      : day % 10 === 3 && day !== 13
      ? "rd"
      : "th";

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  return `${day}${suffix} ${month} ${year}`;
}

export default function ClientHomehh({
  mappedQuestions,
  searchParams = {},
}: Props) {
  const theme = useContext(ThemeContext);
  const isDark = theme?.mode === "dark";
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Initialize search from URL params
    if (searchParams.q && typeof searchParams.q === "string") {
      setSearchQuery(searchParams.q);
    }
  }, [searchParams.q]);

  if (!mounted || !theme || !theme.mounted) {
    return (
      <div className="w-full h-full" suppressHydrationWarning>
        <div className="animate-pulse space-y-6" suppressHydrationWarning>
          <div
            className="h-12 bg-gray-200 dark:bg-gray-700 rounded"
            suppressHydrationWarning
          ></div>
          <div
            className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3"
            suppressHydrationWarning
          ></div>
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-32 bg-gray-200 dark:bg-gray-700 rounded"
              suppressHydrationWarning
            ></div>
          ))}
        </div>
      </div>
    );
  }

  const questions = mappedQuestions || [];

  // console.log("mp que: ", mappedQuestions);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  if (!theme) return null;

  return (
    <div
      className={`h-[calc(screen-120px)] w-full overflow-y-scroll scrollbar-hidden ${
        isDark ? "bg-black" : "bg-white"
      }`}
      suppressHydrationWarning
    >
      {/* Header */}
      <div
        className={`flex w-full justify-between items-center scrollbar-hidden py-3 px-2 gap-4 ${
          isDark ? "bg-black" : "bg-white"
        }`}
      >
        <h1
          className={`text-2xl lg:text-5xl font-bold font-mono ${
            isDark ? "text-zinc-100" : "text-black"
          }`}
        >
          All Questions
        </h1>
        <Link
          href="/ask-question"
          className="flex justify-end items-center max-sm:w-full"
        >
          <Button className="bg-orange-400 hover:bg-orange-500/100 text-md sm:text-sm sm:px-1/2 sm:py-1 font-mono tracking-tight min-h-[46px] px-3 py-2 font-bold transition-all text-center cursor-pointer">
            Ask Question
          </Button>
        </Link>
      </div>

      {/* Search + Dropdown for tags */}
      <div
        className={`mt-8 flex gap-4 flex-wrap items-center  ${
          isDark ? "bg-black" : "bg-white"
        }`}
      >
        {/* Search Bar */}
        <LocalSearchBar
          route="/"
          iconPosition="left"
          placeholder="Search for questions"
          otherClasses="flex-1 "
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

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
                  msOverflowStyle: "none",
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
                    style={{}}
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
            className={`text-xs cursor-pointer px-2 py-0.5 font-mono rounded-md ${
              isDark
                ? "bg-zinc-900 border border-zinc-600 text-white hover:bg-zinc-950 hover:shadow-lg hover:shadow-zinc-700 transition-all duration-400"
                : "bg-gray-100/70 border border-zinc-400/50 hover:bg-yellow-100/30 hover:shadow-lg hover:shadow-zinc-400 text-black transition-all duration-400"
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
              className={`w-full rounded-xl cursor-pointer border p-4 shadow-sm transition-all duration-200 hover:shadow-lg
                ${
                  isDark
                    ? "bg-zinc-950 border-zinc-700 shadow-lg shadow-zinc-800"
                    : "bg-white border-zinc-300 shadow-md shadow-zinc-400"
                }
              `}
            >
              {/* Title */}

              <Link href={`/question/${que._id}`}>
                <h2
                  className={`text-base sm:text-lg hover:underline font-semibold line-clamp-2 break-words
                  ${
                    isDark
                      ? "text-zinc-100 hover:text-blue-300"
                      : "text-zinc-800 hover:text-blue-700"
                  }
                `}
                >
                  {que.title}
                </h2>
              </Link>

              {/* Tags */}
              <div className="mt-3 flex flex-wrap gap-2">
                {que.tags.map((tag) => (
                  <span
                    key={tag._id}
                    title={tag.name}
                    className={`rounded-md cursor-pointer px-2 py-1 text-xs font-mono
                      ${
                        isDark
                          ? "bg-zinc-700 text-white hover:bg-zinc-600 transition-all"
                          : "bg-zinc-200 text-zinc-950 hover:bg-zinc-300 transition-all "
                      }
                    `}
                  >
                    {tag.name}
                  </span>
                ))}
              </div>

              {/* Meta Info */}
              <div
                className={`mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-sm
                  ${isDark ? "text-zinc-400" : "text-zinc-500"}
                `}
              >
                {/* User */}
                <div className="flex items-center gap-3">
                  <Image
                    src={que.user.image}
                    alt={que.user.name}
                    width={24}
                    height={24}
                    className={`h-8 w-8 rounded-full object-cover ${
                      isDark
                        ? "border-1 border-orange-700"
                        : "border-2 border-orange-500"
                    } `}
                  />

                  <Link
                    title={`clerkId: ${que?.user?.clerkId}`}
                    href={`/profile/${que?.user?.clerkId}`}
                  >
                    <span className="text-sm font-medium">{que.user.name}</span>
                  </Link>
                </div>

                {/* Stats */}
                <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm">
                  {/* Upvotes */}
                  <span
                    title="Upvote"
                    className={`flex items-center gap-1 ${
                      isDark ? "text-white" : "text-red-600"
                    }`}
                  >
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
                  <span
                    title="Answer"
                    className={`flex items-center gap-1 ${
                      isDark ? "text-zinc-100" : "text-zinc-700"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-4.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                      />
                    </svg>
                    {que.answers}
                  </span>

                  {/* Views */}
                  <span
                    title="Views"
                    className={`flex items-center gap-1 ${
                      isDark ? "text-zinc-100" : "text-zinc-700"
                    }`}
                  >
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
                  {/* If you want to show likes, you can add a likes property to mappedQuestions */}
                  {/* <span
                    title="Like"
                    className={`flex items-center gap-1 ${
                      isDark ? "text-zinc-100" : "text-zinc-700"
                    }`}
                  >
                    <svg ... />
                    {que.likes}
                  </span> */}

                  {/* Date */}
                  <span
                    title="Created At"
                    className={`text-xs spacing-tighter font-semibold select-none ${
                      isDark ? "text-zinc-300" : "text-zinc-700"
                    }`}
                  >
                    {formatDate(que.createdAt)}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div
            className={`relative max-w-xl mx-auto p-8 rounded-3xl transition-all duration-300 overflow-hidden shadow-md
              ${isDark ? "bg-zinc-900 text-zinc-100" : "bg-white text-zinc-800"}
            `}
          >
            {/* Mini Floating Cards */}
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-300 rounded-xl shadow-md flex items-center justify-center text-3xl font-bold rotate-[-12deg]">
              ?
            </div>
            <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-pink-100 dark:bg-pink-900 text-pink-600 dark:text-pink-300 rounded-xl shadow-md flex items-center justify-center text-2xl font-bold rotate-[10deg]">
              ???
            </div>

            {/* SVG Illustration */}
            <div className="flex justify-center mb-6">
              {/* your SVG code */}
            </div>

            {/* Message */}
            <p className="text-center text-2xl font-bold font-mono tracking-tighter">
              No Questions Found
            </p>
            <p
              className={`text-center mt-2 text-base font-medium select-none ${
                isDark ? "text-zinc-300/80" : "text-zinc-700"
              }`}
            >
              Be the first to break the silence! 🚀 Ask a Question and kickstart
              the discussion. Your query could be the next big thing others
              learn from. Get involved!
            </p>

            {/* Ask a Question Button */}
            <div className="mt-8 flex justify-center">
              <Link
                href="/ask-question"
                className={`
                  px-6 py-3 rounded-lg font-bold text-lg
                  bg-gradient-to-r from-orange-400 to-orange-600
                  hover:from-orange-500 hover:to-orange-700
                  text-white shadow-md transition
                  focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2
                  dark:from-orange-700 dark:to-orange-900 dark:hover:from-orange-800 dark:hover:to-orange-950
                `}
              >
                Ask a Question
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
