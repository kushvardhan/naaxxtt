import Image from "next/image";
import Link from "next/link";
import { getUserAnswers } from "../../../lib/actions/user.action";
import Pagination from "./Pagination";

interface Props extends SearchParamsProps {
  userId: string;
  clerkId?: string | null;
}

interface SearchParamsProps {
  searchParams: { [key: string]: string | undefined };
}

function formatDate(dateString: string): string {
  if (!dateString || isNaN(Date.parse(dateString))) return "Unknown date";

  const date = new Date(dateString);
  const now = new Date();
  const diff = now.getTime() - date.getTime();

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const weeks = Math.floor(days / 7);

  if (minutes < 1) return `${seconds} seconds ago`;
  if (hours < 1) return `${minutes} minutes ago`;
  if (days < 1) return `${hours} hours ago`;
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${weeks} weeks ago`;

  const day = date.getDate();
  const suffix =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
      ? "nd"
      : day % 10 === 3 && day !== 13
      ? "rd"
      : "th";

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  return `${day}${suffix} ${month} ${year}`;
}

interface AnswerCardProps {
  _id: string;
  question: {
    _id: string;
    title: string;
    tags?: { _id: string; name: string }[]; // <-- tags optional
  };
  content: string;
  author: {
    name: string;
    image: string;
    clerkId?: string | null;
  };
  upvotes: any[];
  createdAt: string;
}

function AnswerCard({
  _id,
  question,
  content,
  author,
  upvotes,
  createdAt,
}: AnswerCardProps) {
  if (!question) {
    return (
      <div
        className="relative max-w-xl mx-auto p-6 mb-6 rounded-3xl transition-all duration-300 overflow-hidden shadow-md
    bg-white text-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
      >
        {/* Floating Badge */}
        <div className="absolute -top-5 -left-5 w-20 h-20 bg-zinc-200 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300 rounded-xl shadow-md flex items-center justify-center text-2xl font-semibold rotate-[-10deg]">
          ⚠️
        </div>
        <div className="absolute -bottom-5 -right-5 w-20 h-20 bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400 rounded-xl shadow-md flex items-center justify-center text-xl font-semibold rotate-[8deg]">
          🗑️
        </div>

        {/* Message */}
        <p className="text-center text-xl font-bold font-mono tracking-tight">
          Linked Question Not Found
        </p>
        <p className="text-center mt-2 text-base font-medium select-none text-zinc-700 dark:text-zinc-300/80">
          This answer was originally posted under a question that has been
          removed or no longer exists.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:border-zinc-300 dark:hover:border-zinc-700">
      {/* Question Reference */}
      <div className="mb-4 p-3 rounded-lg border-l-4 border-orange-500 bg-orange-50 dark:bg-orange-900/20">
        <p className="text-sm font-mono text-zinc-600 dark:text-zinc-400 mb-1">
          Answer to:
        </p>
        <Link href={`/question/${question._id}`}>
          <h2
            className="text-base sm:text-lg hover:underline font-semibold line-clamp-2 break-words
            dark:text-zinc-100 dark:hover:text-orange-300 text-zinc-800 hover:text-orange-600 transition-colors"
          >
            {question.title}
          </h2>
        </Link>
      </div>

      {/* Tags */}
      {Array.isArray(question.tags) && question.tags.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {question.tags.map((tag) => (
            <span
              key={tag._id}
              className="rounded-md sm:text-xs cursor-pointer px-2 py-1 text-xs font-mono bg-zinc-200 text-zinc-950 hover:bg-zinc-300 dark:bg-zinc-700 dark:text-white dark:hover:bg-zinc-600"
            >
              {tag.name}
            </span>
          ))}
        </div>
      )}

      {/* Answer Content */}
      {/* Answer Content */}
      <p
        className="mt-3 line-clamp-3 text-sm dark:text-zinc-300 text-zinc-700"
        dangerouslySetInnerHTML={{ __html: content || "" }}
      />
      {/* Meta Info */}
      <div className="mt-4 flex justify-between text-xs sm:text-sm dark:text-zinc-400 text-zinc-500">
        <div className="flex items-center gap-2">
          {author?.image ? (
            <Image
              src={author.image}
              alt="user"
              width={24}
              height={24}
              className="h-6 w-6 rounded-full object-cover"
            />
          ) : (
            <div className="h-6 w-6 rounded-full bg-zinc-400 flex items-center justify-center text-xs font-bold text-white">
              {author?.name?.[0]?.toUpperCase() ?? "?"}
            </div>
          )}

          {author && (
            <Link href={`/profile/${author.clerkId ?? "#"}`}>
              <span className="font-medium">{author.name ?? "Anonymous"}</span>
            </Link>
          )}
        </div>

        <div className="flex items-center gap-4">
          {/* <span title="Upvotes">⬆ {upvotes.length}</span> */}
          <span title="Created At">{formatDate(createdAt)}</span>
        </div>
      </div>
    </div>
  );
}

const AnswerTab = async ({ searchParams, userId }: Props) => {
  const result = await getUserAnswers({
    userId,
    page: searchParams.page ? +searchParams.page : 1,
  });
  console.log("Answer resss: ", result);

  return (
    <div className="w-full h-full">
      <div className="mt-8 flex w-full flex-col gap-6">
        {result.answers.length > 0 ? (
          <>
            {result.answers
              .filter(
                (a: any) =>
                  a.question && a.author && typeof a.author === "object"
              )
              .map((ans: any) => (
                <AnswerCard
                  key={ans._id}
                  {...ans}
                  question={{
                    ...ans.question,
                    tags: Array.isArray(ans.question.tags)
                      ? ans.question.tags
                      : [],
                  }}
                />
              ))}

            <div className="mt-10">
              <Pagination
                pageNumber={searchParams.page ? +searchParams.page : 1}
                isNext={result.isNextAnswer}
              />
            </div>
          </>
        ) : (
          <div
            className="relative max-w-xl mx-auto p-8 mb-6 rounded-3xl transition-all duration-300 overflow-hidden shadow-md
              bg-white text-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
          >
            {/* Floating Cards */}
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-blue-200 text-blue-600 dark:bg-blue-900 dark:text-blue-300 rounded-xl shadow-md flex items-center justify-center text-3xl font-bold rotate-[-12deg]">
              💭
            </div>
            <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-purple-200 text-purple-600 dark:bg-purple-900 dark:text-purple-300 rounded-xl shadow-md flex items-center justify-center text-2xl font-bold rotate-[10deg]">
              💬
            </div>

            {/* Message */}
            <p className="text-center text-2xl font-bold font-mono tracking-tighter">
              No Answers Yet
            </p>
            <p className="text-center mt-2 text-base font-medium select-none text-zinc-700 dark:text-zinc-300/80">
              You haven’t shared your thoughts yet. ✍️ Dive in and start
              answering — your insights might be exactly what someone needs to
              move forward!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnswerTab;
