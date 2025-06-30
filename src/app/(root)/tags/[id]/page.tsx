import Link from "next/link";
import Image from "next/image";
import NoResult from '../../../../components/Shared/NoResult';
import Pagination from '../../../../components/Shared/Pagination';
import { getQuestionsByTagId } from '../../../../../lib/actions/tag.action';
import { formatAndDivideNumber, getTimestamp } from '../../../../../lib/utils';

interface URLProps {
  params: { id: string };
  searchParams: { [key: string]: string | undefined };
}

const Page = async ({ params, searchParams }: URLProps) => {
  const result = await getQuestionsByTagId({
    tagId: params.id,
    page: searchParams.page ? +searchParams.page : 1,
    searchQuery: searchParams.q,
  });

function formatDate(dateInput: string | Date): string {
  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;

  if (isNaN(date.getTime())) return "Invalid date";

  const now = new Date();
  const diff = now.getTime() - date.getTime();

  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;
  const month = 30 * day;
  const year = 365 * day;

  if (diff < minute) {
    const seconds = Math.floor(diff / 1000);
    return `${seconds} ${seconds === 1 ? "second" : "seconds"} ago`;
  } else if (diff < hour) {
    const minutes = Math.floor(diff / minute);
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
  } else if (diff < day) {
    const hours = Math.floor(diff / hour);
    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  } else if (diff < week) {
    const days = Math.floor(diff / day);
    return `${days} ${days === 1 ? "day" : "days"} ago`;
  } else if (diff < month) {
    const weeks = Math.floor(diff / week);
    return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
  } else if (diff < year) {
    const months = Math.floor(diff / month);
    return `${months} ${months === 1 ? "month" : "months"} ago`;
  } else {
    const years = Math.floor(diff / year);
    return `${years} ${years === 1 ? "year" : "years"} ago`;
  }
}

  return (
    <div className="w-full h-[calc(100vh-130px)] mt-20 overflow-y-scroll scrollbar-hidden">
      <h1 className="text-2xl lg:text-5xl flex items-center flex-wrap font-bold font-mono dark:text-zinc-100 text-black">
        <span className="text-lg font-mono dark:text-zinc-300 text-zinc-800 select-none">
          Tag Title:&nbsp;
        </span>
        {result.tagTitle}
      </h1>

      <div className="mt-10 flex w-full flex-col gap-6">
        {result.questions.length > 0 ? (
          result.questions.map((que) => (
            <div
              key={que._id}
              className="w-full rounded-xl cursor-pointer border p-4 shadow-sm transition-all duration-200 hover:shadow-lg bg-white border-zinc-300 shadow-md shadow-zinc-400 dark:bg-zinc-950 dark:border-zinc-700 dark:shadow-zinc-800"
            >
              <Link href={`/question/${que._id}`}>
                <h2 className="text-base sm:text-lg hover:underline font-semibold line-clamp-2 break-words text-zinc-800 hover:text-blue-700 dark:text-zinc-100 dark:hover:text-blue-300">
                  {que.title}
                </h2>
              </Link>

              <div className="mt-3 flex flex-wrap gap-2">
                {que.tags.map((tag) => (
                  <span
                    key={tag._id}
                    title={tag.name}
                    className="rounded-md cursor-pointer px-2 py-1 text-xs font-mono bg-zinc-200 text-zinc-950 hover:bg-zinc-300 transition-all dark:bg-zinc-700 dark:text-white dark:hover:bg-zinc-600"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>

              <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-sm text-zinc-500 dark:text-zinc-400">
                <div className="flex items-center gap-3">
                  <Image
                    src={que?.author?.image}
                    alt={que?.author?.name}
                    width={24}
                    height={24}
                    className="h-8 w-8 rounded-full object-cover border-2 border-orange-500 dark:border-orange-700"
                  />
                  <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                    {que?.author?.name}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm">
                  <span title="Upvote" className="flex items-center gap-1 text-red-600 dark:text-white">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.781 2.375c-.381-.475-1.181-.475-1.562 0l-8 10A1.001 1.001 0 0 0 4 14h4v7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7h4a1.001 1.001 0 0 0 .781-1.625l-8-10zM15 12h-1v8h-4v-8H6.081L12 4.601 17.919 12H15z" />
                    </svg>
                    {formatAndDivideNumber(que.upvotes)}
                  </span>

                  <span title="Answer" className="flex items-center gap-1 text-zinc-700 dark:text-zinc-100">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                    </svg>
                    {que.answers}
                  </span>

                  <span title="Views" className="flex items-center gap-1 text-zinc-700 dark:text-zinc-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                    {que.views}
                  </span>

                  <span title="Created At" className="text-xs font-semibold select-none text-zinc-700 dark:text-zinc-300">
                    {formatDate(que.createdAt)}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <NoResult
            title="There’s no tag question saved to show"
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. Your query could be the next big thing others learn from. Get involved! 💡"
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </div>

      <div className="mt-10">
        <Pagination
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={result.isNext}
        />
      </div>
    </div>
  );
};

export default Page;
