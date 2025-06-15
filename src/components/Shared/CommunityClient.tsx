"use client";

import { User } from "@/app/(root)/community/page";
import { Button } from "@/components/Shared/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/Shared/dropdown-menu";
import LocalSearchBar from "@/components/Shared/Search/LocalSearchBar";
import UserCard from "@/components/Shared/UserCard";
import { useContext, useMemo, useState } from "react";
import { ThemeContext } from "../../../context/ThemeContext";

interface CommunityClientProps {
  users: User[];
}

const CommunityClient = ({ users }: CommunityClientProps) => {
  const theme = useContext(ThemeContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  if (!theme || !theme.mounted) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  const isDark = theme.mode === "dark";

  const Tags = [
    { tag: "New User" },
    { tag: "Old User" },
    { tag: "Top Contributors" },
  ];

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const filteredUsers = useMemo(() => {
    let filtered = users;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (user) =>
          user.name.toLowerCase().includes(q) ||
          user.username.toLowerCase().includes(q) ||
          user.about.toLowerCase().includes(q) ||
          (user.location && user.location.toLowerCase().includes(q))
      );
    }

    if (selectedTags.length > 0) {
      filtered = filtered.filter((user) => {
        const joinedDate = new Date(user.joinedAt);
        const now = new Date();
        const daysSinceJoined = Math.floor(
          (now.getTime() - joinedDate.getTime()) / (1000 * 60 * 60 * 24)
        );

        if (selectedTags.includes("New User") && daysSinceJoined <= 30)
          return true;
        if (selectedTags.includes("Old User") && daysSinceJoined > 365)
          return true;
        if (selectedTags.includes("Top Contributors") && user.reputation > 100)
          return true;

        return false;
      });
    }

    return filtered;
  }, [users, searchQuery, selectedTags]);

  return (
    <div className="h-[calc(screen-120px)] w-full overflow-y-scroll scrollbar-hidden">
      {/* Header */}
      <div className="mb-8">
        <h1
          className={`text-3xl lg:text-4xl font-mono font-bold tracking-wide mb-2 ${
            isDark ? "text-zinc-100" : "text-black"
          }`}
        >
          <span className="tracking-wider">Community</span>
        </h1>
        <p
          className={`text-sm font-mono ${
            isDark ? "text-zinc-400" : "text-zinc-600"
          }`}
        >
          Discover amazing developers in our community
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 flex gap-4 flex-wrap items-center">
        <LocalSearchBar
          route="/community"
          iconPosition="left"
          placeholder="Search for amazing minds..."
          otherClasses="flex-1 min-w-[300px]"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="font-mono px-4 py-4 text-sm flex items-center gap-2 min-w-[140px]"
            >
              Filters
              {selectedTags.length > 0 && (
                <span className="bg-orange-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                  {selectedTags.length}
                </span>
              )}
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
            className={`w-48 rounded-lg py-2 px-1 ${
              isDark
                ? "bg-zinc-900 border-zinc-700"
                : "bg-white border-zinc-200"
            }`}
          >
            {Tags.map((item, idx) => (
              <DropdownMenuCheckboxItem
                key={idx}
                checked={selectedTags.includes(item.tag)}
                onCheckedChange={() => toggleTag(item.tag)}
                className={`font-mono text-sm rounded-md mx-1 my-0.5 cursor-pointer ${
                  isDark
                    ? "hover:bg-zinc-950 text-zinc-200"
                    : "hover:bg-zinc-200 text-zinc-800"
                }`}
              >
                {item.tag}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Stats Bar */}
      <div
        className={`mb-6 p-4 rounded-lg border ${
          isDark
            ? "bg-zinc-900/50 border-zinc-800 text-zinc-300"
            : "bg-zinc-50 border-zinc-200 text-zinc-600"
        }`}
      >
        <div className="flex flex-wrap gap-6 text-sm font-mono">
          <span>
            <strong className={isDark ? "text-zinc-100" : "text-zinc-800"}>
              {filteredUsers.length}
            </strong>{" "}
            {filteredUsers.length === 1 ? "member" : "members"} found
          </span>
          <span>
            <strong className={isDark ? "text-zinc-100" : "text-zinc-800"}>
              {users.length}
            </strong>{" "}
            total members
          </span>
          {searchQuery && (
            <span>
              Searching for: <strong>"{searchQuery}"</strong>
            </span>
          )}
          {selectedTags.length > 0 && (
            <span>
              Filters: <strong>{selectedTags.join(", ")}</strong>
            </span>
          )}
        </div>
      </div>

      {/* Users Grid */}
      {filteredUsers.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 md:gap-6">
          {filteredUsers.map((user, index) => (
            <div
              key={user._id}
              className="animate-in fade-in slide-in-from-bottom-4 duration-500"
              style={{
                animationDelay: `${index * 100}ms`,
                animationFillMode: "both",
              }}
            >
              <UserCard user={user} />
            </div>
          ))}
        </div>
      ) : (
        <div
          className={`text-center py-20 ${
            isDark ? "text-zinc-400" : "text-zinc-600"
          }`}
        >
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-mono font-semibold mb-2">
            No users found
          </h3>
          <p className="text-sm">
            {searchQuery || selectedTags.length > 0
              ? "Try adjusting your search or filters"
              : "No users available at the moment"}
          </p>
          {(searchQuery || selectedTags.length > 0) && (
            <Button
              variant="outline"
              className="mt-4 font-mono"
              onClick={() => {
                setSearchQuery("");
                setSelectedTags([]);
              }}
            >
              Clear filters
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default CommunityClient;
