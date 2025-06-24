"use client";

import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import {
  ThumbsUp,
  ThumbsDown,
  Star,
  StarOff,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface VotesProps {
  type: string;
  itemId: string;
  userId: string;
  upvotes: number;
  hasupVoted: boolean;
  downvotes: number;
  hasdownVoted: boolean;
  hasSaved?: boolean;
}

const Votes = ({
  type,
  itemId,
  userId,
  upvotes,
  hasupVoted,
  downvotes,
  hasdownVoted,
  hasSaved,
}: VotesProps) => {
  const theme = useContext(ThemeContext);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSave = async () => {
    console.log("Save question:", { userId, itemId, hasSaved });
  };

  const handleVote = async (action: string) => {
    if (!userId) {
      console.log("Please log in to vote");
      return;
    }

    if (action === "upvote") {
      console.log(`${type === "Question" ? "Upvote question" : "Upvote answer"}`, {
        itemId,
        userId,
        hasupVoted,
      });
    }

    if (action === "downvote") {
      console.log(`${type === "Question" ? "Downvote question" : "Downvote answer"}`, {
        itemId,
        userId,
        hasdownVoted,
      });
    }
  };

  if (!mounted || !theme?.mounted) {
    return (
      <div className="flex gap-5">
        <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-sm h-6 w-6" />
        <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-sm h-6 w-6" />
        <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-sm h-6 w-6" />
      </div>
    );
  }

  const iconSize = 18;

  return (
    <div className="flex items-center justify-around gap-5">
      <div className="flex items-center justify-between gap-2.5">
        {/* Upvote */}
        <div className="flex items-center gap-1.5">
          <button onClick={() => handleVote("upvote")} className="cursor-pointer">
            {hasupVoted ? (
              <ThumbsUp size={iconSize} className="text-orange-500" />
            ) : (
              <ThumbsUp size={iconSize} />
            )}
          </button>
          <div className="flex items-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
            <p className="subtle-medium text-dark400_light900">{upvotes}</p>
          </div>
        </div>

        {/* Downvote */}
        <div className="flex items-center gap-1.5">
          <button onClick={() => handleVote("downvote")} className="cursor-pointer">
            {hasdownVoted ? (
              <ThumbsDown size={iconSize} className="text-red-500" />
            ) : (
              <ThumbsDown size={iconSize} />
            )}
          </button>
          <div className="flex items-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
            <p className="subtle-medium text-dark400_light900">{downvotes}</p>
          </div>
        </div>
      </div>

      {/* Save */}
      {type === "Question" && (
        <button onClick={handleSave} className="cursor-pointer">
          {hasSaved ? (
            <Star size={iconSize} className="text-yellow-500" />
          ) : (
            <StarOff size={iconSize} className="text-red-500" />
          )}
        </button>
      )}
    </div>
  );
};

export default Votes;
