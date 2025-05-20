"use client";

import { Button } from "@/components/Shared/button";
import { SignedIn, SignedOut, useClerk } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useState } from "react";
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
          d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
        />
      </svg>
    ),
    route: "/ask-question",
    label: "Ask a question",
  },
];

const loginIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M15 12H3m0 0l3.75 3.75M3 12l3.75-3.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const signupIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M12 4v16m8-8H4"
    />
  </svg>
);

const logoutIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3-3H9m0 0l3-3m-3 3l3 3"
    />
  </svg>
);

const LeftSidebar = ({ navHeight }: { navHeight: number }) => {
  const theme = useContext(ThemeContext);
  const pathName = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const { signOut } = useClerk();

  const bgColor =
    theme.mode === "dark"
      ? "bg-zinc-900 text-white"
      : "bg-gradient-to-l from-zinc-100 to-white text-black";
  const hoverBg =
    theme.mode === "dark" ? "hover:bg-orange-400/30" : "hover:bg-orange-200";

  return (
    <div
      className={`hidden md:flex flex-col fixed left-0 min-h-[calc(100vh-95px)] transition-width duration-300 ease-in-out
        ${collapsed ? "w-16" : "w-64"} ${bgColor}`}
      style={{ top: navHeight, bottom: 0 }}
    >
      <button
        onClick={() => setCollapsed(!collapsed)}
        className={`m-2 p-2 rounded-md self-end ${
          theme.mode === "dark"
            ? "text-white bg-zinc-900 hover:bg-zinc-800"
            : "text-black bg-white hover:bg-zinc-100"
        }`}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        )}
      </button>

      <nav className="flex flex-col flex-grow mt-2 gap-6">
        {sideBarLinks.map(({ icon, route, label }) => {
          const isActive =
            pathName === route ||
            (route.length > 1 && pathName.startsWith(route));
          return (
            <Link
              key={route}
              href={route}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 mx-2 transition-colors duration-300
              ${isActive ? "bg-orange-500 text-black font-bold" : ""}
              ${!isActive ? hoverBg : ""}
              ${collapsed ? "justify-center px-2" : ""}
              `}
              title={collapsed ? label : undefined}
            >
              <div
                className={`text-lg flex-shrink-0 ${
                  isActive
                    ? "text-black scale-110"
                    : theme.mode === "dark"
                    ? "text-white"
                    : "text-black"
                }`}
              >
                {icon}
              </div>
              {!collapsed && (
                <span
                  className={`text-base transition-all duration-300 ${
                    isActive ? "font-bold text-xl" : "font-semibold"
                  }`}
                >
                  {label}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Auth button at bottom */}
      <div className={`mb-12 mt-auto mx-2`}>
        <SignedOut>
          <div className="mt-6 flex flex-col gap-3">
            <Link href="/sign-in">
              <Button
                variant="outline"
                className={`w-full flex items-center justify-center gap-2 rounded-lg py-3 text-base font-medium transition-all duration-300
          ${
            theme?.mode === "dark"
              ? "bg-zinc-900 text-white border-zinc-700 hover:bg-orange-300/30 hover:text-orange-100"
              : "bg-white text-black border border-zinc-300 hover:bg-zinc-700/80 hover:text-white"
          }
        `}
              >
                {loginIcon}
                {!collapsed && "Log in"}
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button
                variant="outline"
                className={`w-full flex items-center justify-center gap-2 rounded-lg py-3 text-base font-medium transition-all duration-300
          ${
            theme?.mode === "dark"
              ? "bg-zinc-800 text-white border-zinc-700 hover:bg-orange-300/40 hover:text-orange-100"
              : "bg-white text-black border border-zinc-300 hover:bg-zinc-700 hover:text-white"
          }
        `}
              >
                {signupIcon}
                {!collapsed && "Sign up"}
              </Button>
            </Link>
          </div>
        </SignedOut>

        <SignedIn>
  <div className="mt-2 flex flex-col gap-3">
    <Button
      variant="outline"
      onClick={() => signOut()}
      className={`w-full flex items-center justify-center gap-2 rounded-lg py-6 text-lg font-semibold transition-all duration-300
        ${theme?.mode === "dark"
          ? "bg-zinc-800 text-white border-zinc-700 hover:bg-zinc-200/10 hover:text-red-500 hover:font-bold"
          : "bg-white text-black border border-zinc-300 hover:bg-zinc-200 hover:text-red-600"}
      `}
    >
      {logoutIcon}
      {!collapsed && "Log out"}
    </Button>
  </div>
</SignedIn>

      </div>
    </div>
  );
};

export default LeftSidebar;
