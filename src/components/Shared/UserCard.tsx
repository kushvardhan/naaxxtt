"use client";

import { User } from "@/app/(root)/community/page";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";


interface UserCardProps {
  user: User;
  interactedTags: { _id: number | string; name: string }[];
}

const UserCard = ({ user, interactedTags }: UserCardProps) => {
  const theme = useContext(ThemeContext);
  console.log("tags: ",interactedTags);

  if (!theme || !theme.mounted) {
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
      className={`group relative overflow-hidden rounded-3xl transition-all duration-500 w-80 min-w-[320px] max-w-[380px] ${
        isDark
          ? "bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 border border-zinc-700/50 hover:border-orange-500/50 shadow-2xl hover:shadow-orange-500/20"
          : "bg-gradient-to-br from-white via-zinc-50 to-white border border-zinc-200/50 hover:border-orange-400/50 shadow-2xl hover:shadow-orange-500/30"
      }`}
    >
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/8 via-transparent to-orange-600/8"></div>
        <div className="absolute top-0 left-0 w-32 h-32 bg-orange-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-orange-600/10 rounded-full blur-2xl"></div>
      </div>

      {/* Badge */}
      {badge && (
        <div
          className={`absolute top-5 right-5 ${badge.color} text-white text-sm px-4 py-2 rounded-full font-mono font-bold shadow-xl backdrop-blur-sm z-10 border-2 border-white/20`}
        >
          {badge.label}
        </div>
      )}

      {/* Card Content */}
      <div className="relative p-8 flex flex-col space-y-6">
        {/* Header Section */}
        <div className="flex items-center space-x-5 w-full">
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full blur-lg opacity-0 group-hover:opacity-80 transition-opacity duration-700"></div>
            <Image
              src={
                user.image ||
                "https://banner2.cleanpng.com/20180416/gbw/avfp7lvmb.webp"
              }
              alt={user.name}
              width={90}
              height={90}
              className="relative w-[90px] h-[90px] rounded-full object-cover border-4 border-white dark:border-zinc-800 shadow-2xl group-hover:border-orange-400 transition-all duration-500"
            />
            <div
              className={`absolute -bottom-2 -right-2 w-8 h-8 rounded-full border-4 shadow-xl ${
                isDark ? "border-zinc-900" : "border-white"
              } ${
                user.reputation > 50 ? "bg-emerald-500" : "bg-zinc-400"
              } transition-all duration-300 group-hover:scale-125 flex items-center justify-center`}
            >
              <div className="w-3 h-3 bg-white rounded-full opacity-90"></div>
            </div>
          </div>

          {/* User Info */}
          <div className="flex-1 min-w-0 space-y-2">
            <h3
              className={`text-xl font-bold font-mono truncate ${
                isDark ? "text-zinc-100" : "text-zinc-800"
              } group-hover:text-orange-400 transition-colors duration-300`}
            >
              {user.name}
            </h3>
            <p
              className={`text-base font-mono truncate ${
                isDark ? "text-orange-400" : "text-orange-600"
              }`}
            >
              @{user.username}
            </p>
            <div className="flex items-center gap-2">
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
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5a2.25 2.25 0 0 0 2.25-2.25m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5a2.25 2.25 0 0 1 2.25 2.25v7.5"
                />
              </svg>
              <span
                className={`text-sm font-mono ${
                  isDark ? "text-zinc-400" : "text-zinc-600"
                }`}
              >
                {formatJoinDate(user.joinedAt)}
              </span>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="w-full">
          <div className="flex justify-between items-center gap-4">
            <div
              className={`flex-1 text-center p-4 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                isDark
                  ? "bg-gradient-to-br from-zinc-800 to-zinc-700 border-zinc-600 group-hover:border-orange-500/50 shadow-lg"
                  : "bg-gradient-to-br from-zinc-50 to-white border-zinc-300 group-hover:border-orange-400/50 shadow-lg"
              }`}
            >
              <div
                className={`text-3xl font-bold font-mono mb-1 ${
                  isDark ? "text-orange-400" : "text-orange-600"
                }`}
              >
                {user.reputation}
              </div>
              <div
                className={`text-sm font-mono uppercase tracking-wider font-semibold ${
                  isDark ? "text-zinc-400" : "text-zinc-600"
                }`}
              >
                Reputation
              </div>
            </div>

            <div
              className={`flex-1 text-center p-4 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                isDark
                  ? "bg-gradient-to-br from-zinc-800 to-zinc-700 border-zinc-600 group-hover:border-orange-500/50 shadow-lg"
                  : "bg-gradient-to-br from-zinc-50 to-white border-zinc-300 group-hover:border-orange-400/50 shadow-lg"
              }`}
            >
              <div
                className={`text-3xl font-bold font-mono mb-1 ${
                  isDark ? "text-orange-400" : "text-orange-600"
                }`}
              >
                {user.saved?.length || 0}
              </div>
              <div
                className={`text-sm font-mono uppercase tracking-wider font-semibold ${
                  isDark ? "text-zinc-400" : "text-zinc-600"
                }`}
              >
                Saved
              </div>
            </div>
          </div>
        </div>

        {/* Location Section */}
        {user.location && (
          <div className="w-full">
            <div
              className={`flex items-center justify-center gap-3 p-3 rounded-xl border ${
                isDark
                  ? "bg-zinc-800/30 border-zinc-700"
                  : "bg-zinc-50/50 border-zinc-200"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={`w-5 h-5 ${
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
              <span
                className={`text-base font-mono font-medium ${
                  isDark ? "text-zinc-300" : "text-zinc-700"
                }`}
              >
                {user.location}
              </span>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="w-full flex gap-4">
          {user.portfolioWebsite && (
            <Link
              href={user.portfolioWebsite}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center gap-2 p-4 rounded-2xl transition-all duration-300   hover:rotate-3 ${
                isDark
                  ? "text-orange-400  hover:bg-orange-500/10 hover:shadow-xl hover:shadow-orange-500/20"
                  : "text-orange-600  hover:bg-orange-50 hover:shadow-xl hover:shadow-orange-500/30"
              }`}
              title="Portfolio Website"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
                />
              </svg>
              <span className='text-xl'></span>
            </Link>
          )}
          <Link
            href={`/profile/${user.clerkId}`}
            className={`flex-1 text-center py-4 px-6 rounded-2xl font-mono text-base font-bold transition-all duration-300  ${
              isDark
                ? "bg-gradient-to-r from-orange-600 via-orange-500 to-orange-600 text-white hover:from-orange-500 hover:via-orange-400 hover:to-orange-500 shadow-lg shadow-orange-500/25"
                : "bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 text-white hover:from-orange-400 hover:via-orange-500 hover:to-orange-400 shadow-lg shadow-orange-500/25"
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
