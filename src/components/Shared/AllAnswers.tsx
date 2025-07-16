import { SignedIn } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { getAnswers } from "../../../lib/actions/answer.action";
import { getTimestamp } from "../../../lib/utils";
import Filter from "./Filter";
import Pagination from "./Pagination";
import ParseHTML from "./ParseHTML";
import Votes from "./Votes";
import EditDeleteAction from "./EditDeleteAction";

interface Props {
  questionId: string;
  userId: string;
  totalAnswers: number;
  page?: number;
  filter?: string;
  clerkId: string;
}

const AllAnswers = async ({
  questionId,
  userId,
  totalAnswers,
  page,
  filter,
  clerkId,
}: Props) => {
  const result = await getAnswers({
    questionId,
    page: page ? +page : 1,
    sortBy: filter,
  });
  console.log("Server Answer resss: ", result);

  const AnswerFilters = [
    { name: "Highest Upvotes", value: "highestUpvotes" },
    { name: "Lowest Upvotes", value: "lowestUpvotes" },
    { name: "Most Recent", value: "recent" },
    { name: "Oldest", value: "old" },
  ];

  return (
    <div className="mt-8 mb-12">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-mono font-semibold text-black dark:text-white">
          {totalAnswers}{" "}
          <span className="text-xl font-normal text-zinc-700 dark:text-zinc-300">
            Answer{totalAnswers !== 1 ? "s" : ""}
          </span>
        </h3>

        {result.answers && result.answers.length > 0 && (
          <Filter filters={AnswerFilters} />
        )}
      </div>

      {/* Answers List */}
      <div className="space-y-8">
        {result.answers && result.answers.length > 0 ? (
          result.answers
            .filter((answer: any) => {
              try {
                return (
                  answer &&
                  answer._id &&
                  answer.author &&
                  typeof answer.author === "object" &&
                  answer.author.name &&
                  Array.isArray(answer.upvotes) &&
                  Array.isArray(answer.downvotes)
                );
              } catch (error) {
                console.warn("Invalid answer data:", error);
                return false;
              }
            })
            .map((answer: any) => (
              <article
                key={answer._id}
                className="bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:border-zinc-300 dark:hover:border-zinc-700"
              >
                <div className="mb-8 flex flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
                  <Link
                    href={`/profile/${answer.author.clerkId}`}
                    className="flex flex-1 items-start gap-1 sm:items-center"
                  >
                    <Image
                      src={
                        answer?.author?.image ||
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXdiU_9j45_WOVEx4pPhhIm7MaS1ju3RbXnt-k_mbz4XabjKhwDArh2jyExTXCl3IEVzw&usqp=CAU"
                      }
                      width={28}
                      height={28}
                      alt="profile"
                      className="rounded-full object-cover max-sm:mt-0.5 border-1 border-orange-500"
                    />
                    <div className="flex items-center flex-col gap-3 ml-1 sm:flex-row sm:items-center">
                      <p className="text-lg font-semibold ">
                        {answer?.author?.name}
                      </p>

                      <p className="text-md text-zinc-900 dark:text-zinc-300/50 ml-2 mt-0.5 line-clamp-1">
                        answered {getTimestamp(answer.createdAt)}
                      </p>
                    </div>
                  </Link>
                  <div className="flex justify-end gap-3">
                    <Votes
                      type="Answer"
                      itemId={JSON.stringify(answer._id)}
                      userId={JSON.stringify(userId)}
                      upvotes={answer.upvotes.length}
                      hasupVoted={answer.upvotes.includes(userId)}
                      downvotes={answer.downvotes.length}
                      hasdownVoted={answer.downvotes.includes(userId)}
                    />
                    <SignedIn>
                      {answer?.author?.clerkId && clerkId === answer?.author?.clerkId && (
                        <EditDeleteAction type="Answer" itemId={JSON.stringify(answer?._id)} />
                      )}
                    </SignedIn>
                  </div>
                </div>
                <ParseHTML data={answer.content} />
              </article>
            ))
        ) : (
          <div className="text-center py-12 text-zinc-600 dark:text-zinc-400">
            <div className="text-6xl mb-4">💭</div>
            <h3 className="text-xl font-mono font-semibold mb-2">
              No answers yet
            </h3>
            <p className="text-sm">Be the first to answer this question!</p>
          </div>
        )}
      </div>

      {/* Pagination - Show only if there are more than 3 answers */}
      {totalAnswers > 3 && (
        <div className="mt-10 w-full">
          <Pagination
            pageNumber={page ? +page : 1}
            isNext={result.isNextAnswer}
          />
        </div>
      )}
    </div>
  );
};

export default AllAnswers;
