"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import AnswerCardProfile from "./AnswerCardProfile";
import ErrorBoundary from "./ErrorBoundary";

interface ProfileTabsProps {
  userId: string;
  searchParams: { [key: string]: string | undefined };
}

const ProfileTabs = ({ userId, searchParams }: ProfileTabsProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="mt-10 flex gap-10">
        <div className="flex-1">
          <div className="animate-pulse">
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded mb-6"></div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-32 bg-gray-200 dark:bg-gray-700 rounded"
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="mt-10 flex gap-10">
        <Tabs defaultValue="top-posts" className="flex-1">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger
              value="top-posts"
              className="px-4 py-2 text-sm rounded-md transition-all dark:data-[state=active]:bg-blue-800 dark:data-[state=active]:text-white data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              Top Posts
            </TabsTrigger>
            <TabsTrigger
              value="answers"
              className="px-4 py-2 text-sm rounded-md transition-all dark:data-[state=active]:bg-blue-800 dark:data-[state=active]:text-white data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              Answers
            </TabsTrigger>
          </TabsList>

          <TabsContent value="top-posts" className="mt-6">
            <ErrorBoundary
              fallback={
                <div className="text-center py-8 text-zinc-600 dark:text-zinc-400">
                  Unable to load questions. Please try refreshing the page.
                </div>
              }
            >
              <QuestionTabContent userId={userId} searchParams={searchParams} />
            </ErrorBoundary>
          </TabsContent>

          <TabsContent value="answers" className="mt-6">
            <ErrorBoundary
              fallback={
                <div className="text-center py-8 text-zinc-600 dark:text-zinc-400">
                  Unable to load answers. Please try refreshing the page.
                </div>
              }
            >
              <AnswerTabContent userId={userId} searchParams={searchParams} />
            </ErrorBoundary>
          </TabsContent>
        </Tabs>
      </div>
    </ErrorBoundary>
  );
};

