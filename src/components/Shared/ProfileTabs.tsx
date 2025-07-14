"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import ErrorBoundary from "./ErrorBoundary";
import AnswerCardProfile from "./AnswerCardProfile";

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

        // Use API route instead of server action to prevent infinite loops
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

  if (!mounted) {
    return (
      <div className="space-y-4" suppressHydrationWarning>
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-2xl h-32"
            suppressHydrationWarning
          ></div>
        ))}
      </div>
    );
  }

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
    <div className="space-y-6">
      {questions.map((question) => (
        <div
          key={question._id}
          className="bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:border-zinc-300 dark:hover:border-zinc-700"
        >
          <h3 className="text-lg font-semibold mb-2 text-zinc-800 dark:text-zinc-200">
            {question.title}
          </h3>
          <div className="flex items-center gap-4 text-sm text-zinc-600 dark:text-zinc-400">
            <span>{question.upvotes?.length || 0} upvotes</span>
            <span>{question.answers?.length || 0} answers</span>
            <span>{question.views || 0} views</span>
          </div>
        </div>
      ))}
    </div>
  );
};

// AnswerTabContent - Using AnswerCardProfile with pagination (2 answers per page)
const AnswerTabContent = ({ userId, searchParams }: { userId: string; searchParams: any }) => {
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
        const response = await fetch(`/api/user-answers?userId=${userId}&page=${page}&pageSize=2`);

        if (cancelled) return;

        if (!response.ok) {
          throw new Error('Failed to fetch answers');
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
          <div key={i} className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-2xl h-48" suppressHydrationWarning></div>
        ))}
      </div>
    );
  }

  if (loading) {
    return (
      <div className="space-y-6">
        {[1, 2].map((i) => (
          <div key={i} className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-2xl h-48"></div>
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
    <div className="space-y-6">
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
