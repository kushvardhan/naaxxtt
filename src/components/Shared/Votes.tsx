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
import { viewQuestion } from "../../../lib/actions/interaction.action";

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

  const handleSave = async () => {
    await toggleSaveQuestion({
      userId: JSON.parse(userId),
      questionId: JSON.parse(itemId),
      path: pathname,
    })

    return toast({
      title: `Question ${!hasSaved ? 'Saved in' : 'Removed from'} your collection`,
      variant: !hasSaved ? 'default' : 'destructive'
    })
  }

  const handleVote = async (action: string) => {
    if(!userId) {
      return toast({
        title: 'Please log in',
        explanation: 'You must be logged in to perform this action',
      })
    }

    if(action === 'upvote') {
      if(type === 'Question') {
        await upvoteQuestion({ 
          questionId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasupVoted,
          hasdownVoted,
          path: pathname,
        })
      } else if(type === 'Answer') {
        await upvoteAnswer({ 
          answerId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasupVoted,
          hasdownVoted,
          path: pathname,
        })
      }

      return toast({
        title: `Upvote ${!hasupVoted ? 'Successful' : 'Removed'}`,
        variant: !hasupVoted ? 'default' : 'destructive'
      })
    }

    if(action === 'downvote') {
      if(type === 'Question') {
        await downvoteQuestion({ 
          questionId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasupVoted,
          hasdownVoted,
          path: pathname,
        })
      } else if(type === 'Answer') {
        await downvoteAnswer({ 
          answerId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasupVoted,
          hasdownVoted,
          path: pathname,
        })
      }

      return toast({
        title: `Downvote ${!hasupVoted ? 'Successful' : 'Removed'}`,
        variant: !hasupVoted ? 'default' : 'destructive'
      })
      
    }
  }

  useEffect(() => {
    viewQuestion({
      questionId: JSON.parse(itemId),
      userId: userId ? JSON.parse(userId) : undefined,
    })
  }, [itemId, userId, pathname, router]);


  const iconSize = 22;

  return (
    <div className="flex items-center gap-5">
      {/* Voting section */}
      <div className="flex items-center gap-4">
        {/* Upvote */}
        <div className="flex items-center gap-1.5">
          <button onClick={() => handleVote("upvote")} className="cursor-pointer">
            <ArrowBigUp size={iconSize} className={hasupVoted ? "text-orange-500" : ""} />
          </button>
          <span className="text-md font-medium text-gray-800 dark:text-gray-100 bg-gray-200 dark:bg-gray-700 min-w-[18px] rounded-sm p-1">
            {upvotes}
          </span>
        </div>

        {/* Downvote */}
        <div className="flex items-center gap-1.5">
          <button onClick={() => handleVote("downvote")} className="cursor-pointer">
            <ArrowBigDown size={iconSize} className={hasdownVoted ? "text-red-500" : ""} />
          </button>
          <span className="text-md font-medium text-gray-800 dark:text-gray-100 bg-gray-200 dark:bg-gray-700 min-w-[18px] rounded-sm p-1">
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
            <StarOff size={iconSize} className="text-yellow-500" />
          )}
        </button>
      )}
    </div>
  );
};

export default Votes;
function toggleSaveQuestion(arg0: { userId: any; questionId: any; path: string; }) {
  throw new Error("Function not implemented.");
}

function toast(arg0: { title: string; variant: string; }) {
  throw new Error("Function not implemented.");
}

function upvoteQuestion(arg0: { questionId: any; userId: any; hasupVoted: boolean; hasdownVoted: boolean; path: string; }) {
  throw new Error("Function not implemented.");
}

function upvoteAnswer(arg0: { answerId: any; userId: any; hasupVoted: boolean; hasdownVoted: boolean; path: string; }) {
  throw new Error("Function not implemented.");
}

function downvoteQuestion(arg0: { questionId: any; userId: any; hasupVoted: boolean; hasdownVoted: boolean; path: string; }) {
  throw new Error("Function not implemented.");
}

function downvoteAnswer(arg0: { answerId: any; userId: any; hasupVoted: boolean; hasdownVoted: boolean; path: string; }) {
  throw new Error("Function not implemented.");
}

