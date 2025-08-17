"use client";

import { Button } from "@/components/Shared/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/Shared/sheet";
import { SignedIn, SignedOut, useClerk } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";

const sideBarLinks = [
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
        />
      </svg>
    ),
    route: "/",
    label: "Home",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0Zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0Zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0Z"
        />
      </svg>
    ),
    route: "/community",
    label: "Community",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.562.562 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557L3.04 10.385a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5Z"
        />
      </svg>
    ),
    route: "/collection",
    label: "Collections",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008Z"
        />
      </svg>
    ),
    route: "/find-jobs",
    label: "Find Jobs",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3Z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 6h.008v.008H6V6Z"
        />
      </svg>
    ),
    route: "/tag",
    label: "Tags",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
        />
      </svg>
    ),
    route: "/profile",
    label: "Profile",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
        />
      </svg>
    ),
    route: "/ask-question",
    label: "Ask a question",
  },
];

const MobileNav = () => {
  const theme = useContext(ThemeContext);
  const pathName = usePathname();
  const { signOut } = useClerk();

  if (!theme) {
    return <div>Loading...</div>;
  }

  return (
    <div className="sm:hidden flex items-center">
      <Sheet>
        <SheetTrigger asChild>
          <button
            aria-label="Open menu"
            className={`p-2 rounded-md ${
              theme?.mode === "dark" ? "text-white" : "text-black"
            }`}
          >
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className={`w-[80vw] max-w-sm px-4 py-6 ${
            theme?.mode === "dark"
              ? "bg-zinc-900 text-white"
              : "bg-white text-black"
          }`}
        >
          <Link href="/" className="flex items-center mt-2 gap-3">
            <Image
              src="/favicon.svg"
              alt="NullFlow Orbital Logo"
              width={42}
              height={42}
              className="h-13 w-13 sm:block"
              priority
            />
            <span className="text-4xl sm:hidden md:text-6xl font-black font-mono text-orange-500">NullFlow</span>
          </Link>

          <nav className="mt-8 flex flex-col gap-3">
            {sideBarLinks.map((link) => {
              const isActive =
                (pathName.includes(link.route) && link.route.length > 1) ||
                pathName === link.route;
              return (
                <SheetClose asChild key={link.route}>
                  <Link
                    href={link.route}
                    className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-300
    ${isActive ? "bg-orange-500 text-black" : ""}
    ${
      !isActive
        ? theme?.mode === "dark"
          ? "hover:bg-orange-400/30 text-white hover:text-white"
          : "hover:bg-orange-200 text-black"
        : ""
    }
  `}
                  >
                    <div
                      className={`transition-transform font-semibold duration-300 ${
                        isActive ? "scale-110 font-bold text-black" : ""
                      }
    ${
      !isActive
        ? theme?.mode === "dark"
          ? "text-white group-hover:text-black"
          : "text-black"
        : ""
    }`}
                    >
                      {link.icon}
                    </div>
                    <span
                      className={`text-lg transition-all duration-300 ${
                        isActive ? "font-bold text-xl" : "font-semibold"
                      }`}
                    >
                      {link.label}
                    </span>
                  </Link>
                </SheetClose>
              );
            })}
          </nav>

          <SignedOut>
            <div className="mt-6 flex flex-col gap-3">
              <SheetClose asChild>
                <Link href="/sign-in">
                  <Button
                    variant="outline"
                    className={`w-full rounded-lg py-3 text-base font-medium transition-all duration-300
            ${
              theme?.mode === "dark"
                ? "bg-zinc-900 text-white border-zinc-700 hover:bg-orange-300/30 hover:text-orange-100"
                : "bg-white text-black border border-zinc-300  hover:bg-zinc-700/80 hover:text-white"
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
                    className={`w-full rounded-lg py-3 text-base font-medium transition-all duration-300
            ${
              theme?.mode === "dark"
                ? "bg-zinc-800 text-white border-zinc-700 hover:bg-orange-300/40 hover:text-orange-100"
                : "bg-white text-black border border-zinc-300 hover:bg-zinc-700 hover:text-white"
            }`}
                  >
                    Sign up
                  </Button>
                </Link>
              </SheetClose>
            </div>
          </SignedOut>

          <SignedIn>
            <div className="mt-6 flex flex-col gap-3">
              <SheetClose asChild>
                <Button
                  variant="outline"
                  onClick={() => signOut()}
                  className={`w-full rounded-lg py-6 text-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300
          ${
            theme?.mode === "dark"
              ? "bg-zinc-800 text-white border-zinc-700 hover:bg-zinc-200/10 hover:cursor-pointer hover:text-red-500 hover:font-bold"
              : "bg-white text-black border border-zinc-300 hover:bg-zinc-200 hover:cursor-pointer hover:text-red-600"
          }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 size-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3-3H9m0 0l3-3m-3 3l3 3"
                    />
                  </svg>
                  Log out
                </Button>
              </SheetClose>
            </div>
          </SignedIn>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
