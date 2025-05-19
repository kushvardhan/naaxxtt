"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import { SignedOut } from "@clerk/nextjs";

const SHEET_SIDES = ["left"] as const;
type SheetSide = (typeof SHEET_SIDES)[number];

const sideBarLinks = [
  {
    iconUrl: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 transition-transform duration-300 group-hover:scale-110 text-orange-500">
        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
    route: "/",
    label: "Home",
  },
  {
    iconUrl: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 transition-transform duration-300 group-hover:scale-110 text-orange-500">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198v.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21a11.944 11.944 0 01-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0Zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0Zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0Z" />
      </svg>
    ),
    route: "/community",
    label: "Community",
  },
  // Add your other icons here...
];

const NavContent = () => {
  return (
    <section className="flex h-full flex-col gap-4 pt-10">
      {sideBarLinks.map((link) => (
        <SheetClose asChild key={link.route}>
          <Link
            href={link.route}
            className="group flex items-center gap-3 min-h-[48px] px-4 py-2.5 rounded-md transition-colors duration-300
              hover:bg-zinc-800 dark:hover:bg-zinc-800
              hover:bg-zinc-100 text-black dark:text-white"
          >
            {link.iconUrl}
            <span className="text-base font-medium">{link.label}</span>
          </Link>
        </SheetClose>
      ))}
    </section>
  );
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
            className={`px-5 pt-6 transition-all w-full`}
            style={{ maxWidth: "80vw" }}
          >
            <Link
              href="/"
              className="font-black font-mono font-spaceGrotesk text-4xl pl-1"
            >
              <span>Next</span>
              <span className="text-orange-600 dark:text-orange-500">Flow</span>
            </Link>

            <div className="pt-6">
              <NavContent />
            </div>

            <SignedOut>
              <div className="mt-8 flex flex-col gap-4">
                <SheetClose asChild>
                  <Link href="/sign-in">
                    <Button
                      variant="outline"
                      className={`text-md min-h-[48px] w-full rounded-lg px-5 py-3 shadow-sm transition-transform duration-300 hover:scale-[1.02]
                        ${
                          theme?.mode === "dark"
                            ? "bg-zinc-900 text-orange-600 border-none"
                            : "bg-white text-orange-600 border border-orange-600"
                        }`}
                    >
                      Log in
                    </Button>
                  </Link>
                </SheetClose>

                <SheetClose asChild>
                  <Link href="/sign-up">
                    <Button
                      variant="outline"
                      className={`text-md min-h-[48px] w-full rounded-lg px-5 py-3 shadow-sm transition-transform duration-300 hover:scale-[1.02]
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
