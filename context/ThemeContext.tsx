"use client";

import { useTheme } from "next-themes";
import { createContext, useEffect, useState } from "react";

type ThemeContextType = {
  mode: string;
  setMode: (theme: string) => void;
  mounted: boolean;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

// Custom hook that provides the same interface as before but uses next-themes
export const useThemeContext = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return {
    mode: theme || "dark",
    setMode: setTheme,
    mounted,
  };
};

// For backward compatibility, provide a context that uses next-themes
export const ThemeContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const themeData = useThemeContext();

  return (
    <ThemeContext.Provider value={themeData}>{children}</ThemeContext.Provider>
  );
};