const QuestionTabContent = ({
  userId,
  searchParams,
}: {
  userId: string;
  searchParams: any;
}) => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const theme = useContext(ThemeContext);
  const isDark = theme?.mode === "dark";

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !userId) return;

    let cancelled = false;

    const loadQuestions = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `/api/user-questions?userId=${userId}&page=${searchParams?.page || 1}`
        );

        if (cancelled) return;

        if (!response.ok) {
          throw new Error("Failed to fetch questions");
        }

        const data = await response.json();

        if (!cancelled) {
          setQuestions(data.questions || []);
        }
      } catch (err) {
        console.error("Error loading questions:", err);
        if (!cancelled) {
          setError("Failed to load questions");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    const timeoutId = setTimeout(loadQuestions, 100);

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [userId, searchParams?.page, mounted]);

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-2xl h-32"
          ></div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-600 dark:text-red-400">
        {error}
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="text-center py-12 text-zinc-600 dark:text-zinc-400">
        <div className="text-6xl mb-4">📝</div>
        <h3 className="text-xl font-semibold mb-2">No questions yet</h3>
        <p className="text-sm">Start asking questions to see them here!</p>
      </div>
    );
  }

  return (
    <div className="mt-8 flex w-full flex-col gap-6">
      {questions.map((question) => (
        <div
          key={question._id}
          className={`w-full rounded-xl cursor-pointer border p-4 shadow-sm transition-all duration-200 hover:shadow-lg
            ${
              isDark
                ? "bg-zinc-950 border-zinc-700 shadow-lg shadow-zinc-800"
                : "bg-white border-zinc-300 shadow-md shadow-zinc-400"
            }
          `}
        >
          {/* Title */}
          <Link href={`/question/${question._id}`}>
            <h2
              className={`text-base sm:text-lg hover:underline font-semibold line-clamp-2 break-words
              ${
                isDark
                  ? "text-zinc-100 hover:text-blue-300"
                  : "text-zinc-800 hover:text-blue-700"
              }
            `}
            >
              {question.title}
            </h2>
          </Link>

          {/* Tags */}
          <div className="mt-3 flex flex-wrap gap-2">
            {question.tags?.map((tag: any) => (
              <span
                key={tag._id}
                title={tag.name}
                className={`rounded-md cursor-pointer px-2 py-1 text-xs font-mono
                  ${
                    isDark
                      ? "bg-zinc-700 text-white hover:bg-zinc-600 transition-all"
                      : "bg-zinc-200 text-zinc-950 hover:bg-zinc-300 transition-all"
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
                src={
                  question.author?.image ||
                  "https://banner2.cleanpng.com/20180416/gbw/avfp7lvmb.webp"
                }
                alt={question.author?.name || "User"}
                width={24}
                height={24}
                className={`h-8 w-8 rounded-full object-cover ${
                  isDark
                    ? "border-1 border-orange-700"
                    : "border-2 border-orange-500"
                } `}
              />

              <Link
                title={`clerkId: ${question.author?.clerkId}`}
                href={`/profile/${question.author?.clerkId}`}
              >
                <span className="text-sm font-medium">
                  {question.author?.name || "Unknown User"}
                </span>
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
                {question.upvotes?.length || 0}
              </span>

              {/* Answers */}
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
                    d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
                  />
                </svg>
                {question.answers?.length || 0}
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
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-4"
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
                {question.views || 0}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// AnswerTabContent - Using AnswerCardProfile with pagination (2 answers per page)
const AnswerTabContent = ({
  userId,
  searchParams,
}: {
  userId: string;
  searchParams: any;
}) => {
  const [answers, setAnswers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !userId) return;

    let cancelled = false;

    const loadAnswers = async () => {
      try {
        setLoading(true);
        setError(null);

        const page = searchParams?.page || currentPage;
        // Use API route with pagination (2 answers per page)
        const response = await fetch(
          `/api/user-answers?userId=${userId}&page=${page}&pageSize=2`
        );

        if (cancelled) return;

        if (!response.ok) {
          throw new Error("Failed to fetch answers");
        }

        const data = await response.json();

        if (!cancelled) {
          setAnswers(data.answers || []);
          setTotalPages(Math.ceil((data.totalAnswers || 0) / 2));
        }
      } catch (err) {
        console.error("Error loading answers:", err);
        if (!cancelled) {
          setError("Failed to load answers");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    const timeoutId = setTimeout(loadAnswers, 100);

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [userId, searchParams?.page, currentPage, mounted]);

  if (!mounted) {
    return (
      <div className="space-y-6" suppressHydrationWarning>
        {[1, 2].map((i) => (
          <div
            key={i}
            className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-2xl h-48"
            suppressHydrationWarning
          ></div>
        ))}
      </div>
    );
  }

  if (loading) {
    return (
      <div className="space-y-8 flex flex-col gap-4">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-2xl h-48"
          ></div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-600 dark:text-red-400 mb-4">{error}</div>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
        >
          Refresh Page
        </button>
      </div>
    );
  }

  if (answers.length === 0) {
    return (
      <div className="text-center py-12 text-zinc-600 dark:text-zinc-400">
        <div className="text-6xl mb-4">💭</div>
        <h3 className="text-xl font-semibold mb-2">No answers yet</h3>
        <p className="text-sm">Start answering questions to see them here!</p>
      </div>
    );
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="max-w-space-y-6  flex flex-col gap-4">
      {answers.map((answer) => (
        <AnswerCardProfile
          key={answer._id}
          answer={answer}
          currentUserId={userId}
        />
      ))}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            className={`px-4 py-2 rounded-lg font-mono transition-colors ${
              currentPage <= 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-orange-500 text-white hover:bg-orange-600"
            }`}
          >
            Previous
          </button>

          <span className="text-sm text-zinc-600 dark:text-zinc-400">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className={`px-4 py-2 rounded-lg font-mono transition-colors ${
              currentPage >= totalPages
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-orange-500 text-white hover:bg-orange-600"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileTabs;
