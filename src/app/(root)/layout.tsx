"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import {
  ThemeContext,
  ThemeContextProvider,
} from "../../../context/ThemeContext";
import LeftSidebar from "../../components/Shared/LeftSideBar";
import TopNav from "../../components/Shared/TopNav";
import "../globals.css";
import RightSideBar from "../../components/Shared/RightSideBar";

function LayoutContent({ children }: { children: React.ReactNode }) {
  const navRef = useRef<HTMLDivElement>(null);
  const [navHeight, setNavHeight] = useState(0);
  const [mounted, setMounted] = useState(false);
  const theme = useContext(ThemeContext);

  useEffect(() => {
    setMounted(true);

    function updateNavHeight() {
      if (navRef.current) {
        setNavHeight(navRef.current.offsetHeight);
      }
    }

    updateNavHeight();
    window.addEventListener("resize", updateNavHeight);

    return () => window.removeEventListener("resize", updateNavHeight);
  }, []);

  // Show loading state until mounted and theme is ready
  if (!mounted || !theme || !theme.mounted) {
    return (
      <div
        className="flex items-center justify-center min-h-screen bg-white dark:bg-black"
        suppressHydrationWarning
      >
        <div
          className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"
          suppressHydrationWarning
        ></div>
      </div>
    );
  }

  return (
    <main
      className={`relative min-h-screen flex flex-col ${
        theme?.mode === "dark" ? "bg-black" : "bg-white"
      }`}
      suppressHydrationWarning
    >
      <div ref={navRef} suppressHydrationWarning>
        <TopNav />
      </div>

      <div
        className={`main-div flex flex-1`}
        style={{
          marginTop: navHeight,
          height: `calc(100vh - ${navHeight}px)`,
          overflow: "hidden",
        }}
        suppressHydrationWarning
      >
        <LeftSidebar />
        <section
          className="flex flex-1 flex-col px-2 pb-6 pt-6 max-md:pb-14 scrollbar-hidden sm:px-4 overflow-auto"
          suppressHydrationWarning
        >
          <div className="mx-auto w-full max-w-5xl" suppressHydrationWarning>
            {children}
          </div>
        </section>
        <RightSideBar />
      </div>
    </main>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeContextProvider>
      <LayoutContent>{children}</LayoutContent>
    </ThemeContextProvider>
  );
}
