"use client";

import LocalSearchBar from "@/components/Shared/Search/LocalSearchBar";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/Shared/dropdown-menu";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../../../context/ThemeContext";
import { getQuestions } from "../../../../lib/actions/question.action";
import { Button } from "../../../components/Shared/button";

export default function ClientHome() {
  const theme = useContext(ThemeContext);
  const isDark = theme?.mode === "dark";

  const [searchQuery, setSearchQuery] = useState("");
  const [questions, setQuestions] = useState<any[]>([]);

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
  ];

  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const result = await getQuestions({});
        setQuestions(result.questions);
      } catch (err) {
        console.error("Failed to fetch questions:", err);
      }
    };

    fetchQuestions();
  }, []);

  if (!theme) return null;

  return (
    <div
      className={`h-[calc(100vh-120px)] w-full mt-20 ${
        isDark ? "bg-black" : "bg-white"
      }`}
    >
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
          <Button className="bg-orange-400 hover:bg-orange-600/80 text-md font-mono tracking-tight min-h-[46px] px-3 py-2 font-semibold transition-all cursor-pointer">
            Ask Question
          </Button>
        </Link>
      </div>

      {/* Search + Tags */}
      <div
        className={`mt-8 flex gap-4 flex-wrap items-center ${
          isDark ? "bg-black" : "bg-white"
        }`}
      >
        <LocalSearchBar
          route="/"
          iconPosition="left"
          placeholder="Search for questions"
          otherClasses="flex-1"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

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
                >
                  {item.tag}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Tags for large screens */}
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

      {/* Question List */}
      <div className="mt-8 flex w-full flex-col gap-6">
        {questions.length > 0 ? (
          questions.map((que) => (
            <div
              key={que._id}
              className={`w-full rounded-xl border p-4 shadow-sm transition-all duration-200 hover:shadow-md ${
                isDark ? "bg-zinc-900 border-zinc-700" : "bg-white border-zinc-200"
              }`}
            >
              <h2
                className={`text-base sm:text-lg font-semibold line-clamp-2 break-words ${
                  isDark ? "text-zinc-100" : "text-zinc-800"
                }`}
              >
                {que.title}
              </h2>

              <div className="mt-3 flex flex-wrap gap-2">
                {que.tags.map((tag) => (
                  <span
                    key={tag._id}
                    className={`rounded-md px-2 py-0.5 text-xs font-mono ${
                      isDark
                        ? "bg-zinc-700 text-white"
                        : "bg-zinc-100 text-zinc-700"
                    }`}
                  >
                    {tag.name}
                  </span>
                ))}
              </div>

              <div
                className={`mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-sm ${
                  isDark ? "text-zinc-400" : "text-zinc-500"
                }`}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={que.user.image}
                    alt={que.user.name}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                  <span className="text-sm font-medium">{que.user.name}</span>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm">
                  <span
                    title="Upvote"
                    className={`flex items-center gap-1 ${
                      isDark ? "text-white" : "text-red-600"
                    }`}
                  >
                    ▲ {que.upvotes}
                  </span>
                  <span
                    title="Answer"
                    className={`flex items-center gap-1 ${
                      isDark ? "text-zinc-100" : "text-zinc-700"
                    }`}
                  >
                    💬 {que.answers}
                  </span>
                  <span>{que.views} views</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p
            className={`mt-6 text-center text-sm ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            No questions found.
          </p>
        )}
      </div>
    </div>
  );
}
