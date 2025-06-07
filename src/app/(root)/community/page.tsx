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
    <div className='w-full h-[calc(100vh-130px)] w-full mt-20 overflow-y-scroll scrollbar-hidden '>
       <div className="w-full flex flex-row gap-4 sm:flex-nowrap">
  {/* Search Bar */}
  <LocalSearchBar
    route="/"
    iconPosition="left"
    placeholder="Search for questions"
    otherClasses="w-full sm:w-[65%]"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
  />

  {/* Dropdown */}
  <div className="w-full sm:w-[35%]">
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="font-mono px-3 py-2 text-sm flex items-center gap-3 w-full">
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
        className={`w-full sm:w-48 rounded-md py-1 px-2 max-h-56 overflow-y-auto ${
          isDark ? "bg-zinc-900 text-white" : "bg-white text-black"
        }`}
      >
        <div className="flex flex-col gap-1">
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