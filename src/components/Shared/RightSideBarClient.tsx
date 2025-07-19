"use client";

import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../../context/ThemeContext";

interface RightSideBarClientProps {
  hotQuestions: { slug: string; question: string }[];
  popularTags: { tag: string; count: number }[];
}
const RightSideBarClient = ({
  hotQuestions,
  popularTags,
}: RightSideBarClientProps) => {
  const theme = useContext(ThemeContext);
  const [mounted, setMounted] = useState(false);

  console.log("hotQuestions from client: ", hotQuestions);
  console.log("popularTags from client: ", popularTags);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !theme || !theme.mounted) {
    return (
      <section
        className="sticky right-0 top-0 h-screen border-l p-6 pt-28 hidden lg:block lg:w-[300px] xl:w-[330px] bg-gray-200 dark:bg-gray-800"
        suppressHydrationWarning
      >
        <div
          className="h-full overflow-y-auto hide-scrollbar flex flex-col gap-6"
          suppressHydrationWarning
        >
          <div className="animate-pulse space-y-4" suppressHydrationWarning>
            <div
              className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/2"
              suppressHydrationWarning
            ></div>
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-16 bg-gray-300 dark:bg-gray-600 rounded"
                suppressHydrationWarning
              ></div>
            ))}
          </div>
          <div className="animate-pulse space-y-4" suppressHydrationWarning>
            <div
              className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/3"
              suppressHydrationWarning
            ></div>
            <div className="flex flex-wrap gap-2" suppressHydrationWarning>
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-8 bg-gray-300 dark:bg-gray-600 rounded-full w-16"
                  suppressHydrationWarning
                ></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  const bgColor =
    theme.mode === "dark"
      ? "bg-zinc-900 text-white border-zinc-800"
      : "bg-gradient-to-l from-white to-zinc-100/30 text-black border-zinc-200";

  const hoverBg =
    theme.mode === "dark" ? "hover:bg-black" : "hover:bg-zinc-300";

  return (
    <section
      className={`${bgColor} ${
        theme.mode === "light" ? "shadow-xl shadow-zinc-400/60" : ""
      } sticky right-0 top-0 h-screen border-l p-6 pt-28 hidden lg:block lg:w-[300px] xl:w-[330px]`}
      suppressHydrationWarning
    >
      <div className="h-full overflow-y-auto hide-scrollbar flex flex-col gap-6">
        <div>
          <h1 className="text-xl font-bold mb-3">Top Questions</h1>
          <div className="flex flex-col gap-2">
            {hotQuestions.map((que, ind) => (
              <Link
                href={que.slug}
                key={ind}
                className={`group flex justify-between items-center gap-3 rounded-md px-2 py-3 text-sm ${hoverBg} transition-all duration-200`}
              >
                <span className="flex-1 line-clamp-3.5">{que.question} jh</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
                </svg>
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h1 className="text-xl font-bold mb-4">Popular Tags</h1>
          <div className="flex flex-wrap gap-2">
            {popularTags.map(({ tag, count }, index) => (
              <Link
                href={`/tag/${tag.toLowerCase()}`}
                key={index}
                className={`flex items-center gap-2 px-2 py-1 rounded-full text-sm font-medium border ${
                  theme.mode === "dark"
                    ? "border-zinc-700 text-white hover:bg-orange-400/30"
                    : "border-zinc-300 text-black hover:bg-orange-200"
                } transition-all duration-200 whitespace-nowrap`}
              >
                #{tag}
                <span
                  className={`text-xs rounded-full px-2 py-0.5 ${
                    theme.mode === "dark"
                      ? "bg-zinc-800 text-zinc-300"
                      : "bg-zinc-200 text-zinc-700"
                  }`}
                >
                  {count || 0}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RightSideBarClient;
