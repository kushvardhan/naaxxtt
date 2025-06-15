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
      <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-64 rounded-xl"></div>
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
      className={`group relative overflow-hidden rounded-xl border p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
        isDark
          ? "bg-zinc-900 border-zinc-800 hover:border-zinc-700 hover:shadow-zinc-800/50"
          : "bg-white border-zinc-200 hover:border-zinc-300 hover:shadow-zinc-400/20"
      }`}
    >
      {/* Badge */}
      {badge && (
        <div
          className={`absolute top-4 right-4 ${badge.color} text-white text-xs px-2 py-1 rounded-full font-mono font-medium`}
        >
          {badge.label}
        </div>
      )}

      {/* Avatar */}
      <div className="flex flex-col items-center mb-4">
        <div className="relative">
          <Image
            src={
              user.image ||
              "https://banner2.cleanpng.com/20180416/gbw/avfp7lvmb.webp"
            }
            alt={user.name}
            width={80}
            height={80}
            className="w-20 h-20 rounded-full object-cover border-2 border-zinc-200 dark:border-zinc-700 group-hover:border-orange-400 transition-colors duration-300"
          />
          <div
            className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 ${
              isDark ? "border-zinc-900" : "border-white"
            } ${user.reputation > 50 ? "bg-green-500" : "bg-zinc-400"}`}
          ></div>
        </div>
      </div>

      {/* User Info */}
      <div className="text-center mb-4">
        <h3
          className={`text-lg font-semibold font-mono mb-1 ${
            isDark ? "text-zinc-100" : "text-zinc-800"
          }`}
        >
          {user.name}
        </h3>
        <p
          className={`text-sm font-mono ${
            isDark ? "text-orange-400" : "text-orange-600"
          }`}
        >
          @{user.username}
        </p>
      </div>

      {/* About */}
      <div className="mb-4">
        <p
          className={`text-sm line-clamp-3 ${
            isDark ? "text-zinc-300" : "text-zinc-600"
          }`}
        >
          {user.about || "No bio available"}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center">
          <div
            className={`text-lg font-bold font-mono ${
              isDark ? "text-zinc-100" : "text-zinc-800"
            }`}
          >
            {user.reputation}
          </div>
          <div
            className={`text-xs font-mono ${
              isDark ? "text-zinc-400" : "text-zinc-500"
            }`}
          >
            Reputation
          </div>
        </div>
        <div className="text-center">
          <div
            className={`text-lg font-bold font-mono ${
              isDark ? "text-zinc-100" : "text-zinc-800"
            }`}
          >
            {user.saved?.length || 0}
          </div>
          <div
            className={`text-xs font-mono ${
              isDark ? "text-zinc-400" : "text-zinc-500"
            }`}
          >
            Saved
          </div>
        </div>
      </div>

      {/* Location & Join Date */}
      <div className="space-y-2 mb-4">
        {user.location && (
          <div className="flex items-center gap-2 text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`w-4 h-4 ${
                isDark ? "text-zinc-400" : "text-zinc-500"
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
              className={`font-mono ${
                isDark ? "text-zinc-300" : "text-zinc-600"
              }`}
            >
              {user.location}
            </span>
          </div>
        )}
        <div className="flex items-center gap-2 text-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`w-4 h-4 ${isDark ? "text-zinc-400" : "text-zinc-500"}`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5a2.25 2.25 0 0 0 2.25-2.25m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5a2.25 2.25 0 0 1 2.25 2.25v7.5"
            />
          </svg>
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
        <div className="mb-4">
          <Link
            href={user.portfolioWebsite}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 text-sm font-mono hover:underline ${
              isDark
                ? "text-orange-400 hover:text-orange-300"
                : "text-orange-600 hover:text-orange-700"
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
        className={`block w-full text-center py-2 px-4 rounded-lg font-mono text-sm font-medium transition-all duration-200 ${
          isDark
            ? "bg-zinc-800 text-zinc-200 hover:bg-zinc-700 border border-zinc-700 hover:border-zinc-600"
            : "bg-zinc-100 text-zinc-800 hover:bg-zinc-200 border border-zinc-200 hover:border-zinc-300"
        }`}
      >
        View Profile
      </Link>
    </div>
  );
};

export default UserCard;
