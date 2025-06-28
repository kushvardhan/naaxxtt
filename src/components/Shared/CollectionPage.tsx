"use client";

import LocalSearchBar from "@/components/Shared/Search/LocalSearchBar";
import Image from "next/image";
import Link from "next/link";
import { useContext, useState } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import { Button } from "./button";
import Filter from "./Filter";

type Tag = {
  _id: string;
  name: string;
};

type Author = {
  name: string;
  image: string;
};

type QuestionType = {
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
  mappedQuestions: QuestionType[];
};

const QuestionFilters = [
  { name: "Newest", value: "newest" },
  { name: "Most Viewed", value: "most_viewed" },
  { name: "Most Answered", value: "most_answered" },
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

  const day = date.getDate();
  const suffix =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
      ? "nd"
      : day % 10 === 3 && day !== 13
      ? "rd"
      : "th";

  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();

  return `${day}${suffix} ${month} ${year}`;
}

export default function ClientHomeQuestions({ mappedQuestions }: Props) {
  console.log("mapped client queestion: ", mappedQuestions);
  const theme = useContext(ThemeContext);
  const isDark = theme?.mode === "dark";
  const [searchQuery, setSearchQuery] = useState("");

  const questions = mappedQuestions || [];

  if (!theme) return null;

  return (
    <div
      className={`h-[calc(screen-120px)] w-full overflow-y-scroll scrollbar-hidden ${
        isDark ? "bg-black" : "bg-white"
      }`}
    >
      <div
        className={`flex w-full justify-between items-center py-3 px-2 gap-4 ${
          isDark ? "bg-black" : "bg-white"
        }`}
      >
        <h1
          className={`text-2xl lg:text-4xl font-bold font-mono ${
            isDark ? "text-zinc-100" : "text-black"
          }`}
        >
          Collection Page
        </h1>
        <Link href="/ask-question" className="flex justify-end items-center max-sm:w-full">
          <Button className="bg-orange-400 hover:bg-orange-500/100 text-md sm:text-sm sm:px-1/2 sm:py-1 font-mono tracking-tight min-h-[46px] px-3 py-2 font-bold transition-all text-center cursor-pointer">
            Ask Question
          </Button>
        </Link>
      </div>

      <div className={`mt-8 flex gap-4 flex-wrap items-center ${isDark ? "bg-black" : "bg-white"}`}>
        <LocalSearchBar
          route="/community"
          iconPosition="left"
          placeholder="Search for amazing questions"
          otherClasses="flex-1"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Filter filters={QuestionFilters} otherClasses="min-h-[56px] sm:min-w-[170px]" />
      </div>

      <div className="mt-8 flex w-full flex-col gap-6">
        {questions.length > 0 ? (
          questions.map((que) => (
            <div
              key={que._id}
              className={`w-full rounded-xl cursor-pointer border p-4 shadow-sm transition-all duration-200 hover:shadow-lg ${
                isDark
                  ? "bg-zinc-950 border-zinc-700 shadow-lg shadow-zinc-800"
                  : "bg-white border-zinc-300 shadow-md shadow-zinc-400"
              }`}
            >
              <Link href={`/question/${que._id}`}>
                <h2 className={`text-base sm:text-lg hover:underline font-semibold line-clamp-2 break-words ${
                  isDark ? "text-zinc-100" : "text-zinc-800"
                }`}>
                  {que.title}
                </h2>
              </Link>

                    <div className="mt-8 flex w-full flex-col gap-6">
        {questions.length > 0 ? (
          questions.map((que) => (
             <div
              key={que._id}
              className={`w-full rounded-xl cursor-pointer border p-4 shadow-sm transition-all duration-200 hover:shadow-lg ${
                isDark
                  ? "bg-zinc-950 border-zinc-700 shadow-lg shadow-zinc-800"
                  : "bg-white border-zinc-300 shadow-md shadow-zinc-400"
              }`}
            >
              <Link href={`/question/${que._id}`}>
                <h2 className={`text-base sm:text-lg hover:underline font-semibold line-clamp-2 break-words ${
                  isDark ? "text-zinc-100" : "text-zinc-800"
                }`}>
                  {que.title}
                </h2>
              </Link>

              <div className="mt-3 flex flex-wrap gap-2">
                {que.tags.map((tag) => (
                  <span
                    key={tag._id}
                    className={`rounded-md px-2 py-1 text-xs font-mono ${
                      isDark
                        ? "bg-zinc-700 text-white hover:bg-zinc-600"
                        : "bg-zinc-200 text-zinc-950 hover:bg-zinc-300"
                    }`}
                  >
                    {tag.name}
                  </span>
                ))}
              </div>

              <div className={`mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-sm ${
                isDark ? "text-zinc-400" : "text-zinc-500"
              }`}>
                <div className="flex items-center gap-3">
                  <Image
                    src={que.user.image}
                    alt={que.user.name}
                    width={24}
                    height={24}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                  <span className="text-sm font-medium">{que.user.name}</span>
                </div>
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
              ${isDark ? "bg-zinc-900 text-zinc-100" : "bg-white text-zinc-800"}`}
          >
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-300 rounded-xl shadow-md flex items-center justify-center text-3xl font-bold rotate-[-12deg]">
              ?
            </div>
            <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-pink-100 dark:bg-pink-900 text-pink-600 dark:text-pink-300 rounded-xl shadow-md flex items-center justify-center text-2xl font-bold rotate-[10deg]">
              ???
            </div>
            <p className="text-center text-2xl font-bold font-mono tracking-tighter">
              No Questions Found
            </p>
            <p className={`text-center mt-2 text-base font-medium select-none ${
              isDark ? "text-zinc-300/80" : "text-zinc-700"
            }`}>
              Be the first to break the silence! 🚀 Ask a Question and kickstart
              the discussion. Your query could be the next big thing others
              learn from. Get involved!
            </p>
            <div className="mt-8 flex justify-center">
              <Link
                href="/ask-question"
                className={`px-6 py-3 rounded-lg font-bold text-lg
                  bg-gradient-to-r from-orange-400 to-orange-600
                  hover:from-orange-500 hover:to-orange-700
                  text-white shadow-md transition
                  focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2
                  dark:from-orange-700 dark:to-orange-900 dark:hover:from-orange-800 dark:hover:to-orange-950`}
              >
                Ask a Question
              </Link>
            </div>
          </div>
        )}
      </div>

    </div>
  )
}
