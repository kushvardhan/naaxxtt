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
      <div className="animate-pulse bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 h-80 lg:h-96 rounded-2xl">
        <div className="p-8">
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 lg:w-28 lg:h-28 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
          </div>
          <div className="space-y-3">
            <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded-lg w-3/4 mx-auto"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded-lg w-1/2 mx-auto"></div>
            <div className="h-16 bg-gray-300 dark:bg-gray-600 rounded-lg w-full"></div>
          </div>
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
      className={`group relative overflow-hidden rounded-2xl border transition-all duration-500 ease-out hover:shadow-2xl hover:-translate-y-3 hover:scale-[1.03] cursor-pointer ${
        isDark
          ? "bg-gradient-to-br from-zinc-900 to-zinc-800 border-zinc-700 hover:border-orange-500/50 hover:shadow-orange-500/20"
          : "bg-gradient-to-br from-white to-zinc-50 border-zinc-200 hover:border-orange-400/50 hover:shadow-orange-500/30"
      }`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-transparent"></div>
      </div>

      {/* Badge */}
      {badge && (
        <div
          className={`absolute top-6 right-6 ${badge.color} text-white text-xs px-3 py-1.5 rounded-full font-mono font-medium shadow-lg z-10`}
        >
          {badge.label}
        </div>
      )}

      {/* Header Section */}
      <div className="relative p-6 lg:p-8 pb-4 lg:pb-6">
        {/* Avatar */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full blur-sm opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
            <Image
              src={
                user.image ||
                "https://banner2.cleanpng.com/20180416/gbw/avfp7lvmb.webp"
              }
              alt={user.name}
              width={100}
              height={100}
              className="relative w-24 h-24 lg:w-28 lg:h-28 rounded-full object-cover border-4 border-white dark:border-zinc-800 shadow-xl group-hover:border-orange-400 transition-all duration-300"
            />
            <div
              className={`absolute -bottom-2 -right-2 w-8 h-8 rounded-full border-4 shadow-lg ${
                isDark ? "border-zinc-900" : "border-white"
              } ${user.reputation > 50 ? "bg-green-500" : "bg-zinc-400"}`}
            >
              <div className="w-full h-full rounded-full bg-current opacity-90"></div>
            </div>
          </div>
        </div>

        {/* User Info */}
        <div className="text-center mb-6">
          <h3
            className={`text-xl lg:text-2xl font-bold font-mono mb-2 ${
              isDark ? "text-zinc-100" : "text-zinc-800"
            }`}
          >
            {user.name}
          </h3>
          <p
            className={`text-base font-mono ${
              isDark ? "text-orange-400" : "text-orange-600"
            }`}
          >
            @{user.username}
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="px-6 lg:px-8 pb-6 lg:pb-8">
        {/* About */}
        <div className="mb-6">
          <h4
            className={`text-sm font-mono font-semibold mb-3 ${
              isDark ? "text-zinc-300" : "text-zinc-700"
            }`}
          >
            About
          </h4>
          <p
            className={`text-sm leading-relaxed line-clamp-3 ${
              isDark ? "text-zinc-400" : "text-zinc-600"
            }`}
          >
            {user.about || "No bio available"}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div
            className={`text-center p-4 rounded-xl border ${
              isDark
                ? "bg-zinc-800/50 border-zinc-700"
                : "bg-zinc-50 border-zinc-200"
            }`}
          >
            <div
              className={`text-2xl font-bold font-mono mb-1 ${
                isDark ? "text-orange-400" : "text-orange-600"
              }`}
            >
              {user.reputation}
            </div>
            <div
              className={`text-xs font-mono uppercase tracking-wide ${
                isDark ? "text-zinc-400" : "text-zinc-500"
              }`}
            >
              Reputation
            </div>
          </div>
          <div
            className={`text-center p-4 rounded-xl border ${
              isDark
                ? "bg-zinc-800/50 border-zinc-700"
                : "bg-zinc-50 border-zinc-200"
            }`}
          >
            <div
              className={`text-2xl font-bold font-mono mb-1 ${
                isDark ? "text-orange-400" : "text-orange-600"
              }`}
            >
              {user.saved?.length || 0}
            </div>
            <div
              className={`text-xs font-mono uppercase tracking-wide ${
                isDark ? "text-zinc-400" : "text-zinc-500"
              }`}
            >
              Saved
            </div>
          </div>
        </div>

        {/* Meta Information */}
        <div className="space-y-3 mb-6">
          {user.location && (
            <div className="flex items-center gap-3 text-sm">
              <div
                className={`p-2 rounded-lg ${
                  isDark ? "bg-zinc-800" : "bg-zinc-100"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={`w-4 h-4 ${
                    isDark ? "text-orange-400" : "text-orange-600"
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
              </div>
              <span
                className={`font-mono ${
                  isDark ? "text-zinc-300" : "text-zinc-600"
                }`}
              >
                {user.location}
              </span>
            </div>
          )}
          <div className="flex items-center gap-3 text-sm">
            <div
              className={`p-2 rounded-lg ${
                isDark ? "bg-zinc-800" : "bg-zinc-100"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={`w-4 h-4 ${
                  isDark ? "text-orange-400" : "text-orange-600"
                }`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5a2.25 2.25 0 0 0 2.25-2.25m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5a2.25 2.25 0 0 1 2.25 2.25v7.5"
                />
              </svg>
            </div>
            <span
              className={`font-mono ${
                isDark ? "text-zinc-300" : "text-zinc-600"
              }`}
            >
              Joined {formatJoinDate(user.joinedAt)}
            </span>
          </div>
        </div>

        {/* Portfolio Link */}
        {user.portfolioWebsite && (
          <div className="mb-6">
            <Link
              href={user.portfolioWebsite}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-3 text-sm font-mono p-3 rounded-lg border transition-all duration-200 hover:scale-105 ${
                isDark
                  ? "text-orange-400 hover:text-orange-300 border-zinc-700 hover:border-orange-500 bg-zinc-800/50"
                  : "text-orange-600 hover:text-orange-700 border-zinc-200 hover:border-orange-400 bg-zinc-50"
              }`}
            >
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
                  d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
                />
              </svg>
              Portfolio
            </Link>
          </div>
        )}

        {/* View Profile Button */}
        <Link
          href={`/profile/${user.clerkId}`}
          className={`block w-full text-center py-4 px-6 rounded-xl font-mono text-sm font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg ${
            isDark
              ? "bg-gradient-to-r from-orange-600 to-orange-500 text-white hover:from-orange-500 hover:to-orange-400 shadow-orange-500/25"
              : "bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-400 hover:to-orange-500 shadow-orange-500/25"
          }`}
        >
          View Profile
        </Link>
      </div>
    </div>
  );
};

export default UserCard;
