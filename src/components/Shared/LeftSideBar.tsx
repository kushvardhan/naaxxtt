"use client";
import clsx from "clsx";
import { useContext } from "react";
import Link from "next/link";
import { ThemeContext } from "../../../context/ThemeContext";
import { usePathname } from "next/navigation";
import { SignedIn, SignedOut, useClerk } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { Button } from "./button";

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
const LeftSB = () => {
  const theme = useContext(ThemeContext);
  const pathName = usePathname();
  const { signOut } = useClerk();

  const bgColor =
    theme.mode === "dark"
      ? "bg-zinc-900 text-white"
      : "bg-gradient-to-l from-zinc-100/30 to-white text-black";
  const hoverBg =
    theme.mode === "dark" ? "hover:bg-orange-400/30" : "hover:bg-orange-200";

  return (
    <section
      className={`${bgColor} ${
    theme.mode === "light" ? "shadow-xl shadow-zinc-400/60" : ""
  } sticky left-0 top-0 flex h-screen flex-col justify-between overflow-y-auto border-2 p-6 pt-34 max-sm:hidden lg:w-[266px]`}
    >
      <div className="flex flex-1 flex-col gap-2">
        {sideBarLinks.map((link) => {
          const isActive =
            (pathName.includes(link.route) && link.route.length > 1) ||
            pathName === link.route;

          return (
            <Link
              key={link.label}
              href={link.route}
              className={clsx(
  "flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-300",
  {
    "bg-orange-500 text-black": isActive,
    [hoverBg]: !isActive,
    "hover:bg-orange-400/30 text-white hover:text-white":
      !isActive && theme.mode === "dark",
    "hover:bg-orange-200 text-black": !isActive && theme.mode === "light",
  }
)}
            >
              <div
                className={`transition-transform font-semibold duration-300 ${
                  isActive ? "scale-110 font-bold text-black" : ""
                } ${
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
                } max-lg:hidden`}
              >
                {link.label}
              </span>
            </Link>
          );
        })}
      </div>

         <SignedOut>
                    <div className="mt-6 flex flex-col gap-3">
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
                            <svg
                            className='invert-colors lg:hidden w-10 h-10 size-0.5'
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
</svg>

                            <p className="max-lg:hidden">Log in</p>
                          </Button>
                        </Link>
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
                            <svg
                            className='invert-colors lg:hidden w-10 h-10 size-0.5'
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
</svg>

                            <p className="max-lg:hidden">Sign up</p>
                          </Button>
                        </Link>
                    </div>
                  </SignedOut>

                            <SignedIn>
            <div className="mt-6 flex flex-col gap-3">
                <Button
                  variant="outline"
                  onClick={() => signOut()}
                  className={`w-full rounded-lg py-6 text-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300
          ${
            theme?.mode === "dark"
              ? "bg-zinc-800 text-white border-zinc-700 hover:bg-zinc-200/10 hover:cursor-pointer hover:text-red-500 hover:font-bold"
              : "bg-zinc-200/40 text-black border border-zinc-300 hover:bg-zinc-200 hover:cursor-pointer hover:text-red-600"
          }`}
                >
                  <svg
                    className='invert-colors lg:hidden w-10 h-10 size-0.5'
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
                  <p className="max-lg:hidden">Log out</p>
                </Button>
            </div>
          </SignedIn>

    </section>
  );
};

export default LeftSB;
