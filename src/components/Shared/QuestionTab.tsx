import Image from "next/image";
import Link from "next/link";
import { getUserQuestions } from "../../../lib/actions/user.action";
import Pagination from "./Pagination";

interface Props {
  searchParams: { [key: string]: string | undefined };
  userId: string;
}

function formatDate(dateString: string): string {
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

  // If older than a month
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

interface QuestionCardProps {
  _id: string;
  title: string;
  tags: { _id: string; name: string }[];
  author: {
    name: string;
    image: string;
    clerkId?: string | null;
  };
  upvotes: number;
  views: number;
  answers: number;
  createdAt: string;
}

function QuestionCard({
  _id,
  title,
  tags,
  author,
  upvotes,
  views,
  answers,
  createdAt,
}: QuestionCardProps) {
  const isDark = false;

  return (
    <div
      className="w-full rounded-xl cursor-pointer border p-4 shadow-sm transition-all duration-200 hover:shadow-lg 
  bg-white border-zinc-300 shadow-md shadow-zinc-400
  dark:bg-zinc-950 dark:border-zinc-700 dark:shadow-lg dark:shadow-zinc-800"
    >
      {/* Title */}
      {title && (
        <Link href={`/question/${_id}`}>
          <h2
            className="text-base sm:text-lg hover:underline font-semibold line-clamp-2 break-words 
        dark:text-zinc-100 dark:hover:text-blue-200 text-zinc-800 hover:text-blue-800"
          >
            {title}
          </h2>
        </Link>
      )}

      {/* Tags */}
      {tags?.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag?._id}
              title={tag?.name}
              className="rounded-md sm:text-xs cursor-pointer px-2 py-1 text-xs font-mono 
            dark:bg-zinc-700 dark:text-white dark:hover:bg-zinc-600 dark:transition-all 
            bg-zinc-200 text-zinc-950 hover:bg-zinc-300 transition-all"
            >
              {tag?.name}
            </span>
          ))}
        </div>
      )}

      {/* Meta Info */}
      <div
        className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-sm 
    dark:text-zinc-400 text-zinc-500"
      >
        {/* User */}
        {author && (
          <div className="flex items-center gap-3">
            {author?.image ? (
              <Image
                src={author.image}
                alt={author.name || "User"}
                width={24}
                height={24}
                className="h-8 w-8 rounded-full object-cover 
              dark:border-1 dark:border-orange-700 border-2 border-orange-500"
              />
            ) : (
              <div className="h-8 w-8 rounded-full bg-gray-300 dark:bg-zinc-700 flex items-center justify-center text-xs font-bold text-white">
                {author?.name?.[0]?.toUpperCase() ?? "?"}
              </div>
            )}
            <Link
              title={`clerkId: ${author?.clerkId ?? "unknown"}`}
              href={`/profile/${author?.clerkId ?? "#"}`}
            >
              <span className="text-sm font-medium">
                {author?.name ?? "Anonymous"}
              </span>
            </Link>
          </div>
        )}

        {/* Stats */}
        <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm">
          {/* Upvotes */}

          <span
            title="Upvote"
            className="flex items-center gap-1 dark:text-zinc-100 text-zinc-700"
          >
            <svg
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              stroke="none"
            >
              <path d="M12.781 2.375c-.381-.475-1.181-.475-1.562 0l-8 10A1.001 1.001 0 0 0 4 14h4v7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7h4a1.001 1.001 0 0 0 .781-1.625l-8-10zM15 12h-1v8h-4v-8H6.081L12 4.601 17.919 12H15z" />
            </svg>
            {upvotes}
          </span>

          {/* Comments */}
          <span
            title="Answer"
            className="flex items-center gap-1 dark:text-zinc-100 text-zinc-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
              />
            </svg>
            {answers}
          </span>

          {/* Views */}
          {typeof views === "number" && (
            <span
              title="Views"
              className="flex items-center gap-1 dark:text-zinc-100 text-zinc-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 
              7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 
              9.963 7.178.07.207.07.431 0 
              .639C20.577 16.49 16.64 19.5 12 
              19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
              {views}
            </span>
          )}

          {/* Date */}
          {createdAt && (
            <span
              title="Created At"
              className="text-xs spacing-tighter font-semibold select-none 
          dark:text-zinc-300 text-zinc-700"
            >
              {formatDate(createdAt)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

const QuestionTab = async ({ searchParams, userId }: Props) => {
  const result = await getUserQuestions({
    userId,
    page: searchParams.page ? +searchParams.page : 1,
  });
  console.log("Quest Tab: ", result );

  return (
    <div className="w-full h-full">
      <div className="mt-8 flex w-full flex-col gap-10">
        {result.questions.length > 0 ? (
          <div className=" h-full flex w-full flex-col gap-6">
            {result.questions.map((question) => (
              <QuestionCard
                key={question._id}
                _id={question._id}
                title={question.title}
                tags={question.tags}
                author={question.author}
                upvotes={question.upvotes.length}
                views={question.views}
                answers={question.answers.length}
                createdAt={question.createdAt}
              />
            ))}

            <div className="mt-10">
              <Pagination
                pageNumber={searchParams?.page ? +searchParams.page : 1}
                isNext={result.isNextQuestions}
              />
            </div>
          </div>
        ) : (
          <div
            className="relative max-w-xl mx-auto p-8 mb-6 rounded-3xl transition-all duration-300 overflow-hidden shadow-md
          bg-white text-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
          >
            {/* Mini Floating Cards */}
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-300 rounded-xl shadow-md flex items-center justify-center text-3xl font-bold rotate-[-12deg]">
              ?
            </div>
            <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-pink-100 text-pink-600 dark:bg-pink-900 dark:text-pink-300 rounded-xl shadow-md flex items-center justify-center text-2xl font-bold rotate-[10deg]">
              ???
            </div>

            {/* SVG Illustration */}
            <div className="flex justify-center mb-6">
              {/* your SVG code */}
            </div>

            {/* Message */}
            <p className="text-center text-2xl font-bold font-mono tracking-tighter">
              No Questions Found
            </p>
            <p className="text-center mt-2 text-base font-medium select-none text-zinc-700 dark:text-zinc-300/80">
              No questions have been asked yet. 🚀 Start the conversation by
              posting your query — chances are, others are wondering the same!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionTab;
