"use client";

import LocalSearchBar from "@/components/Shared/Search/LocalSearchBar";
import { Button } from "@/components/Shared/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/Shared/dropdown-menu";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useMemo, useState } from "react";
import { ThemeContext } from "../../../context/ThemeContext";

interface Author {
  _id: string;
  clerkId: string;
  name: string;
  username: string;
  image: string;
  reputation: number;
}

interface Tag {
  _id: string;
  name: string;
}

interface Question {
  _id: string;
  title: string;
  content: string;
  author: Author;
  tags: Tag[];
  upvotes: string[];
  downvotes: string[];
  views: number;
  answers: number;
  createdAt: string;
}

interface QuestionsClientProps {
  questions: Question[];
}

const QuestionsClient = ({ questions }: QuestionsClientProps) => {
  const theme = useContext(ThemeContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredQuestions = useMemo(() => {
    let filtered = questions;

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (question) =>
          question.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          question.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
          question.author.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          question.tags.some((tag) =>
            tag.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    }

    // Sort by filters
    if (selectedFilters.length > 0) {
      const primaryFilter = selectedFilters[0];
      switch (primaryFilter) {
        case "Newest":
          filtered = filtered.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          break;
        case "Oldest":
          filtered = filtered.sort(
            (a, b) =>
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
          break;
        case "Most Voted":
          filtered = filtered.sort(
            (a, b) => b.upvotes.length - a.upvotes.length
          );
          break;
        case "Most Answered":
          filtered = filtered.sort((a, b) => b.answers - a.answers);
          break;
        case "Most Viewed":
          filtered = filtered.sort((a, b) => b.views - a.views);
          break;
        default:
          break;
      }
    }

    return filtered;
  }, [questions, searchQuery, selectedFilters]);

  if (!mounted || !theme || !theme.mounted) {
    return (
      <div
        className="flex items-center justify-center h-64"
        suppressHydrationWarning
      >
        <div
          className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"
          suppressHydrationWarning
        ></div>
      </div>
    );
  }

  const isDark = theme?.mode === "dark";

  const Filters = [
    { filter: "Newest" },
    { filter: "Oldest" },
    { filter: "Most Voted" },
    { filter: "Most Answered" },
    { filter: "Most Viewed" },
  ];

  const toggleFilter = (filter: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
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
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  };

  return (
    <div
      className="h-[calc(screen-120px)] w-full overflow-y-scroll scrollbar-hidden"
      suppressHydrationWarning
    >
      {/* Header */}
      <div className="mb-8">
        <h1
          className={`text-3xl lg:text-4xl font-bold font-mono tracking-wide mb-2 ${
            isDark ? "text-zinc-100" : "text-black"
          }`}
        >
          <span className="tracking-wider">All Questions</span>
        </h1>
        <p
          className={`text-sm font-mono ${
            isDark ? "text-zinc-400" : "text-zinc-600"
          }`}
        >
          Browse and discover questions from our community
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 flex gap-4 flex-wrap items-center">
        <LocalSearchBar
          route="/questions"
          iconPosition="left"
          placeholder="Search questions..."
          otherClasses="flex-1 min-w-[300px]"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="font-mono px-4 py-2 text-sm flex items-center gap-2 min-w-[140px]"
            >
              Sort By
              {selectedFilters.length > 0 && (
                <span className="bg-orange-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                  {selectedFilters.length}
                </span>
              )}
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
            className={`w-48 rounded-lg py-2 px-1 ${
              isDark
                ? "bg-zinc-900 border-zinc-700"
                : "bg-white border-zinc-200"
            }`}
          >
            {Filters.map((item, idx) => (
              <DropdownMenuCheckboxItem
                key={idx}
                checked={selectedFilters.includes(item.filter)}
                onCheckedChange={() => toggleFilter(item.filter)}
                className={`font-mono text-sm rounded-md mx-1 my-0.5 ${
                  isDark
                    ? "hover:bg-zinc-800 text-zinc-200"
                    : "hover:bg-zinc-100 text-zinc-800"
                }`}
              >
                {item.filter}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Link
          href="/ask-question"
          className="px-4 py-2 bg-orange-500 text-white font-mono font-semibold rounded-lg hover:bg-orange-600 transition-colors duration-200"
        >
          Ask Question
        </Link>
      </div>

      {/* Stats Bar */}
      <div
        className={`mb-6 p-4 rounded-lg border ${
          isDark
            ? "bg-zinc-900/50 border-zinc-800 text-zinc-300"
            : "bg-zinc-50 border-zinc-200 text-zinc-600"
        }`}
      >
        <div className="flex flex-wrap gap-6 text-sm font-mono">
          <span>
            <strong className={isDark ? "text-zinc-100" : "text-zinc-800"}>
              {filteredQuestions.length}
            </strong>{" "}
            {filteredQuestions.length === 1 ? "question" : "questions"} found
          </span>
          <span>
            <strong className={isDark ? "text-zinc-100" : "text-zinc-800"}>
              {questions.length}
            </strong>{" "}
            total questions
          </span>
          {searchQuery && (
            <span>
              Searching for: <strong>&quot;{searchQuery}&quot;</strong>
            </span>
          )}
          {selectedFilters.length > 0 && (
            <span>
              Sorted by: <strong>{selectedFilters.join(", ")}</strong>
            </span>
          )}
        </div>
      </div>

      {/* Questions List */}
      {filteredQuestions.length > 0 ? (
        <div className="space-y-4">
          {filteredQuestions.map((question, index) => (
            <div
              key={question._id}
              className={`p-6 rounded-xl border transition-all duration-300 hover:shadow-lg animate-in fade-in slide-in-from-bottom-4 ${
                isDark
                  ? "bg-zinc-900/50 border-zinc-800 hover:border-zinc-700"
                  : "bg-white border-zinc-200 hover:border-zinc-300"
              }`}
              style={{
                animationDelay: `${index * 50}ms`,
                animationFillMode: "both",
              }}
            >
              <div className="flex gap-6">
                {/* Stats */}
                <div className="flex flex-col items-center gap-2 min-w-[80px]">
                  <div
                    className={`text-center ${
                      isDark ? "text-zinc-300" : "text-zinc-700"
                    }`}
                  >
                    <div className="text-lg font-bold font-mono">
                      {question.upvotes.length}
                    </div>
                    <div className="text-xs font-mono">votes</div>
                  </div>
                  <div
                    className={`text-center ${
                      isDark ? "text-zinc-300" : "text-zinc-700"
                    }`}
                  >
                    <div className="text-lg font-bold font-mono">
                      {question.answers}
                    </div>
                    <div className="text-xs font-mono">answers</div>
                  </div>
                  <div
                    className={`text-center ${
                      isDark ? "text-zinc-300" : "text-zinc-700"
                    }`}
                  >
                    <div className="text-lg font-bold font-mono">
                      {question.views}
                    </div>
                    <div className="text-xs font-mono">views</div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <Link
                    href={`/question/${question._id}`}
                    className={`text-xl font-semibold font-mono mb-3 block hover:text-orange-500 transition-colors ${
                      isDark ? "text-zinc-100" : "text-zinc-800"
                    }`}
                  >
                    {question.title}
                  </Link>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {question.tags.map((tag) => (
                      <Link
                        key={tag._id}
                        href={`/tags/${tag._id}`}
                        className="inline-flex items-center px-2 py-1 rounded-md text-xs font-mono bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 hover:bg-orange-200 dark:hover:bg-orange-900/50 transition-colors duration-200"
                      >
                        {tag.name}
                      </Link>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Image
                        src={question.author.image}
                        alt={question.author.name}
                        width={32}
                        height={32}
                        className="rounded-full border-2 border-orange-400"
                      />
                      <div>
                        <Link
                          href={`/profile/${question.author.clerkId}`}
                          className={`font-semibold font-mono text-sm hover:text-orange-500 transition-colors ${
                            isDark ? "text-zinc-100" : "text-zinc-800"
                          }`}
                        >
                          {question.author.name}
                        </Link>
                        <div className="text-xs text-orange-500 font-semibold">
                          {question.author.reputation.toLocaleString()} rep
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-zinc-500 dark:text-zinc-400 font-mono">
                      asked {formatDate(question.createdAt)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div
          className={`text-center py-20 ${
            isDark ? "text-zinc-400" : "text-zinc-600"
          }`}
        >
          <div className="text-6xl mb-4">❓</div>
          <h3 className="text-xl font-mono font-semibold mb-2">
            No questions found
          </h3>
          <p className="text-sm">
            {searchQuery || selectedFilters.length > 0
              ? "Try adjusting your search or filters"
              : "Be the first to ask a question!"}
          </p>
          {(searchQuery || selectedFilters.length > 0) && (
            <Button
              variant="outline"
              className="mt-4 font-mono"
              onClick={() => {
                setSearchQuery("");
                setSelectedFilters([]);
              }}
            >
              Clear filters
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default QuestionsClient;
