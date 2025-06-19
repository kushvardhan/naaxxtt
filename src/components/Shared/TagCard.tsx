"use client";

import { useContext } from "react";
import Link from "next/link";
import { ThemeContext } from "../../../context/ThemeContext";
import { Tag } from "@/app/(root)/tags/page";

interface TagCardProps {
  tag: Tag;
}

const TagCard = ({ tag }: TagCardProps) => {
  const theme = useContext(ThemeContext);

  if (!theme || !theme.mounted) {
    return (
      <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-2xl h-48 w-80">
        <div className="p-6 flex flex-col space-y-4">
          <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
          <div className="h-16 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
          <div className="flex justify-between">
            <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-20"></div>
            <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
          </div>
        </div>
      </div>
    );
  }

  const isDark = theme?.mode === "dark";

  // Format creation date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  // Get tag color based on popularity
  const getTagColor = () => {
    const questionCount = tag.questions.length;
    if (questionCount > 50) return "from-orange-500 to-red-500";
    if (questionCount > 20) return "from-blue-500 to-purple-500";
    if (questionCount > 10) return "from-green-500 to-blue-500";
    return "from-zinc-500 to-zinc-600";
  };

  return (
    <Link href={`/tags/${tag._id}`}>
      <div
        className={`group relative overflow-hidden rounded-3xl transition-all duration-500 hover:scale-[1.03] hover:-translate-y-3 w-80 min-w-[320px] max-w-[380px] cursor-pointer ${
          isDark
            ? "bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 border border-zinc-700/50 hover:border-orange-500/50 shadow-2xl hover:shadow-orange-500/20"
            : "bg-gradient-to-br from-white via-zinc-50 to-white border border-zinc-200/50 hover:border-orange-400/50 shadow-2xl hover:shadow-orange-500/30"
        }`}
      >
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/8 via-transparent to-orange-600/8"></div>
          <div className="absolute top-0 left-0 w-32 h-32 bg-orange-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-orange-600/10 rounded-full blur-2xl"></div>
        </div>

        {/* Card Content */}
        <div className="relative p-8 flex flex-col space-y-6">
          
          {/* Tag Header */}
          <div className="flex items-center justify-between">
            <div
              className={`inline-flex items-center px-4 py-2 rounded-full text-white font-mono font-bold text-lg bg-gradient-to-r ${getTagColor()} shadow-lg`}
            >
              #{tag.name}
            </div>
            <div
              className={`text-sm font-mono ${
                isDark ? "text-zinc-400" : "text-zinc-600"
              }`}
            >
              {formatDate(tag.createdOn)}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-3">
            <p
              className={`text-sm leading-relaxed line-clamp-3 ${
                isDark ? "text-zinc-300" : "text-zinc-700"
              }`}
            >
              {tag.description || "No description available for this tag."}
            </p>
          </div>

          {/* Stats Section */}
          <div className="flex justify-between items-center">
            <div
              className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all duration-300 flex-1 mr-2 ${
                isDark
                  ? "bg-gradient-to-br from-zinc-800 to-zinc-700 border-zinc-600 group-hover:border-orange-500/50"
                  : "bg-gradient-to-br from-zinc-50 to-white border-zinc-300 group-hover:border-orange-400/50"
              }`}
            >
              <div className="text-center">
                <div
                  className={`text-2xl font-bold font-mono ${
                    isDark ? "text-orange-400" : "text-orange-600"
                  }`}
                >
                  {tag.questions.length}
                </div>
                <div
                  className={`text-xs font-mono uppercase tracking-wider ${
                    isDark ? "text-zinc-400" : "text-zinc-600"
                  }`}
                >
                  Questions
                </div>
              </div>
              
              <div className="text-center">
                <div
                  className={`text-2xl font-bold font-mono ${
                    isDark ? "text-orange-400" : "text-orange-600"
                  }`}
                >
                  {tag.followers.length}
                </div>
                <div
                  className={`text-xs font-mono uppercase tracking-wider ${
                    isDark ? "text-zinc-400" : "text-zinc-600"
                  }`}
                >
                  Followers
                </div>
              </div>
            </div>
          </div>

          {/* Action Section */}
          <div className="w-full">
            <div
              className={`w-full text-center py-4 px-6 rounded-2xl font-mono text-base font-bold transition-all duration-300 group-hover:scale-105 group-hover:-translate-y-2 group-hover:shadow-2xl ${
                isDark
                  ? "bg-gradient-to-r from-orange-600 via-orange-500 to-orange-600 text-white group-hover:from-orange-500 group-hover:via-orange-400 group-hover:to-orange-500 shadow-lg shadow-orange-500/25"
                  : "bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 text-white group-hover:from-orange-400 group-hover:via-orange-500 group-hover:to-orange-400 shadow-lg shadow-orange-500/25"
              }`}
            >
              Explore Tag
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TagCard;
