"use client";

import Image from "next/image";
import Link from "next/link";
import RenderTag from "./RenderTag";

interface RightSideBarClientProps {
  hotQuestions: { _id: string; title: string }[];
  popularTags: { _id: string; name: string; numberOfQuestions: number }[];
}

const RightSideBarClient = ({ hotQuestions, popularTags }: RightSideBarClientProps) => {

  console.log("hotQuestions: ", hotQuestions);
  console.log("popularTags: ", popularTags);

  return (
    <section className="bg-light-900 dark:bg-dark-200 border-light-800 dark:border-dark-300 custom-scrollbar sticky right-0 top-0 flex h-screen w-[350px] flex-col overflow-y-auto border-l p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden">
      <div>
        <h3 className="text-[20px] font-bold leading-[26px] text-dark-200 dark:text-light-900">Top Questions</h3>
        <div className="mt-7 flex w-full flex-col gap-[30px]">
          {hotQuestions && hotQuestions.length > 0 ? (
            hotQuestions.map((question) => (
              <Link
                href={`/question/${question._id}`}
                key={question._id}
                className="flex cursor-pointer items-center justify-between gap-7"
              >
                <p className="text-[14px] font-medium leading-[18.2px] text-dark-500 dark:text-light-700">
                  {question.title}
                </p>
                <Image
                  src="/assets/icons/chevron-right.svg"
                  alt="chevron right"
                  width={20}
                  height={20}
                  className="invert dark:invert-0"
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
      <div className="mt-16">
        <h3 className="text-[20px] font-bold leading-[26px] text-dark-200 dark:text-light-900">Popular Tags</h3>
        <div className="mt-7 flex flex-col gap-4">
          {popularTags && popularTags.length > 0 ? (
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
