"use client";

import { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import Image from "next/image";
import Link from "next/link";

interface Author {
  _id: string;
  clerkId: string;
  name: string;
  username: string;
  image: string;
  reputation: number;
}

interface Answer {
  _id: string;
  content: string;
  author: Author;
  upvotes: string[];
  downvotes: string[];
  createdAt: string;
}

interface AnswerCardProps {
  answer: Answer;
}

const AnswerCard = ({ answer }: AnswerCardProps) => {
  const theme = useContext(ThemeContext);
  const [mounted, setMounted] = useState(false);
  const [userVote, setUserVote] = useState<"upvote" | "downvote" | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !theme || !theme.mounted) {
    return (
      <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-2xl h-48">
        <div className="p-6 flex gap-4">
          <div className="w-8 h-20 bg-gray-300 dark:bg-gray-600 rounded"></div>
          <div className="flex-1 space-y-4">
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  const isDark = theme?.mode === "dark";

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleVote = (type: "upvote" | "downvote") => {
    if (userVote === type) {
      setUserVote(null);
    } else {
      setUserVote(type);
    }
  };

  const voteScore = answer.upvotes.length - answer.downvotes.length;

  return (
    <div
      className={`rounded-2xl border transition-all duration-300 hover:shadow-lg ${
        isDark
          ? "bg-zinc-900/50 border-zinc-800 hover:border-zinc-700"
          : "bg-white border-zinc-200 hover:border-zinc-300"
      }`}
    >
      <div className="p-8">
        <div className="flex gap-6">
          {/* Vote Section */}
          <div className="flex flex-col items-center gap-2">
            <button
              onClick={() => handleVote("upvote")}
              className={`p-2 rounded-lg transition-all duration-200 hover:scale-110 ${
                userVote === "upvote"
                  ? "bg-orange-500 text-white"
                  : isDark
                  ? "text-zinc-400 hover:text-orange-400 hover:bg-zinc-800"
                  : "text-zinc-600 hover:text-orange-600 hover:bg-orange-50"
              }`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </button>

            <div
              className={`text-lg font-bold font-mono ${
                voteScore > 0
                  ? "text-green-500"
                  : voteScore < 0
                  ? "text-red-500"
                  : isDark
                  ? "text-zinc-400"
                  : "text-zinc-600"
              }`}
            >
              {voteScore}
            </div>

            <button
              onClick={() => handleVote("downvote")}
              className={`p-2 rounded-lg transition-all duration-200 hover:scale-110 ${
                userVote === "downvote"
                  ? "bg-red-500 text-white"
                  : isDark
                  ? "text-zinc-400 hover:text-red-400 hover:bg-zinc-800"
                  : "text-zinc-600 hover:text-red-600 hover:bg-red-50"
              }`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" transform="rotate(180)">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </button>
          </div>

          {/* Answer Content */}
          <div className="flex-1">
            <div
              className={`prose prose-lg max-w-none mb-6 ${
                isDark ? "prose-invert" : ""
              }`}
              dangerouslySetInnerHTML={{ __html: answer.content }}
            />

            {/* Author Info */}
            <div className="flex items-center justify-between pt-6 border-t border-zinc-200 dark:border-zinc-700">
              <div className="flex items-center gap-4">
                <Image
                  src={answer.author.image}
                  alt={answer.author.name}
                  width={40}
                  height={40}
                  className="rounded-full border-2 border-orange-400"
                />
                <div>
                  <Link
                    href={`/profile/${answer.author.clerkId}`}
                    className={`font-semibold font-mono hover:text-orange-500 transition-colors ${
                      isDark ? "text-zinc-100" : "text-zinc-800"
                    }`}
                  >
                    {answer.author.name}
                  </Link>
                  <div className="flex items-center gap-2 text-sm">
                    <span className={isDark ? "text-zinc-400" : "text-zinc-600"}>
                      @{answer.author.username}
                    </span>
                    <span className="text-orange-500 font-semibold">
                      {answer.author.reputation.toLocaleString()} rep
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-sm text-zinc-500 dark:text-zinc-400 font-mono">
                answered {formatDate(answer.createdAt)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnswerCard;
