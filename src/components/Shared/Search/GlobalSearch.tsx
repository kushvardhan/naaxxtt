"use client";

import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../../../context/ThemeContext";

function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}

interface InputProps extends React.ComponentProps<"input"> {
  variant?: "default" | "bare";
  isDark?: boolean;
}

const Input = ({
  className,
  type,
  variant = "default",
  isDark = false,
  ...props
}: InputProps) => {
  const isBare = variant === "bare";

  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        isBare
          ? cn(
              "w-full bg-transparent font-mono border-none outline-none focus:outline-none focus:ring-0 focus:border-none shadow-none px-0 py-0 text-lg",
              isDark
                ? "text-white placeholder:text-zinc-400"
                : "text-black placeholder:text-zinc-500 font-mono placeholder:font-semibold"
            )
          : cn(
              "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
              className
            ),
        className
      )}
      {...props}
    />
  );
};

const GlobalSearch = () => {
  const theme = useContext(ThemeContext);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Hydration-safe loading state
  if (!mounted || !theme || !theme.mounted) {
    return (
      <div
        className="relative w-full max-w-[600px] max-lg:hidden"
        suppressHydrationWarning
      >
        <div
          className="relative min-h-[48px] rounded-xl flex items-center gap-2 px-4 bg-gray-200 dark:bg-gray-700"
          suppressHydrationWarning
        >
          <div
            className="animate-pulse bg-gray-300 dark:bg-gray-600 h-6 w-6 rounded"
            suppressHydrationWarning
          ></div>
          <div
            className="animate-pulse bg-gray-300 dark:bg-gray-600 h-6 flex-1 rounded"
            suppressHydrationWarning
          ></div>
        </div>
      </div>
    );
  }

  // Safe access with fallback
  const isDark = theme?.mode === "dark" || false;

  return (
    <div
      className="relative w-full max-w-[600px] max-lg:hidden"
      suppressHydrationWarning
    >
      <div
        className={cn(
          "relative min-h-[48px] rounded-xl flex items-center  gap-2 px-4",
          isDark ? "bg-black" : "bg-zinc-200"
        )}
        suppressHydrationWarning
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={cn(
            "h-6 w-6 cursor-pointer",
            isDark ? "text-zinc-400" : "text-zinc-700"
          )}
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
        />
      </div>
    </div>
  );
};

export default GlobalSearch;
