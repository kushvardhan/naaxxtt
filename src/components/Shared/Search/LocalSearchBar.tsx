"use client";

import { useContext } from "react";
import { ThemeContext } from "../../../../context/ThemeContext";

function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(" ")
}

interface CustomInputProps {
  route: string;
  iconPosition?: string;
  placeholder: string;
  otherClasses?: string;
}

const LocalSearchBar = ({
  route,
  iconPosition,
  placeholder,
  otherClasses,
}: CustomInputProps) => {
  const theme = useContext(ThemeContext);
  const isDark = theme.mode === "dark"

  return (
    <div
      className={` min-h-[45px] flex flex-grow items-center gap-4 px-2  rounded-[10px] ${
        theme.mode === "dark" ? "bg-black" : "bg-zinc-200"
      }  {otherClasses} `}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className={cn(
          "h-6 w-6 cursor-pointer ",
          isDark ? "text-zinc-300" : "text-zinc-600"
        )}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
        />
      </svg>
    </div>
  );
};

export default LocalSearchBar;
