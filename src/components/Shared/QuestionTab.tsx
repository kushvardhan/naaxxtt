"use client";

import React, { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import Link from "next/link";
import Image from "next/image";
import Pagination from "./Pagination";
import { getUserQuestions } from "../../../lib/actions/user.action";



interface SearchParamsProps {
  searchParams: { [key: string]: string | undefined };
}

interface Props extends SearchParamsProps {
  userId: string;
  clerkId?: string | null;
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};


const QuestionTab = ({ searchParams, userId, clerkId }: Props) => {
  const [questionsData, setQuestionsData] = React.useState<any>(null);
  const theme = useContext(ThemeContext);
  const isDark = theme?.mode === "dark";

  React.useEffect(() => {
    const fetchQuestions = async () => {
      const result = await getUserQuestions({
        userId,
        page: searchParams.page ? +searchParams.page : 1,
      });
      setQuestionsData(result);
    };

    fetchQuestions();
  }, [searchParams.page, userId]);

  if (!questionsData) return <div>Loading...</div>;

  return (
    <>
      {questionsData.questions.map((que: any) => (
        <div
          key={que._id}
          className={`w-full rounded-xl cursor-pointer border p-4 shadow-sm transition-all duration-200 hover:shadow-lg
            ${
              isDark
                ? "bg-zinc-950 border-zinc-700 shadow-lg shadow-zinc-800"
                : "bg-white border-zinc-300 shadow-md shadow-zinc-400"
            }
          `}
        >
          <Link href={`/question/${que._id}`}>
            <h2
              className={`text-base sm:text-lg hover:underline font-semibold line-clamp-2 break-words
              ${isDark ? "text-zinc-100 hover:text-blue-300" : "text-zinc-800 hover:text-blue-700"}
            `}
            >
              {que.title}
            </h2>
          </Link>

          <div className="mt-3 flex flex-wrap gap-2">
            {que.tags.map((tag: any) => (
              <span
                key={tag._id}
                title={tag.name}
                className={`rounded-md cursor-pointer px-2 py-1 text-xs font-mono
                  ${
                    isDark
                      ? "bg-zinc-700 text-white hover:bg-zinc-600 transition-all"
                      : "bg-zinc-200 text-zinc-950 hover:bg-zinc-300 transition-all "
                  }
                `}
              >
                {tag.name}
              </span>
            ))}
          </div>

          <div
            className={`mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-sm
              ${isDark ? "text-zinc-400" : "text-zinc-500"}
            `}
          >
            <div className="flex items-center gap-3">
              <Image
                src={que.user.image}
                alt={que.user.name}
                width={24}
                height={24}
                className={`h-8 w-8 rounded-full object-cover ${isDark ? "border-1 border-orange-700" : "border-2 border-orange-500"}`}
              />
              <Link title={`clerkId: ${que?.user?.clerkId}`} href={`/profile/${que?.user?.clerkId}`}>
                <span className="text-sm font-medium">{que.user.name}</span>
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm">
              <span className={`${isDark ? "text-white" : "text-red-600"} flex items-center gap-1`}>
                ▲ {que.upvotes}
              </span>
              <span className={`${isDark ? "text-zinc-100" : "text-zinc-700"} flex items-center gap-1`}>
                💬 {que.answers}
              </span>
              <span className={`${isDark ? "text-zinc-100" : "text-zinc-700"} flex items-center gap-1`}>
                👁️ {que.views}
              </span>
              <span className={`${isDark ? "text-zinc-300" : "text-zinc-700"} text-xs spacing-tighter font-semibold select-none`}>
                {formatDate(que.createdAt)}
              </span>
            </div>
          </div>
        </div>
      ))}

      <div className="mt-10">
        <Pagination
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={questionsData.isNextQuestions}
        />
      </div>
    </>
  );
};

export default QuestionTab;
