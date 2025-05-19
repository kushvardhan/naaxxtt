"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import { SignedOut } from "@clerk/nextjs";

const SHEET_SIDES = ["left"] as const;
type SheetSide = (typeof SHEET_SIDES)[number];

const NavContent = () => {
  return <h1 className="text-2xl font-bold pt-4">NavContent</h1>;
};

const MobileNav = () => {
  const theme = useContext(ThemeContext);

  return (
    <div className="sm:hidden flex items-center">
      {SHEET_SIDES.map((side: SheetSide) => (
        <Sheet key={side}>
          <SheetTrigger asChild>
            <button
              aria-label="Open menu"
              className={`sm:hidden p-1 rounded-md border-none outline-none
                ${theme?.mode === "dark" ? "text-white" : "text-black"}`}
            >
              <svg
                className="size-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </SheetTrigger>

          <SheetContent
            side={side}
            className={`px-5 pt-6 w-full max-w-sm transition-all 
              ${theme?.mode === "dark"
                ? "bg-zinc-900 text-white"
                : "bg-white text-black"
              }`}
            style={{ maxWidth: "80vw" }} // max width 80% viewport width
          >
            {/* Logo aligned with TopNav */}
            <Link
              href="/"
              className="font-black font-mono font-spaceGrotesk text-4xl pl-1"
            >
              <span>Next</span>
              <span className="text-orange-600 dark:text-orange-500">Flow</span>
            </Link>

            {/* Optional nav content */}
            <div className="pt-6">
              <SheetClose>
                <NavContent />
              </SheetClose>
            </div>

            <SignedOut>
              <div className="mt-8 flex flex-col gap-4">
                <SheetClose asChild>
                  <Link href={"/sign-in"}>
                    <Button
                      variant="outline"
                      className={`text-md min-h-[48px] w-full rounded-lg px-5 py-3 shadow-sm
                        ${
                          theme?.mode === "dark"
                            ? "bg-zinc-900 text-orange-600 dark:text-orange-600 border-none"
                            : "bg-white text-orange-600 border border-orange-600"
                        }`}
                    >
                      Log in
                    </Button>
                  </Link>
                </SheetClose>

                <SheetClose asChild>
                  <Link href={"/sign-up"}>
                    <Button
                      variant="outline"
                      className={`text-md min-h-[48px] w-full rounded-lg px-5 py-3 shadow-sm
                        ${
                          theme?.mode === "dark"
                            ? "bg-zinc-800 text-black border-none"
                            : "bg-white text-black border border-gray-300"
                        }`}
                    >
                      Sign up
                    </Button>
                  </Link>
                </SheetClose>
              </div>
            </SignedOut>
          </SheetContent>
        </Sheet>
      ))}
    </div>
  );
};

export default MobileNav;
