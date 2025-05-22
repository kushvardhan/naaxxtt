// app/Providers.tsx
"use client";

import { useEffect, useState } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "../context/ThemeContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check system preference initially
    const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDark(darkQuery.matches);

    // Listen for changes in preference
    const listener = (e: MediaQueryListEvent) => setIsDark(e.matches);
    darkQuery.addEventListener("change", listener);

    return () => darkQuery.removeEventListener("change", listener);
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <ClerkProvider>
      <ThemeProvider value={{ mode: isDark ? "dark" : "light", toggle: () => setIsDark((prev) => !prev) }}>
        {children}
      </ThemeProvider>
    </ClerkProvider>
  );
}
