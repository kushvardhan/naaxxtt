"use client";

import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import {
  ArrowBigUp,
  ArrowBigDown,
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
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-sm h-6 w-6"
          />
        ))}
      </div>
    );
  }

  const iconSize = 18;

  return (
    <div className="flex items-center gap-5">
      {/* Voting section */}
      <div className="flex items-center gap-4">
        {/* Upvote */}
        <div className="flex items-center gap-1.5">
          <button onClick={() => handleVote("upvote")} className="cursor-pointer">
            <ArrowBigUp size={iconSize} className={hasupVoted ? "text-orange-500" : ""} />
          </button>
          <span className="subtle-medium text-dark400_light900 background-light700_dark400 min-w-[18px] rounded-sm p-1">
            {upvotes}
          </span>
        </div>

        {/* Downvote */}
        <div className="flex items-center gap-1.5">
          <button onClick={() => handleVote("downvote")} className="cursor-pointer">
            <ArrowBigDown size={iconSize} className={hasdownVoted ? "text-red-500" : ""} />
          </button>
          <span className="subtle-medium text-dark400_light900 background-light700_dark400 min-w-[18px] rounded-sm p-1">
            {downvotes}
          </span>
        </div>
      </div>

      {/* Save button for Questions only */}
      {type === "Question" && (
        <button onClick={handleSave} className="cursor-pointer">
          {hasSaved ? (
            <Star size={iconSize} className="text-yellow-500" />
          ) : (
            <StarOff size={iconSize} className="text-gray-400" />
          )}
        </button>
      )}
    </div>
  );
};

export default Votes;
