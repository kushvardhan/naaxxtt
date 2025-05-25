"use client";

import { SignedIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import MobileNav from "./MobileNav";
import GlobalSearch from "./Search/GlobalSearch";
import { ThemeToggleMenu } from "./ThemeToggleMenu";

const TopNav = () => {
  const theme = useContext(ThemeContext);

  return (
    <nav
      className={`w-full flex items-center justify-between fixed z-50 gap-5 py-6 px-2 border-b sm:px-6 transition-colors ${
        theme.mode === "dark" ? "bg-zinc-900 text-white" : "bg-white text-black"
      }`}
    >
      <div className="flex items-center gap-1 px-3">
<Link
  href="/"
  className="font-black font-mono font-spaceGrotesk lg:tracking-wide text-4xl lg:text-5xl bg-gradient-to-r from-amber-300 via-orange-400 to-orange-600 bg-clip-text text-transparent"
>
  NullFlow
</Link>


      </div>

      <GlobalSearch />

      <div className="flex items-center gap-4 font-mono">
        <ThemeToggleMenu />
        <SignedIn>
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                userButtonAvatarBox: `h-14 w-14 sm:h-8 sm:w-8 rounded-full overflow-hidden shadow-sm shadow-white/20 ${
                  theme.mode === "dark"
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
