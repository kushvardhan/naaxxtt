"use client";

import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import { Button } from "./button";
import Link from "next/link";

interface NoResultsProps {
  title: string;
  description: string;
  icon?: string;
  showCreateButton?: boolean;
  createButtonText?: string;
  createButtonLink?: string;
  onClearFilters?: () => void;
  hasFilters?: boolean;
}

const NoResults = ({
  title,
  description,
  icon = "🔍",
  showCreateButton = false,
  createButtonText = "Create",
  createButtonLink = "/",
  onClearFilters,
  hasFilters = false,
}: NoResultsProps) => {
  const theme = useContext(ThemeContext);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !theme || !theme.mounted) {
    return (
      <div
        className="text-center py-20 animate-pulse"
        suppressHydrationWarning
      >
        <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-4" suppressHydrationWarning></div>
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-48 mx-auto mb-2" suppressHydrationWarning></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-64 mx-auto" suppressHydrationWarning></div>
      </div>
    );
  }

  const isDark = theme.mode === "dark";

  return (
    <div
      className={`text-center py-20 px-6 rounded-xl transition-all duration-300 ${
        isDark 
          ? "bg-zinc-900/50 border border-zinc-800 text-zinc-300" 
          : "bg-zinc-50 border border-zinc-200 text-zinc-600"
      }`}
    >
      {/* Animated Icon */}
      <div className="text-6xl mb-6 animate-bounce">{icon}</div>
      
      {/* Title */}
      <h3 className={`text-2xl font-bold mb-3 ${
        isDark ? "text-zinc-100" : "text-zinc-800"
      }`}>
        {title}
      </h3>
      
      {/* Description */}
      <p className={`text-base mb-6 max-w-md mx-auto leading-relaxed ${
        isDark ? "text-zinc-400" : "text-zinc-600"
      }`}>
        {description}
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        {hasFilters && onClearFilters && (
          <Button
            variant="outline"
            onClick={onClearFilters}
            className={`px-6 py-3 font-medium transition-all duration-200 ${
              isDark
                ? "border-zinc-600 text-zinc-300 hover:bg-zinc-800 hover:border-zinc-500"
                : "border-zinc-300 text-zinc-700 hover:bg-zinc-100 hover:border-zinc-400"
            }`}
          >
            Clear Filters
          </Button>
        )}
        
        {showCreateButton && (
          <Link href={createButtonLink}>
            <Button
              className={`px-6 py-3 font-medium transition-all duration-200 transform hover:scale-105 ${
                isDark
                  ? "bg-orange-600 hover:bg-orange-700 text-white"
                  : "bg-orange-500 hover:bg-orange-600 text-white"
              }`}
            >
              {createButtonText}
            </Button>
          </Link>
        )}
      </div>

      {/* Decorative Elements */}
      <div className="mt-8 flex justify-center space-x-2">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full animate-pulse ${
              isDark ? "bg-zinc-600" : "bg-zinc-300"
            }`}
            style={{ animationDelay: `${i * 200}ms` }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default NoResults;
