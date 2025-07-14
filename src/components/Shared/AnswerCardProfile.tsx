"use client";

import {
  BookmarkIcon,
  CalendarIcon,
  ChatBubbleLeftIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  HandThumbDownIcon,
  HandThumbUpIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";
import {
  BookmarkIcon as BookmarkSolidIcon,
  HandThumbDownIcon as HandThumbDownSolidIcon,
  HandThumbUpIcon as HandThumbUpSolidIcon,
} from "@heroicons/react/24/solid";
import { clsx } from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import parse from "html-react-parser";
import Image from "next/image";
import { useState } from "react";

interface Author {
  clerkId: string;
  image: string;
  name: string;
  _id: string;
}

interface Question {
  title: string;
  _id: string;
}

interface Answer {
  _id: string;
  author: Author;
  content: string;
  createdAt: Date | string;
  downvotes: string[];
  question: Question;
  upvotes: string[];
  __v: number;
}

interface AnswerCardProfileProps {
  answer: Answer;
  currentUserId?: string;
  onVote?: (answerId: string, voteType: "upvote" | "downvote") => void;
  onBookmark?: (answerId: string) => void;
  isBookmarked?: boolean;
}

export default function AnswerCardProfile({
  answer,
  currentUserId,
  onVote,
  onBookmark,
  isBookmarked = false,
}: AnswerCardProfileProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVoting, setIsVoting] = useState(false);

  const upvotesArray = Array.isArray(answer.upvotes) ? answer.upvotes : [];
  const downvotesArray = Array.isArray(answer.downvotes)
    ? answer.downvotes
    : [];

  const hasUpvoted = currentUserId
    ? upvotesArray.includes(currentUserId)
    : false;
  const hasDownvoted = currentUserId
    ? downvotesArray.includes(currentUserId)
    : false;

  const formatDate = (date: Date | string) => {
    const dateObj = typeof date === "string" ? new Date(date) : date;
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
    const month = monthNames[dateObj.getMonth()];
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();
    const hours = dateObj.getHours().toString().padStart(2, "0");
    const minutes = dateObj.getMinutes().toString().padStart(2, "0");
    return `${month} ${day}, ${year} at ${hours}:${minutes}`;
  };

  const truncateContent = (content: string, maxLength = 300) => {
    const textContent = content
      .replace(/<[^>]*>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    if (textContent.length <= maxLength) return content;

    // Find a good breaking point
    const truncated = textContent.substring(0, maxLength);
    const lastSpace = truncated.lastIndexOf(" ");
    const breakPoint = lastSpace > maxLength * 0.8 ? lastSpace : maxLength;

    return textContent.substring(0, breakPoint) + "...";
  };

  const handleVote = async (voteType: "upvote" | "downvote") => {
    if (!onVote || !currentUserId || isVoting) return;

    setIsVoting(true);
    try {
      await onVote(answer._id, voteType);
    } finally {
      setIsVoting(false);
    }
  };

  const handleBookmark = () => {
    if (!onBookmark || !currentUserId) return;
    onBookmark(answer._id);
  };

  const displayContent = isExpanded
    ? answer.content
    : truncateContent(answer.content);
  const shouldShowExpand = answer.content.replace(/<[^>]*>/g, "").length > 300;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
    >
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-800 mb-3 leading-tight">
              {answer.question.title}
            </h2>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Image
                  src={answer.author.image || "/placeholder.svg"}
                  alt={answer.author.name}
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <span className="font-medium text-gray-700">
                    {answer.author.name}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <CalendarIcon className="w-4 h-4" />
                <span>{formatDate(answer.createdAt)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="mb-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={isExpanded ? "expanded" : "collapsed"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="prose prose-gray max-w-none"
            >
              <div className="text-gray-700 leading-relaxed [&>pre]:bg-gray-900 [&>pre]:text-gray-100 [&>pre]:p-4 [&>pre]:rounded-lg [&>pre]:overflow-x-auto [&>code]:bg-gray-100 [&>code]:px-1 [&>code]:py-0.5 [&>code]:rounded [&>code]:text-sm">
                {parse(displayContent)}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div className="flex items-center gap-4">
            {/* Voting */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => handleVote("upvote")}
                disabled={isVoting || !currentUserId}
                className={clsx(
                  "flex items-center gap-1 px-3 py-1.5 rounded-lg transition-all duration-200",
                  hasUpvoted
                    ? "bg-green-100 text-green-700"
                    : "text-gray-600 hover:bg-green-50 hover:text-green-600",
                  isVoting && "opacity-50 cursor-not-allowed"
                )}
              >
                {hasUpvoted ? (
                  <HandThumbUpSolidIcon className="w-4 h-4" />
                ) : (
                  <HandThumbUpIcon className="w-4 h-4" />
                )}
                <span className="text-sm font-medium">
                  {upvotesArray.length}
                </span>
              </button>

              <button
                onClick={() => handleVote("downvote")}
                disabled={isVoting || !currentUserId}
                className={clsx(
                  "flex items-center gap-1 px-3 py-1.5 rounded-lg transition-all duration-200",
                  hasDownvoted
                    ? "bg-red-100 text-red-700"
                    : "text-gray-600 hover:bg-red-50 hover:text-red-600",
                  isVoting && "opacity-50 cursor-not-allowed"
                )}
              >
                {hasDownvoted ? (
                  <HandThumbDownSolidIcon className="w-4 h-4" />
                ) : (
                  <HandThumbDownIcon className="w-4 h-4" />
                )}
                <span className="text-sm font-medium">
                  {downvotesArray.length}
                </span>
              </button>
            </div>

            {/* Other actions */}
            <button className="flex items-center gap-1 px-3 py-1.5 text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-all duration-200">
              <ChatBubbleLeftIcon className="w-4 h-4" />
              <span className="text-sm">Comment</span>
            </button>

            <button
              onClick={handleBookmark}
              disabled={!currentUserId}
              className={clsx(
                "flex items-center gap-1 px-3 py-1.5 rounded-lg transition-all duration-200",
                isBookmarked
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
              )}
            >
              {isBookmarked ? (
                <BookmarkSolidIcon className="w-4 h-4" />
              ) : (
                <BookmarkIcon className="w-4 h-4" />
              )}
              <span className="text-sm">Save</span>
            </button>

            <button className="flex items-center gap-1 px-3 py-1.5 text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-all duration-200">
              <ShareIcon className="w-4 h-4" />
              <span className="text-sm">Share</span>
            </button>
          </div>

          {/* Expand/Collapse */}
          {shouldShowExpand && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-1 px-3 py-1.5 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all duration-200"
            >
              <span className="text-sm font-medium">
                {isExpanded ? "Show Less" : "Show More"}
              </span>
              {isExpanded ? (
                <ChevronUpIcon className="w-4 h-4" />
              ) : (
                <ChevronDownIcon className="w-4 h-4" />
              )}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
