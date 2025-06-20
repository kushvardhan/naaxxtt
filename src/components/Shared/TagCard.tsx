"use client";

import { Tag } from "@/app/(root)/tags/page";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../../context/ThemeContext";

interface TagCardProps {
  tag: Tag;
}

const TagCard = ({ tag }: TagCardProps) => {
  const theme = useContext(ThemeContext);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !theme || !theme.mounted) {
    return <div className="h-24 w-48 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse" />;
  }

  const isDark = theme?.mode === "dark";

  // Color indicator based on question volume
  const popularityDotColor =
    tag.questions.length > 50
      ? "bg-red-500"
      : tag.questions.length > 20
      ? "bg-orange-500"
      : tag.questions.length > 10
      ? "bg-blue-500"
      : "bg-zinc-500";

  return (
    <Link href={`/tags/${tag._id}`}>
      <div
        className={`group w-48 p-4 rounded-xl border font-mono transition-all duration-300 hover:shadow-lg hover:-translate-y-1
        ${isDark ? "bg-zinc-900 border-zinc-700 text-zinc-200" : "bg-white border-zinc-200 text-zinc-800"}`}
      >
        {/* Tag Header */}
        <div className="relative max-w-[140px] truncate">
  <span
  title={tag.name}
    className={`text-md font-semibold transition-opacity duration-300 ${
      isDark ? "text-orange-500" : "text-orange-700"
    }`}
  >
    #{tag.name}
  </span>
  <span
    className={`absolute left-0 top-full mt-1 w-max max-w-xs px-2 py-1 text-sm rounded-md z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap ${
      isDark ? "bg-zinc-800 text-zinc-100" : "bg-zinc-100 text-zinc-800"
    }`}
  >
    #{tag.name}
  </span>
</div>

          <div className={`w-2 h-2 rounded-full text-green-600 ${popularityDotColor}`} />
        </div>

        {/* Stats */}
        <div className={`text-xs space-y-1 ${isDark ? "text-zinc-300" : "text-zinc-700"}`}>
          <div className="flex justify-between">
            <span>Questions</span>
            <span className="text-orange-500 font-semibold">
              {tag.questions.length}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Followers</span>
            <span className="text-orange-500 font-semibold">
              {tag.followers.length}
            </span>
          </div>
        </div>

        {/* Hover action */}
        <div
          className={`mt-3 text-center text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300
          ${isDark ? "text-orange-400" : "text-orange-600"}`}
        >
          Click to explore
        </div>
      </div>
    </Link>
  );
};

export default TagCard;
