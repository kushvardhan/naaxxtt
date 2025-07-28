"use client";

import { User } from "@/app/(root)/community/page";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../../context/ThemeContext";

interface UserCardProps {
  user: User;
  interactedTags?: { _id: number | string; name: string }[];
}

const UserCard = ({ user, interactedTags = [] }: UserCardProps) => {
  const theme = useContext(ThemeContext);
  console.log("tags: ", interactedTags);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !theme || !theme.mounted) {
    return (
      <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-2xl h-72">
        <div className="p-6 flex flex-col items-center space-y-4">
          <div className="w-20 h-20 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
          <div className="space-y-2 w-full">
            <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mx-auto"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mx-auto"></div>
          </div>
          <div className="grid grid-cols-2 gap-3 w-full">
            <div className="h-16 bg-gray-300 dark:bg-gray-600 rounded-xl"></div>
            <div className="h-16 bg-gray-300 dark:bg-gray-600 rounded-xl"></div>
          </div>
          <div className="h-10 bg-gray-300 dark:bg-gray-600 rounded-xl w-full"></div>
        </div>
      </div>
    );
  }

  const isDark = theme?.mode === "dark";

  // Calculate days since joined
  const joinedDate = new Date(user.joinedAt);
  const now = new Date();
  const daysSinceJoined = Math.floor(
    (now.getTime() - joinedDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  // Determine user badge
  const getUserBadge = () => {
    if (daysSinceJoined <= 30) return { label: "New", color: "bg-emerald-500" };
    if (user.reputation > 100) return { label: "Top", color: "bg-orange-500" };
    if (daysSinceJoined > 365) return { label: "Pro", color: "bg-blue-500" };
    return null;
  };

  const badge = getUserBadge();

  return (
    <Link href={`/profile/${user.clerkId}`}>
      <div
        className={`group relative overflow-hidden rounded-xl transition-all duration-300 w-full max-w-sm mx-auto ${
          isDark
            ? "bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/50"
            : "bg-white border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50"
        } shadow-sm hover:shadow-md cursor-pointer`}
      >
        {/* Simple Badge */}
        {badge && (
          <div
            className={`absolute top-3 right-3 ${badge.color} text-white text-xs px-2 py-1 rounded-md font-medium`}
          >
            {badge.label}
          </div>
        )}

        {/* Card Content */}
        <div className="p-6">
          {/* Header Section */}
          <div className="flex items-center space-x-4">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <Image
                src={
                  user.image ||
                  "https://banner2.cleanpng.com/20180416/gbw/avfp7lvmb.webp"
                }
                alt={user.name}
                width={60}
                height={60}
                className="w-[60px] h-[60px] rounded-full object-cover border-2 border-zinc-200 dark:border-zinc-700"
              />
              {user.reputation > 50 && (
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white dark:border-zinc-900 flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              )}
            </div>

            {/* User Info */}
            <div className="flex-1 min-w-0">
              <h3
                className={`text-lg font-semibold truncate ${
                  isDark ? "text-zinc-100" : "text-zinc-800"
                }`}
              >
                {user.name}
              </h3>
              <p
                className={`text-sm truncate ${
                  isDark ? "text-zinc-400" : "text-zinc-600"
                }`}
              >
                @{user.username}
              </p>
            </div>
          </div>

          {/* Stats Section */}
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="text-center">
              <div
                className={`text-lg font-bold ${
                  isDark ? "text-zinc-100" : "text-zinc-800"
                }`}
              >
                {user.reputation}
              </div>
              <div
                className={`text-xs ${
                  isDark ? "text-zinc-500" : "text-zinc-500"
                }`}
              >
                Reputation
              </div>
            </div>
            <div className="text-center">
              <div
                className={`text-lg font-bold ${
                  isDark ? "text-zinc-100" : "text-zinc-800"
                }`}
              >
                {daysSinceJoined}
              </div>
              <div
                className={`text-xs ${
                  isDark ? "text-zinc-500" : "text-zinc-500"
                }`}
              >
                Days Active
              </div>
            </div>
          </div>

          {/* Tags Section */}
          {interactedTags && interactedTags.length > 0 && (
            <div className="mt-4">
              <div className="flex flex-wrap gap-1">
                {interactedTags.slice(0, 3).map((tag) => (
                  <Link
                    key={tag._id}
                    href={`/tags/${tag._id}`}
                    className={`px-2 py-1 text-xs rounded-md transition-colors ${
                      isDark
                        ? "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                        : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
                    }`}
                  >
                    {tag.name}
                  </Link>
                ))}
                {interactedTags.length > 3 && (
                  <span
                    className={`px-2 py-1 text-xs rounded-md ${
                      isDark ? "text-zinc-500" : "text-zinc-500"
                    }`}
                  >
                    +{interactedTags.length - 3}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default UserCard;
