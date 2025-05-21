"use client";

import { useContext } from "react";
import { ThemeContext } from "../../../../context/ThemeContext";
import Link from "next/link";
import { Button } from "../../../components/Shared/button";
import LocalSearchBar from "@/components/Shared/Search/LocalSearchBar";
import { DropdownMenu } from "@/components/Shared/dropdown-menu";

export default function Home() {
  const theme = useContext(ThemeContext);

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
  ];

  if (!theme) return null;

  return (
    <div className="h-[calc(100vh-120px)] w-full mt-20">
      {/* Header Section */}
      <div
        className={`flex w-full justify-between items-center gap-4 sm:flex-row sm:items-center ${
          theme.mode === "dark" ? "bg-black" : "bg-white"
        }`}
      >
        <h1
          className={`text-2xl font-bold font-mono ${
            theme.mode === "dark" ? "text-white" : "text-black"
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

      {/* Search + Tags Dropdown on md and smaller */}
      <div
        className={`mt-11 flex justify-between gap-4 flex-wrap items-center ${
          theme.mode === "dark" ? "bg-zinc-400" : "bg-white"
        }`}
      >
        <LocalSearchBar
          route="/"
          iconPosition="left"
          placeholder="Search for questions"
          otherClasses="flex-1"
        />

        {/* Tags dropdown for sm/md screens */}
        <div className="block lg:hidden">
          <DropdownMenu>
            <div className="flex flex-wrap gap-2 p-2">
              {Tags.map((item, idx) => (
                <Button key={idx} className="text-sm px-3 py-1">
                  {item.tag}
                </Button>
              ))}
            </div>
          </DropdownMenu>
        </div>
      </div>

      {/* Tags buttons only for lg+ screens */}
      <div className="hidden lg:flex flex-wrap gap-3 mt-4">
        {Tags.map((item, idx) => (
          <Button key={idx} className="text-sm px-3 py-1">
            {item.tag}
          </Button>
        ))}

        
      </div>
      <DropdownMenu></DropdownMenu>
    </div>
  );
}
