"use client";

import { useEffect, useState } from "react";
import ErrorBoundary from "./ErrorBoundary";

interface SimpleAnswerTabProps {
  userId: string;
}

const SimpleAnswerTab = ({ userId }: SimpleAnswerTabProps) => {
  const [answers, setAnswers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

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

        // Simple delay to prevent rapid calls
        await new Promise(resolve => setTimeout(resolve, 500));
        
        if (cancelled) return;

        // Direct fetch instead of dynamic import to avoid issues
        const response = await fetch(`/api/user-answers?userId=${userId}&page=1`);
        
        if (cancelled) return;
        
        if (!response.ok) {
          throw new Error('Failed to fetch answers');
        }
        
        const data = await response.json();
        
        if (!cancelled) {
          setAnswers(data.answers || []);
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

    // Debounce the call
    const timeoutId = setTimeout(loadAnswers, 200);

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [userId, mounted]);

  if (!mounted) {
    return (
      <div className="space-y-4" suppressHydrationWarning>
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-2xl h-32" suppressHydrationWarning></div>
        ))}
      </div>
    );
  }

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

  return (
    <ErrorBoundary>
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
              <div dangerouslySetInnerHTML={{ 
                __html: answer.content?.substring(0, 200) + "..." || "No content" 
              }} />
            </div>
            <div className="flex items-center gap-4 mt-4 text-sm text-zinc-600 dark:text-zinc-400">
              <span>{answer.upvotes?.length || 0} upvotes</span>
              <span>{answer.downvotes?.length || 0} downvotes</span>
              <span>
                {answer.createdAt ? new Date(answer.createdAt).toLocaleDateString() : "Unknown date"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </ErrorBoundary>
  );
};

export default SimpleAnswerTab;
