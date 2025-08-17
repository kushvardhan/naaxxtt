"use client";

import { SignedIn, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import MobileNav from "./MobileNav";
import GlobalSearch from "./Search/GlobalSearch";
import { ThemeToggleMenu } from "./ThemeToggleMenu";

const TopNav = () => {
  const theme = useContext(ThemeContext);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !theme || !theme.mounted) {
    return (
      <nav className="w-full flex items-center justify-between fixed z-50 gap-5 py-6 px-2 border-b sm:px-6 bg-white dark:bg-zinc-900">
        <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-8 w-32 rounded"></div>
        <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-8 w-64 rounded"></div>
        <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-8 w-24 rounded"></div>
      </nav>
    );
  }

  return (
    <nav
      className={`w-full flex items-center justify-between fixed z-50 gap-5 py-6 px-2 border-b sm:px-6 transition-colors ${
        theme?.mode === "dark"
          ? "bg-zinc-900 text-white"
          : "bg-white text-black"
      }`}
      suppressHydrationWarning
    >
      <div className="flex items-center gap-1 px-3">
        <Link
          href="/"
          className="flex items-center gap-3 transition-transform hover:scale-105"
        >
          <Image
            src="/favicon.svg"
            alt="NullFlow Orbital Logo"
            width={40}
            height={40}
            className="h-10 w-10"
            priority
          />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-mono dark:text-orange-500 text-orange-600">
            NullFlow
          </h1>
        </Link>
      </div>

      <GlobalSearch />

      <div className="flex items-center gap-4 font-mono">
        <ThemeToggleMenu />
        <SignedIn>
          <UserButton
            appearance={{
              elements: {
                userButtonAvatarBox: `h-14 w-14 sm:h-8 sm:w-8 rounded-full overflow-hidden shadow-sm shadow-white/20 ${
                  theme?.mode === "dark"
                    ? "bg-zinc-800 text-white shadow-lg shadow-yellow-700 border-1 border-zinc-500"
                    : "bg-zinc-200 text-black"
                }`,
                userButtonAvatarImage: `object-cover`,
              },
              variables: {
                colorPrimary: "#ff7000",
              },
            }}
          />
        </SignedIn>
        <MobileNav />
      </div>
    </nav>
  );
};

export default TopNav;
