"use client";

import { useTheme } from "next-themes";
import { createContext } from "react";

type ThemeContextType = {
  mode: string;
  setMode: (theme: string) => void;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

// Custom hook that provides the same interface as before but uses next-themes
export const useThemeContext = () => {
  const { theme, setTheme } = useTheme();

  return {
    mode: theme || "dark",
    setMode: setTheme,
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
