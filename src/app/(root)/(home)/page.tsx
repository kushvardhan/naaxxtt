"use client";

import { useContext, useState } from "react";
import { ThemeContext } from "../../../../context/ThemeContext";
import Link from "next/link";
import { Button } from "../../../components/Shared/button";
import LocalSearchBar from "@/components/Shared/Search/LocalSearchBar";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/Shared/dropdown-menu";

export default function Home() {
  const theme = useContext(ThemeContext);
  const isDark = theme?.mode === "dark";

  const Tags = [
    { tag: "JavaScript" },
    { tag: "React" },
    { tag: "Next.js aRCHITECHTURE" },
    { tag: "MongoDB" },
  
    { tag: "Node.js" },
    { tag: "CSS" },
    { tag: "HTML" },
    { tag: "TypeScript" },
    { tag: "Express" },
    { tag: "Node.js" },
    { tag: "CSS" },
    { tag: "HTML" },
    { tag: "TypeScript" },
    { tag: "Express" },
  ];

  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  if (!theme) return null;

  return (
    <div className="h-[calc(100vh-120px)] w-full mt-20">
      {/* Header */}
      <div
        className={`flex w-full justify-between items-center gap-4 ${
          isDark ? "bg-black" : "bg-white"
        }`}
      >
        <h1
          className={`text-2xl font-bold font-mono ${
            isDark ? "text-white" : "text-black"
          }`}
        >
          All Questions
        </h1>
        <Link href="/ask-question" className="flex justify-end max-sm:w-full">
          <Button className="bg-orange-400 min-h-[46px] px-4 py-3 font-semibold">
            Ask Question
          </Button>
        </Link>
      </div>

      {/* Search + Dropdown for tags */}
      <div
        className={`mt-8 flex gap-4 flex-wrap items-center ${
          isDark ? "bg-zinc-400" : "bg-white"
        }`}
      >
        {/* Search Bar */}
        <LocalSearchBar
          route="/"
          iconPosition="left"
          placeholder="Search for questions"
          otherClasses="flex-1"
        />

        {/* Dropdown for sm/md screens */}
        {/* Dropdown for sm/md screens */}
<div className="block lg:hidden">
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button className="font-mono px-3 py-2 text-sm">
        Tags
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent
      className={`w-48 rounded-md p-2 max-h-56 overflow-y-auto ${
        isDark ? "bg-zinc-800 text-white" : "bg-white text-black"
      }`}
      style={{
        scrollbarWidth: "none", // Firefox
        msOverflowStyle: "none", // IE/Edge
      }}
    >
      <div
        className="flex flex-col gap-1"
        style={{
          overflowY: "scroll",
          scrollbarWidth: "none", // Firefox
        }}
      >
        {Tags.map((item, idx) => (
          <DropdownMenuCheckboxItem
            key={idx}
            checked={selectedTags.includes(item.tag)}
            onCheckedChange={() => toggleTag(item.tag)}
            className={`font-mono text-sm border-b last:border-none ${
  isDark
    ? "border-zinc-700 hover:bg-zinc-900"
    : "border-gray-200 hover:bg-gray-300"
}`}

            style={{
              WebkitScrollbar: "none", // Chrome/Safari
            }}
          >
            {item.tag}
          </DropdownMenuCheckboxItem>
        ))}
      </div>
    </DropdownMenuContent>
  </DropdownMenu>
</div>

      </div>

      {/* Tags for large screens - Show only first 6 */}
      <div className="hidden lg:flex flex-wrap gap-3 mt-4">
        {Tags.slice(0, 6).map((item, idx) => (
          <Button
            key={idx}
            className={`text-xs px-2 py-0.5 font-mono rounded-md hover:cursor-pointer ${
              isDark
                ? "bg-zinc-700 text-white hover:bg-zinc-600"
                : "bg-gray-200/70 text-black hover:bg-gray-300"
            }`}
          >
            {item.tag}
          </Button>
        ))}
      </div>
    </div>
  );
}
