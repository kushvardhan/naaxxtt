"use client";

import { User } from "@/app/(root)/community/page";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";

interface UserCardProps {
  user: User;
}

const UserCard = ({ user }: UserCardProps) => {
  const theme = useContext(ThemeContext);

  if (!theme || !theme.mounted) {
    return (
      <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-xl border border-gray-300 dark:border-gray-600">
        <div className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
            <div className="flex-1">
              <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
            </div>
          </div>
          <div className="h-10 bg-gray-300 dark:bg-gray-600 rounded mb-4"></div>
          <div className="flex justify-between mb-4">
            <div className="text-center">
              <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-8 mx-auto mb-1"></div>
              <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-12 mx-auto"></div>
            </div>
            <div className="text-center">
              <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-8 mx-auto mb-1"></div>
              <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-12 mx-auto"></div>
            </div>
            <div className="text-center">
              <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-12 mx-auto mb-1"></div>
              <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-12 mx-auto"></div>
            </div>
          </div>
          <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded"></div>
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
    if (daysSinceJoined <= 30) return { label: "New", color: "bg-green-500" };
    if (user.reputation > 100) return { label: "Top", color: "bg-orange-500" };
    if (daysSinceJoined > 365)
      return { label: "Veteran", color: "bg-blue-500" };
    return null;
  };

  const badge = getUserBadge();

  // Format join date
  const formatJoinDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div
      className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
        isDark
          ? "bg-zinc-900/50 backdrop-blur-sm border-zinc-800 hover:border-zinc-700"
          : "bg-white/80 backdrop-blur-sm border-zinc-200 hover:border-zinc-300"
      }`}
    >
      {/* Badge */}
      {badge && (
        <div
          className={`absolute top-3 right-3 ${badge.color} text-white text-xs px-2 py-1 rounded-full font-mono font-medium z-10`}
        >
          {badge.label}
        </div>
      )}

      <div className="p-6">
        {/* Avatar & Basic Info */}
        <div className="flex items-center gap-4 mb-4">
          <div className="relative">
            <Image
              src={
                user.image ||
                "https://banner2.cleanpng.com/20180416/gbw/avfp7lvmb.webp"
              }
              alt={user.name}
              width={60}
              height={60}
              className="w-14 h-14 rounded-full object-cover border-2 border-zinc-200 dark:border-zinc-700 group-hover:border-orange-400 transition-colors duration-300"
            />
            <div
              className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 ${
                isDark ? "border-zinc-900" : "border-white"
              } ${user.reputation > 50 ? "bg-green-500" : "bg-zinc-400"}`}
            ></div>
          </div>

          <div className="flex-1 min-w-0">
            <h3
              className={`text-lg font-semibold font-mono truncate ${
                isDark ? "text-zinc-100" : "text-zinc-800"
              }`}
            >
              {user.name}
            </h3>
            <p
              className={`text-sm font-mono truncate ${
                isDark ? "text-orange-400" : "text-orange-600"
              }`}
            >
              @{user.username}
            </p>
          </div>
        </div>

        {/* Bio */}
        <p
          className={`text-sm line-clamp-2 mb-4 ${
            isDark ? "text-zinc-400" : "text-zinc-600"
          }`}
        >
          {user.about || "No bio available"}
        </p>

        {/* Stats */}
        <div className="flex justify-between items-center mb-4">
          <div className="text-center">
            <div
              className={`text-lg font-bold font-mono ${
                isDark ? "text-orange-400" : "text-orange-600"
              }`}
            >
              {user.reputation}
            </div>
            <div
              className={`text-xs font-mono ${
                isDark ? "text-zinc-500" : "text-zinc-500"
              }`}
            >
              Reputation
            </div>
          </div>

          <div className="text-center">
            <div
              className={`text-lg font-bold font-mono ${
                isDark ? "text-orange-400" : "text-orange-600"
              }`}
            >
              {user.saved?.length || 0}
            </div>
            <div
              className={`text-xs font-mono ${
                isDark ? "text-zinc-500" : "text-zinc-500"
              }`}
            >
              Saved
            </div>
          </div>

          <div className="text-center">
            <div
              className={`text-lg font-bold font-mono ${
                isDark ? "text-zinc-300" : "text-zinc-700"
              }`}
            >
              {formatJoinDate(user.joinedAt)}
            </div>
            <div
              className={`text-xs font-mono ${
                isDark ? "text-zinc-500" : "text-zinc-500"
              }`}
            >
              Joined
            </div>
          </div>
        </div>

        {/* Location */}
        {user.location && (
          <div className="flex items-center gap-2 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`w-4 h-4 ${
                isDark ? "text-zinc-500" : "text-zinc-500"
              }`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
              />
            </svg>
            <span
              className={`text-sm font-mono ${
                isDark ? "text-zinc-400" : "text-zinc-600"
              }`}
            >
              {user.location}
            </span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2">
          {user.portfolioWebsite && (
            <Link
              href={user.portfolioWebsite}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex-1 text-center py-2 px-3 rounded-lg font-mono text-sm transition-all duration-200 border ${
                isDark
                  ? "text-orange-400 border-zinc-700 hover:border-orange-500 hover:bg-zinc-800"
                  : "text-orange-600 border-zinc-300 hover:border-orange-400 hover:bg-orange-50"
              }`}
            >
              Portfolio
            </Link>
          )}
          <Link
            href={`/profile/${user.clerkId}`}
            className={`flex-1 text-center py-2 px-3 rounded-lg font-mono text-sm font-medium transition-all duration-200 ${
              isDark
                ? "bg-orange-600 text-white hover:bg-orange-500"
                : "bg-orange-500 text-white hover:bg-orange-600"
            }`}
          >
            View Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
