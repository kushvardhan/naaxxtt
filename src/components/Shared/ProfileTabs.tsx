"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
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
                <div key={i} className="h-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
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
              <QuestionTabClient userId={userId} searchParams={searchParams} />
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
              <AnswerTabClient userId={userId} searchParams={searchParams} />
            </ErrorBoundary>
          </TabsContent>
        </Tabs>
      </div>
    </ErrorBoundary>
  );
};

// Client-side wrapper for QuestionTab
const QuestionTabClient = ({ userId, searchParams }: { userId: string; searchParams: any }) => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Import the action dynamically to avoid SSR issues
        const { getUserQuestions } = await import("../../../lib/actions/user.action");
        
        const result = await getUserQuestions({
          userId,
          page: searchParams.page ? +searchParams.page : 1,
        });
        
        setQuestions(result.questions || []);
      } catch (err) {
        console.error("Error loading questions:", err);
        setError("Failed to load questions");
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      loadQuestions();
    }
  }, [userId, searchParams.page]);

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-2xl h-32"></div>
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

// Client-side wrapper for AnswerTab
const AnswerTabClient = ({ userId, searchParams }: { userId: string; searchParams: any }) => {
  const [answers, setAnswers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAnswers = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Import the action dynamically to avoid SSR issues
        const { getUserAnswers } = await import("../../../lib/actions/user.action");
        
        const result = await getUserAnswers({
          userId,
          page: searchParams.page ? +searchParams.page : 1,
        });
        
        setAnswers(result.answers || []);
      } catch (err) {
        console.error("Error loading answers:", err);
        setError("Failed to load answers");
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      loadAnswers();
    }
  }, [userId, searchParams.page]);

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-2xl h-32"></div>
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

  if (answers.length === 0) {
    return (
      <div className="text-center py-12 text-zinc-600 dark:text-zinc-400">
        <div className="text-6xl mb-4">💭</div>
        <h3 className="text-xl font-semibold mb-2">No answers yet</h3>
        <p className="text-sm">Start answering questions to see them here!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {answers.map((answer) => (
        <div
          key={answer._id}
          className="bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:border-zinc-300 dark:hover:border-zinc-700"
        >
          <div className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">
            Answer to: {answer.question?.title || "Unknown Question"}
          </div>
          <div className="prose prose-zinc dark:prose-invert max-w-none">
            {answer.content?.substring(0, 200)}...
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProfileTabs;
