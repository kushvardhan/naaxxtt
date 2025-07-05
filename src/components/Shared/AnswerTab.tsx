import { getUserAnswers } from '../../../lib/actions/user.action';
import React from 'react';
import Pagination from './Pagination';
import Link from 'next/link';
import Image from 'next/image';

interface Props extends SearchParamsProps {
  userId: string;
  clerkId?: string | null;
}

interface SearchParamsProps {
  searchParams: { [key: string]: string | undefined };
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
  const day = date.getDate();
  const suffix = day % 10 === 1 && day !== 11 ? "st" : day % 10 === 2 && day !== 12 ? "nd" : day % 10 === 3 && day !== 13 ? "rd" : "th";
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();
  return `${day}${suffix} ${month} ${year}`;
}

interface AnswerCardProps {
  _id: string;
  question: {
    _id: string;
    title: string;
    tags: { _id: string; name: string }[];
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

function AnswerCard({ _id, question, content, author, upvotes, createdAt }: AnswerCardProps) {
  return (
    <div className="w-full rounded-xl cursor-pointer border p-4 shadow-sm transition-all duration-200 hover:shadow-lg bg-white border-zinc-300 shadow-md shadow-zinc-400 dark:bg-zinc-950 dark:border-zinc-700 dark:shadow-lg dark:shadow-zinc-800">
      {/* Question Title */}
      <Link href={`/#`}>
        <h2 className="text-base sm:text-lg hover:underline font-semibold line-clamp-2 break-words dark:text-zinc-100 dark:hover:text-blue-200 text-zinc-800 hover:text-blue-800">
          {question.title}
        </h2>
      </Link>

      {/* Tags */}
      <div className="mt-2 flex flex-wrap gap-2">
        {question.tags.map((tag) => (
          <span key={tag._id} className="rounded-md sm:text-xs cursor-pointer px-2 py-1 text-xs font-mono bg-zinc-200 text-zinc-950 hover:bg-zinc-300 dark:bg-zinc-700 dark:text-white dark:hover:bg-zinc-600">
            {tag.name}
          </span>
        ))}
      </div>

      {/* Answer Content Preview */}
      <p className="mt-3 line-clamp-3 text-sm dark:text-zinc-300 text-zinc-700" dangerouslySetInnerHTML={{ __html: content }} />

      {/* Footer */}
      <div className="mt-4 flex justify-between text-xs sm:text-sm dark:text-zinc-400 text-zinc-500">
        <div className="flex items-center gap-2">
          {author.image ? (
            <Image src={author.image} alt="user" width={24} height={24} className="h-6 w-6 rounded-full object-cover" />
          ) : (
            <div className="h-6 w-6 rounded-full bg-zinc-400 flex items-center justify-center text-xs font-bold text-white">
              {author.name[0]}
            </div>
          )}
          <Link href={`/profile/${author.clerkId ?? "#"}`}>
            <span className="font-medium">{author.name}</span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <span title="Upvotes">⬆ {upvotes.length}</span>
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
  console.log("Ans res: ", result);

  return (
    <div className="w-full h-full">
      <div className="mt-8 flex w-full flex-col gap-6">
        {result.answers.length > 0 ? (
          <>
            {result.answers.map((ans) => (
              <AnswerCard key={ans._id} {...ans} />
            ))}
            <div className="mt-10">
              <Pagination pageNumber={searchParams.page ? +searchParams.page : 1} isNext={result.isNextAnswer} />
            </div>
          </>
        ) : (
          <div className="text-center py-10 text-zinc-600 dark:text-zinc-400">No answers posted yet.</div>
        )}
      </div>
    </div>
  );
};

export default AnswerTab;
