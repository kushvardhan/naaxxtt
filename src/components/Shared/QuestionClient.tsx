"use client";

import { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import Image from "next/image";
import Link from "next/link";
import AnswerForm from "./AnswerForm";
import AnswerCard from "./AnswerCard";

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

interface Answer {
  _id: string;
  content: string;
  author: Author;
  upvotes: string[];
  downvotes: string[];
  createdAt: string;
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
  answers: Answer[];
  createdAt: string;
  updatedAt: string;
}

interface QuestionClientProps {
  question: Question;
}

const QuestionClient = ({ question }: QuestionClientProps) => {
  const theme = useContext(ThemeContext);
  const [mounted, setMounted] = useState(false);
  const [userVote, setUserVote] = useState<"upvote" | "downvote" | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !theme || !theme.mounted) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
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

  const voteScore = question.upvotes.length - question.downvotes.length;

  return (
    <div className="w-full max-w-5xl mx-auto" suppressHydrationWarning>
      {/* Question Header */}
      <div className="mb-8">
        <h1
          className={`text-3xl lg:text-4xl font-bold font-mono mb-4 leading-tight ${
            isDark ? "text-zinc-100" : "text-zinc-800"
          }`}
        >
          {question.title}
        </h1>

        {/* Question Meta */}
        <div className="flex flex-wrap items-center gap-4 text-sm font-mono">
          <span className={isDark ? "text-zinc-400" : "text-zinc-600"}>
            Asked {formatDate(question.createdAt)}
          </span>
          <span className={isDark ? "text-zinc-400" : "text-zinc-600"}>
            Modified {formatDate(question.updatedAt)}
          </span>
          <span className={isDark ? "text-zinc-400" : "text-zinc-600"}>
            Viewed {question.views.toLocaleString()} times
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Vote Section */}
        <div className="lg:col-span-1">
          <div className="flex lg:flex-col items-center lg:items-start gap-2 lg:sticky lg:top-6">
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
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </button>

            <div
              className={`text-xl font-bold font-mono ${
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
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" transform="rotate(180)">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-11">
          {/* Question Content */}
          <div
            className={`rounded-2xl border p-8 mb-8 ${
              isDark
                ? "bg-zinc-900/50 border-zinc-800"
                : "bg-white border-zinc-200"
            }`}
          >
            <div
              className={`prose prose-lg max-w-none ${
                isDark ? "prose-invert" : ""
              }`}
              dangerouslySetInnerHTML={{ __html: question.content }}
            />

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-zinc-200 dark:border-zinc-700">
              {question.tags.map((tag) => (
                <Link
                  key={tag._id}
                  href={`/tags/${tag._id}`}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-mono bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 hover:bg-orange-200 dark:hover:bg-orange-900/50 transition-colors duration-200"
                >
                  #{tag.name}
                </Link>
              ))}
            </div>

            {/* Author Info */}
            <div className="flex items-center justify-between mt-6 pt-6 border-t border-zinc-200 dark:border-zinc-700">
              <div className="flex items-center gap-4">
                <Image
                  src={question.author.image}
                  alt={question.author.name}
                  width={48}
                  height={48}
                  className="rounded-full border-2 border-orange-400"
                />
                <div>
                  <Link
                    href={`/profile/${question.author.clerkId}`}
                    className={`font-semibold font-mono hover:text-orange-500 transition-colors ${
                      isDark ? "text-zinc-100" : "text-zinc-800"
                    }`}
                  >
                    {question.author.name}
                  </Link>
                  <div className="flex items-center gap-2 text-sm">
                    <span className={isDark ? "text-zinc-400" : "text-zinc-600"}>
                      @{question.author.username}
                    </span>
                    <span className="text-orange-500 font-semibold">
                      {question.author.reputation.toLocaleString()} rep
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-sm text-zinc-500 dark:text-zinc-400 font-mono">
                asked {formatDate(question.createdAt)}
              </div>
            </div>
          </div>

          {/* Answers Section */}
          <div className="mb-8">
            <h2
              className={`text-2xl font-bold font-mono mb-6 ${
                isDark ? "text-zinc-100" : "text-zinc-800"
              }`}
            >
              {question.answers.length} Answer{question.answers.length !== 1 ? "s" : ""}
            </h2>

            <div className="space-y-6">
              {question.answers.map((answer) => (
                <AnswerCard key={answer._id} answer={answer} />
              ))}
            </div>
          </div>

          {/* Answer Form */}
          <AnswerForm questionId={question._id} />
        </div>
      </div>
    </div>
  );
};

export default QuestionClient;
