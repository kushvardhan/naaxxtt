"use client";
import { SignedIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import { ThemeToggle } from "./ThemeToggle";

const TopNav = () => {
  const theme = useContext(ThemeContext);
  if (!theme) return null;

  return (
    <nav
      className={`flex items-center justify-between fixed z-50 w-full gap-5 p-6 ${
        theme.mode === "dark"
          ? "bg-zinc-900 text-white"
          : "bg-[#eee] text-black shadow-light-300"
      } sm:px-12`}
    >
      <div className="flex items-center gap-1">
        <Link href="/" className="font-black font-spaceGrotesk text-4xl">
          <span>Next</span>
          <span
            className={`${
              theme.mode === "dark" ? "text-orange-500" : "text-orange-600"
            }`}
          >
            Flow
          </span>
        </Link>
      </div>
      <div className="flex items-center justify-between gap-5">
        <ThemeToggle />
        <SignedIn className="">
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "h-16 w-16",
              },
              variables: {
                colorPrimary: "#ff7000",
              },
            }}
          ></UserButton>
        </SignedIn>

        <h3>MobileNav</h3>
      </div>
    </nav>
  );
};

export default TopNav;
