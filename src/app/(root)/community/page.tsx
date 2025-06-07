"use client"

import React from 'react'
import LocalSearchBar from "@/components/Shared/Search/LocalSearchBar";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/Shared/dropdown-menu";
import Link from "next/link";
import { useContext, useState } from "react";
import { ThemeContext } from "../../../../context/ThemeContext";
import { Button } from "@/components/Shared/button";


const page = () => {

  type Tag = {
  _id: string;
  name: string;
};

type Author = {
  name: string;
  image: string;
};

type Question = {
  _id: string;
  title: string;
  tags: Tag[];
  user: Author;
  upvotes: number;
  answers: number;
  views: number;
  createdAt: string;
};

type Props = {
  mappedQuestions: Question[];
};

const Tags = [
  { tag: "python" },
  { tag: "json" },
  { tag: "file-io" },
  { tag: "data" },
  { tag: "dictionary" },
  { tag: "serialization" },
];
  
  const theme = useContext(ThemeContext);
  const isDark = theme?.mode === "dark";
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    
    const toggleTag = (tag: string) => {
      setSelectedTags((prev) =>
        prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
      );
    };
  

  return (
    <>
   <div
        className={`h-[calc(screen-120px)] w-full overflow-y-scroll scrollbar-hidden ${
          isDark ? "bg-black" : "bg-white"
        }`}
      >
        {/* Header */}
        <div
          className={`flex w-full justify-between items-center scrollbar-hidden py-3 px-2 gap-4 ${
            isDark ? "bg-black" : "bg-white"
          }`}
        >
          <h1
            className={`text-2xl lg:text-5xl font-bold font-mono ${
              isDark ? "text-zinc-100" : "text-black"
            }`}
          >
            All Questions
          </h1>
          <Link
            href="/ask-question"
            className="flex justify-end items-center max-sm:w-full"
          >
            <Button className="bg-orange-400 hover:bg-orange-500/100 text-md sm:text-sm sm:px-1/2 sm:py-1 font-mono tracking-tight min-h-[46px] px-3 py-2 font-bold transition-all text-center cursor-pointer">
              Ask Question
            </Button>
          </Link>
        </div>
  
        {/* Search + Dropdown for tags */}
        <div
          className={`mt-8 flex gap-4 flex-wrap items-center  ${
            isDark ? "bg-black" : "bg-white"
          }`}
        >
          {/* Search Bar */}
          <LocalSearchBar
            route="/"
            iconPosition="left"
            placeholder="Search for questions"
            otherClasses="flex-1 "
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
  
          {/* Dropdown for sm/md screens */}
          <div className="block lg:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="font-mono px-3 py-2 text-sm flex items-center gap-3">
                  Select Filters
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m19.5 8.25-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </Button>
              </DropdownMenuTrigger>
  
              <DropdownMenuContent
                className={`w-48 rounded-md py-1 px-2 max-h-56 overflow-y-auto ${
                  isDark ? "bg-zinc-900 text-white" : "bg-white text-black"
                }`}
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
              >
                <div
                  className="flex flex-col gap-1"
                  style={{
                    overflowY: "scroll",
                    scrollbarWidth: "none", // Firefox
                    msOverflowStyle: "none",
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
                      style={{}}
                    >
                      {item.tag}
                    </DropdownMenuCheckboxItem>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
    </div>
    </>
)
}

export default page