"use client";

import { createContext, useEffect, useState, ReactNode } from "react";


type ThemeContextType = {
  mode: string;
  setMode: React.Dispatch<React.SetStateAction<string>>;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState("dark");

  useEffect(() => {
    const html = document.querySelector("html");
    html?.setAttribute("data-theme", mode);
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
