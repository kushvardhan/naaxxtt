"use client";

import LocalSearchBar from "@/components/Shared/Search/LocalSearchBar";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/Shared/dropdown-menu";
import { Button } from "@/components/Shared/button";
import { ThemeContext } from "../../../../context/ThemeContext";
import { useState, useContext } from 'react';
import Image from 'next/image';

interface User {
  _id: string;
  name: string;
  username: string;
  email: string;
  image?: string;
  about?: string;
  location?: string;
  portfolioWebsite?: string;
  reputation?: number;
  saved: string[];
  clerkId: string;
  createdAt?: string;
  updatedAt?: string;
}

interface CommunityClientProps {
  users: User[];
}

const CommunityClient = ({ users }: CommunityClientProps) => {
  const Tags = [
    { tag: "New User" },
    { tag: "Old User" },
    { tag: "Top Contributors" },
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

  if (!theme) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="w-full h-[calc(100vh-130px)] mt-[130px] overflow-y-scroll scrollbar-hidden ">
        <div
          className={`flex w-full mt-2 justify-between items-center scrollbar-hidden py-3 px-2 gap-4 ${
            isDark ? "bg-black" : "bg-white"
          }`}
        >
          <h1
            className={`text-2xl lg:text-4xl font-bold font-mono tracking-wide ${
              isDark ? "text-zinc-100" : "text-black"
            }`}
          >
            <span className="tracking-wider">Community</span> Page
          </h1>
        </div>

        {/* Search + Dropdown for tags */}
        <div
          className={`mt-7 flex gap-4 flex-wrap items-center  ${
            isDark ? "bg-black" : "bg-white"
          }`}
        >
          {/* Search Bar */}
          <LocalSearchBar
            route="/community"
            iconPosition="left"
            placeholder="Search for amazing minds"
            otherClasses="flex-1 "
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          {/* Dropdown for sm/md screens */}
          <div className="block ">
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
                    scrollbarWidth: "none", 
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

        <section className="mt-10 flex flex-wrap gap-3">
          {users?.length > 0 ? (
            users?.map((user) => (
              <div 
                key={user._id} 
                className={`p-4 rounded-lg border ${
                  isDark 
                    ? "bg-zinc-900 border-zinc-700 text-white" 
                    : "bg-white border-gray-200 text-black"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Image
                    src={user.image || "https://banner2.cleanpng.com/20180416/gbw/avfp7lvmb.webp"}
                    alt={user.name}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-mono font-semibold">{user.name}</h3>
                    <p className="text-sm opacity-70">@{user.username}</p>
                    {user.reputation && (
                      <p className="text-xs opacity-60">Reputation: {user.reputation}</p>
                    )}
                  </div>
                </div>
                {user.about && (
                  <p className="mt-2 text-sm opacity-80 line-clamp-2">{user.about}</p>
                )}
              </div>
            ))
          ) : (
            <div className={`text-center w-full py-8 ${isDark ? "text-white" : "text-black"}`}>
              <p className="font-mono text-lg">No users found</p>
            </div>
          )}
        </section>
      </div>
    </>
  );
};

export default CommunityClient;
