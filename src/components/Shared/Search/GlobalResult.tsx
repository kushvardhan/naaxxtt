"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IoReload } from "react-icons/io5";
import { globalSearch } from "../../../../lib/actions/general.action";
import GlobalFilters from "./GlobalFilters";

const GlobalResult = () => {
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState([
    { type: "question", id: 1, title: "Next.js question" },
    { type: "tag", id: 1, title: "Nextjs" },
    { type: "user", id: 1, title: "jsm" },
  ]);

  const global = searchParams.get("global");
  const type = searchParams.get("type");

  // Mock search history - in a real app, this would come from localStorage or a database
  const searchHistory = [
    { query: "React hooks", timestamp: "2 hours ago" },
    { query: "Next.js routing", timestamp: "1 day ago" },
    { query: "TypeScript interfaces", timestamp: "3 days ago" },
    { query: "MongoDB queries", timestamp: "1 week ago" },
  ];

  useEffect(() => {
    console.log(
      "🔍 GlobalResult: Effect triggered with global:",
      global,
      "type:",
      type
    ); // Debug log

    const fetchResult = async () => {
      console.log("🔍 GlobalResult: Starting search for:", global); // Debug log
      setResult([]);
      setIsLoading(true);

      try {
        const res = await globalSearch({ query: global, type });
        console.log("🔍 GlobalResult: Search response:", res);

        setResult(JSON.parse(res));
      } catch (error) {
        console.error("🔍 GlobalResult: Search error:", error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    };

    if (global) {
      fetchResult();
    } else {
      console.log("🔍 GlobalResult: No global query, skipping search"); // Debug log
    }
  }, [global, type]);

  const renderLink = (type: string, id: string) => {
    switch (type) {
      case "question":
      case "answer":
        return `/question/${id}`;
      case "user":
        return `/profile/${id}`;
      case "tag":
        return `/tags/${id}`;
      default:
        return "/";
    }
  };

  return (
<div className="absolute top-full z-10 mt-3 w-full max-h-96 overflow-y-scroll overflow-x-hidden scrollbar-hidden rounded-xl bg-white dark:bg-black border border-zinc-200 dark:border-zinc-700 py-5 shadow-lg dark:shadow-2xl backdrop-blur-sm">
      <GlobalFilters />
      <div className="my-5 h-[1px] bg-zinc-200 dark:bg-zinc-700" />

      <div className="space-y-3">
        <p className="px-5 text-base font-semibold text-zinc-700 dark:text-zinc-200">
          {global ? "Search Results" : "Recent Searches"}
        </p>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center px-5 py-8">
            <IoReload className="my-2 h-10 w-10 animate-spin text-orange-500" />
            <p className="text-sm font-normal text-zinc-500 dark:text-zinc-400">
              Searching the entire database...
            </p>
          </div>
        ) : !global ? (
          // Show search history when no search query
          <div className="flex flex-col gap-1">
            {searchHistory.map((historyItem, index) => (
              <div
                key={index}
                className="flex w-full cursor-pointer items-center gap-3 px-3 py-3 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-all duration-200 rounded-lg mx-2"
                onClick={() => {
                  // In a real app, you would trigger a search with this query
                  console.log("Search for:", historyItem.query);
                }}
              >
                <div className="flex-shrink-0">
                  <svg className="w-4 h-4 text-zinc-400 dark:text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                  <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    {historyItem.query}
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-500">
                    {historyItem.timestamp}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <svg className="w-4 h-4 text-zinc-400 dark:text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            ))}
            <div className="px-5 py-2">
              <button className="text-xs text-orange-500 hover:text-orange-600 font-medium">
                Clear search history
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            {result.length > 0 ? (
              result.map((item: any, index: number) => (
                <Link
                  href={renderLink(item.type, item.id)}
                  key={item.type + item.id + index}
                  className="flex w-full cursor-pointer items-start gap-3 px-3 py-3 hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-all duration-200 rounded-lg mx-2 border border-transparent hover:border-orange-200 dark:hover:border-orange-800 group"
                >
                  <div className="flex-shrink-0 mt-1">
                    {item.type === "question" && (
                      <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                        <svg
                          className="w-3 h-3 text-blue-600 dark:text-blue-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                    {item.type === "user" && (
                      <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                        <svg
                          className="w-3 h-3 text-green-600 dark:text-green-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                    {item.type === "tag" && (
                      <div className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                        <svg
                          className="w-3 h-3 text-purple-600 dark:text-purple-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                    {item.type === "answer" && (
                      <div className="w-6 h-6 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                        <svg
                          className="w-3 h-3 text-orange-600 dark:text-orange-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col flex-1 min-w-0">
                    <p className="line-clamp-1 text-sm font-medium text-zinc-800 dark:text-zinc-200 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
                      {item.title}
                    </p>
                    <p className="mt-1 text-xs font-medium text-zinc-500 dark:text-zinc-500 capitalize">
                      {item.type}
                    </p>
                  </div>

                  <div className="flex-shrink-0">
                    <svg
                      className="w-4 h-4 text-zinc-400 dark:text-zinc-600 group-hover:text-orange-500 transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </Link>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center px-5 py-8">
                <div className="text-4xl mb-3">🔍</div>
                <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-1">
                  No results found
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-500">
                  Try adjusting your search terms
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GlobalResult;
