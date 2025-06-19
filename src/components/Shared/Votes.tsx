"use client";

import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import Image from "next/image";
// import { downvoteAnswer, upvoteAnswer } from "@/lib/actions/answer.action";
// import { downvoteQuestion, upvoteQuestion } from "@/lib/actions/question.action";
// import { toggleSaveQuestion } from "@/lib/actions/user.action";
import { usePathname, useRouter } from "next/navigation";
// import { toast } from "@/components/ui/use-toast";

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
    // await toggleSaveQuestion({
    //   userId: JSON.parse(userId),
    //   questionId: JSON.parse(itemId),
    //   path: pathname,
    // });

    // return toast({
    //   title: `Question ${
    //     !hasSaved ? "Saved in" : "Removed from"
    //   } your collection`,
    //   variant: !hasSaved ? "default" : "destructive",
    // });
    console.log("Save question:", { userId, itemId, hasSaved });
  };

  const handleVote = async (action: string) => {
    if (!userId) {
      // return toast({
      //   title: "Please log in",
      //   description: "You must be logged in to perform this action",
      // });
      console.log("Please log in to vote");
      return;
    }

    if (action === "upvote") {
      if (type === "Question") {
        // await upvoteQuestion({
        //   questionId: JSON.parse(itemId),
        //   userId: JSON.parse(userId),
        //   hasupVoted,
        //   hasdownVoted,
        //   path: pathname,
        // });
        console.log("Upvote question:", { itemId, userId, hasupVoted });
      } else if (type === "Answer") {
        // await upvoteAnswer({
        //   answerId: JSON.parse(itemId),
        //   userId: JSON.parse(userId),
        //   hasupVoted,
        //   hasdownVoted,
        //   path: pathname,
        // });
        console.log("Upvote answer:", { itemId, userId, hasupVoted });
      }

      // return toast({
      //   title: `Upvote ${!hasupVoted ? "Successful" : "Removed"}`,
      //   variant: !hasupVoted ? "default" : "destructive",
      // });
    }

    if (action === "downvote") {
      if (type === "Question") {
        // await downvoteQuestion({
        //   questionId: JSON.parse(itemId),
        //   userId: JSON.parse(userId),
        //   hasupVoted,
        //   hasdownVoted,
        //   path: pathname,
        // });
        console.log("Downvote question:", { itemId, userId, hasdownVoted });
      } else if (type === "Answer") {
        // await downvoteAnswer({
        //   answerId: JSON.parse(itemId),
        //   userId: JSON.parse(userId),
        //   hasupVoted,
        //   hasdownVoted,
        //   path: pathname,
        // });
        console.log("Downvote answer:", { itemId, userId, hasdownVoted });
      }

      // return toast({
      //   title: `Downvote ${!hasdownVoted ? "Successful" : "Removed"}`,
      //   variant: !hasdownVoted ? "default" : "destructive",
      // });
    }
  };

  if (!mounted || !theme || !theme.mounted) {
    return (
      <div className="flex gap-5">
        <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-sm h-6 w-6"></div>
        <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-sm h-6 w-6"></div>
        <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-sm h-6 w-6"></div>
      </div>
    );
  }

  const isDark = theme?.mode === "dark";

  return (
    <div className="flex gap-5">
      <div className="flex-center gap-2.5">
        <div className="flex-center gap-1.5">
          <Image
            src={
              hasupVoted
                ? "/assets/icons/upvoted.svg"
                : "/assets/icons/upvote.svg"
            }
            width={18}
            height={18}
            alt="upvote"
            className="cursor-pointer"
            onClick={() => handleVote("upvote")}
          />

          <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
            <p className="subtle-medium text-dark400_light900">{upvotes}</p>
          </div>
        </div>

        <div className="flex-center gap-1.5">
          <Image
            src={
              hasdownVoted
                ? "/assets/icons/downvoted.svg"
                : "/assets/icons/downvote.svg"
            }
            width={18}
            height={18}
            alt="downvote"
            className="cursor-pointer"
            onClick={() => handleVote("downvote")}
          />

          <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
            <p className="subtle-medium text-dark400_light900">{downvotes}</p>
          </div>
        </div>
      </div>

      {type === "Question" && (
        <Image
          src={
            hasSaved
              ? "/assets/icons/star-filled.svg"
              : "/assets/icons/star-red.svg"
          }
          width={18}
          height={18}
          alt="star"
          className="cursor-pointer"
          onClick={handleSave}
        />
      )}
    </div>
  );
};

export default Votes;
