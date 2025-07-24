"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "../../../../context/ThemeContext";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery, removeKeysFromQuery } from "../../../../lib/utils";
import { Input } from "./input";


function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

// const Input = ({ className, type, variant = "default", isDark = false, ...props }) => {
//   const isBare = variant === "bare";
//   return (
//     <input
//       type={type}
//       data-slot="input"
//       className={cn(
//         isBare
//           ? cn(
//               "w-full bg-transparent font-mono border-none outline-none focus:outline-none focus:ring-0 focus:border-none shadow-none px-0 py-0 text-lg",
//               isDark
//                 ? "text-white placeholder:text-zinc-400"
//                 : "text-black placeholder:text-zinc-500 font-mono placeholder:font-semibold"
//             )
//           : cn(
//               "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
//               className
//             ),
//         className
//       )}
//       {...props}
//     />
//   );
// };

const GlobalSearch = () => {
  const theme = useContext(ThemeContext);
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchContainerRef = useRef(null);

  const query = searchParams.get("q");
  const [search, setSearch] = useState(query || "");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
        setSearch("");
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [pathname]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "global",
          value: search,
        });
        router.push(newUrl, { scroll: false });
      } else if (query) {
        const newUrl = removeKeysFromQuery({
          params: searchParams.toString(),
          keysToRemove: ["global", "type"],
        });
        router.push(newUrl, { scroll: false });
      }
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [search, router, pathname, searchParams, query]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    const timeoutId = setTimeout(async () => {
      setIsSearching(true);
      try {
        const mockResults = [
          {
            type: "question",
            id: "1",
            title: `How to fix React hydration errors related to "${searchQuery}"?`,
            excerpt: "Learn how to resolve hydration mismatches in React applications...",
          },
          {
            type: "question",
            id: "2",
            title: `Best practices for ${searchQuery} in Next.js`,
            excerpt: "Discover the most effective approaches for implementing...",
          },
          {
            type: "tag",
            id: "3",
            name: searchQuery.toLowerCase(),
            questionCount: 42,
          },
        ];

        setSearchResults(mockResults);
        setShowResults(true);
      } catch (error) {
        console.error("Search error:", error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const isDark = theme?.mode === "dark" || false;

  if (!mounted || !theme?.mounted) {
    return (
      <div className="relative w-full max-w-[600px] max-lg:hidden" suppressHydrationWarning>
        <div className="relative min-h-[48px] rounded-xl flex items-center gap-2 px-4 bg-gray-200 dark:bg-gray-700">
          <div className="animate-pulse bg-gray-300 dark:bg-gray-600 h-6 w-6 rounded"></div>
          <div className="animate-pulse bg-gray-300 dark:bg-gray-600 h-6 flex-1 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-[600px] max-lg:hidden" suppressHydrationWarning>
      <div
        className={cn(
          "relative min-h-[48px] rounded-xl flex items-center gap-2 px-4",
          isDark ? "bg-black" : "bg-zinc-200"
        )}
        ref={searchContainerRef}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={cn("h-6 w-6 cursor-pointer", isDark ? "text-zinc-400" : "text-zinc-700")}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>

        <Input
          placeholder="Search globally..."
          variant="bare"
          isDark={isDark}
          spellCheck={false}
          autoComplete="off"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => searchQuery && setShowResults(true)}
          onBlur={() => setTimeout(() => setShowResults(false), 200)}
        />

        {isSearching && (
          <div className="animate-spin h-4 w-4 border-2 border-orange-500 border-t-transparent rounded-full"></div>
        )}
      </div>

      {showResults && searchResults.length > 0 && (
        <div
          className={cn(
            "absolute top-full left-0 right-0 mt-2 rounded-xl border shadow-lg z-50 max-h-96 overflow-y-auto",
            isDark ? "bg-black border-zinc-700" : "bg-white border-zinc-200"
          )}
        >
          {searchResults.map((result) => (
            <div
              key={result.id}
              className={cn(
                "p-4 cursor-pointer transition-colors border-b last:border-b-0",
                isDark ? "hover:bg-zinc-800 border-zinc-700" : "hover:bg-zinc-50 border-zinc-100"
              )}
              onClick={() => {
                if (result.type === "question") {
                  window.location.href = `/question/${result.id}`;
                } else if (result.type === "tag") {
                  window.location.href = `/tags/${result.id}`;
                }
              }}
            >
              {result.type === "question" ? (
                <div>
                  <div className={cn("font-medium text-sm mb-1", isDark ? "text-white" : "text-black")}>{result.title}</div>
                  <div className={cn("text-xs", isDark ? "text-zinc-400" : "text-zinc-600")}>{result.excerpt}</div>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "px-2 py-1 rounded text-xs font-medium",
                      isDark ? "bg-zinc-700 text-zinc-300" : "bg-zinc-100 text-zinc-700"
                    )}
                  >
                    {result.name}
                  </span>
                  <span className={cn("text-xs", isDark ? "text-zinc-400" : "text-zinc-600")}>{result.questionCount} questions</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GlobalSearch;
