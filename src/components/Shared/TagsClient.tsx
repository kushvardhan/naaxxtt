"use client";

import { Tag } from "@/app/(root)/tags/page";
import { Button } from "@/components/Shared/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/Shared/dropdown-menu";
import LocalSearchBar from "@/components/Shared/Search/LocalSearchBar";
import TagCard from "@/components/Shared/TagCard";
import { useContext, useMemo, useState } from "react";
import { ThemeContext } from "../../../context/ThemeContext";

interface TagsClientProps {
  tags: Tag[];
}

const TagsClient = ({ tags }: TagsClientProps) => {
  const theme = useContext(ThemeContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Move useMemo before any conditional returns to follow Rules of Hooks
  const filteredTags = useMemo(() => {
    let filtered = tags;

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (tag) =>
          tag.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tag.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort by filters
    if (selectedFilters.length > 0) {
      const primaryFilter = selectedFilters[0];
      switch (primaryFilter) {
        case "Popular":
          filtered = filtered.sort(
            (a, b) => b.followers.length - a.followers.length
          );
          break;
        case "Recent":
          filtered = filtered.sort(
            (a, b) =>
              new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime()
          );
          break;
        case "Name":
          filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case "Old":
          filtered = filtered.sort(
            (a, b) =>
              new Date(a.createdOn).getTime() - new Date(b.createdOn).getTime()
          );
          break;
        default:
          break;
      }
    }

    return filtered;
  }, [tags, searchQuery, selectedFilters]);

  if (!mounted || !theme || !theme.mounted) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  const isDark = theme?.mode === "dark";

  const Filters = [
    { filter: "Popular" },
    { filter: "Recent" },
    { filter: "Name" },
    { filter: "Old" },
  ];

  const toggleFilter = (filter: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8">
        <h1
          className={`text-3xl lg:text-4xl font-bold font-mono tracking-wide mb-2 ${
            isDark ? "text-zinc-100" : "text-black"
          }`}
        >
          <span className="tracking-wider">Tags</span>
        </h1>
        <p
          className={`text-sm font-mono ${
            isDark ? "text-zinc-400" : "text-zinc-600"
          }`}
        >
          Explore topics and technologies in our community
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 flex gap-4 flex-wrap items-center">
        <LocalSearchBar
          route="/tags"
          iconPosition="left"
          placeholder="Search tags..."
          otherClasses="flex-1 min-w-[300px]"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="font-mono px-4 py-2 text-sm flex items-center gap-2 min-w-[140px]"
            >
              Sort By
              {selectedFilters.length > 0 && (
                <span className="bg-orange-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                  {selectedFilters.length}
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
            {Filters.map((item, idx) => (
              <DropdownMenuCheckboxItem
                key={idx}
                checked={selectedFilters.includes(item.filter)}
                onCheckedChange={() => toggleFilter(item.filter)}
                className={`font-mono text-sm rounded-md mx-1 my-0.5 ${
                  isDark
                    ? "hover:bg-zinc-800 text-zinc-200"
                    : "hover:bg-zinc-100 text-zinc-800"
                }`}
              >
                {item.filter}
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
              {filteredTags.length}
            </strong>{" "}
            {filteredTags.length === 1 ? "tag" : "tags"} found
          </span>
          <span>
            <strong className={isDark ? "text-zinc-100" : "text-zinc-800"}>
              {tags.length}
            </strong>{" "}
            total tags
          </span>
          {searchQuery && (
            <span>
              Searching for: <strong>"{searchQuery}"</strong>
            </span>
          )}
          {selectedFilters.length > 0 && (
            <span>
              Sorted by: <strong>{selectedFilters.join(", ")}</strong>
            </span>
          )}
        </div>
      </div>

      {/* Tags Grid */}
      {filteredTags.length > 0 ? (
        <div className="flex flex-wrap justify-center gap-6 lg:gap-8">
          {filteredTags.map((tag, index) => (
            <div
              key={tag._id}
              className="animate-in fade-in slide-in-from-bottom-4 duration-500"
              style={{
                animationDelay: `${index * 100}ms`,
                animationFillMode: "both",
              }}
            >
              <TagCard tag={tag} />
            </div>
          ))}
        </div>
      ) : (
        <div
          className={`text-center py-20 ${
            isDark ? "text-zinc-400" : "text-zinc-600"
          }`}
        >
          <div className="text-6xl mb-4">🏷️</div>
          <h3 className="text-xl font-mono font-semibold mb-2">
            No tags found
          </h3>
          <p className="text-sm">
            {searchQuery || selectedFilters.length > 0
              ? "Try adjusting your search or filters"
              : "No tags available at the moment"}
          </p>
          {(searchQuery || selectedFilters.length > 0) && (
            <Button
              variant="outline"
              className="mt-4 font-mono"
              onClick={() => {
                setSearchQuery("");
                setSelectedFilters([]);
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

export default TagsClient;
