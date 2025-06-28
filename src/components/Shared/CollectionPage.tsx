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
  result: QuestionType[];
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

export default function ClientHomeQuestions({ result }: Props) {
  const theme = useContext(ThemeContext);
  const isDark = theme?.mode === "dark";
  const [searchQuery, setSearchQuery] = useState("");

  const questions = result || [];

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
          className={`text-2xl lg:text-5xl font-bold font-mono ${
            isDark ? "text-zinc-100" : "text-black"
          }`}
        >
          Co
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
                  <span className={isDark ? "text-white" : "text-red-600"}>{que.upvotes} upvotes</span>
                  <span className={isDark ? "text-zinc-100" : "text-zinc-700"}>{que.answers} answers</span>
                  <span className={isDark ? "text-zinc-100" : "text-zinc-700"}>{que.views} views</span>
                  <span className={isDark ? "text-zinc-300" : "text-zinc-700"}>{formatDate(que.createdAt)}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className={`text-center text-xl font-bold font-mono ${isDark ? "text-zinc-100" : "text-zinc-800"}`}>
            No Questions Found.
          </p>
        )}
      </div>
    </div>
  );
}
