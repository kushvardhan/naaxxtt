"use client";

import Image from "next/image";
import Link from "next/link";
import RenderTag from "./RenderTag";

interface RightSideBarClientProps {
  hotQuestions: { _id: string; title: string }[];
  popularTags: { _id: string; name: string; numberOfQuestions: number }[];
}

const RightSideBarClient = ({ hotQuestions, popularTags }: RightSideBarClientProps) => {

  console.log("hotquestion23: ", hotQuestions);
  console.log("popularTags233: ", popularTags);

  return (
    <section className="bg-light-900 dark:bg-dark-200 border-light-800 dark:border-dark-300 custom-scrollbar sticky right-0 top-0 flex h-[calc(screen-120px)] overflow-y-scroll scrollbar-hidden w-[350px] flex-col border-l p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden transition-all duration-300">
      {/* Top Questions */}
      <div>
        <h3 className="text-[20px] font-bold leading-[26px] text-dark-200 dark:text-light-900">Top Questions</h3>
        <div className="mt-6 flex flex-col gap-4">
          {hotQuestions?.length > 0 ? (
            hotQuestions.map((question) => (
              <Link
                href={`/question/${question._id}`}
                key={question._id}
                className="group flex items-center justify-between gap-3 rounded-md px-4 py-3 transition-all duration-200 hover:bg-light-800 dark:hover:bg-dark-300"
              >
                <p className="text-[14px] font-medium leading-[18.2px] text-dark-500 dark:text-light-700 group-hover:text-dark-800 dark:group-hover:text-light-100 transition-colors">
                  {question.title}
                </p>
                <Image
                  src="/assets/icons/chevron-right.svg"
                  alt="chevron right"
                  width={18}
                  height={18}
                  className="invert dark:invert-0 transition-transform duration-200 group-hover:translate-x-1"
                />
              </Link>
            ))
          ) : (
            <p className="text-[14px] font-normal leading-[19.6px] text-dark-500 dark:text-light-700">
              No questions available yet.
            </p>
          )}
        </div>
      </div>

      {/* Popular Tags */}
      <div className="mt-12">
        <h3 className="text-[20px] font-bold leading-[26px] text-dark-200 dark:text-light-900">Popular Tags</h3>
        <div className="mt-6 flex flex-wrap gap-3">
          {popularTags?.length > 0 ? (
            popularTags.map((tag) => (
              <RenderTag
                key={tag._id}
                _id={tag._id}
                name={tag.name}
                totalQuestions={tag.numberOfQuestions}
                showCount
              />
            ))
          ) : (
            <p className="text-[14px] font-normal leading-[19.6px] text-dark-500 dark:text-light-700">
              No tags available yet.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default RightSideBarClient;
