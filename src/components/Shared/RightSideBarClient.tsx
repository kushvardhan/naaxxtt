"use client";

import Image from "next/image";
import Link from "next/link";
import RenderTag from "./RenderTag";

interface RightSideBarClientProps {
  hotQuestions: { _id: string; title: string }[];
  popularTags: { _id: string; name: string; numberOfQuestions: number }[];
}

const RightSideBarClient = ({
  hotQuestions,
  popularTags,
}: RightSideBarClientProps) => {
  console.log("hotquestion23: ", hotQuestions);
  console.log("popularTags233: ", popularTags);

  return (
    <section className="bg-light-900 dark:bg-zinc-900 border-light-800 dark:border-dark-300 sticky right-0 top-0 flex h-[calc(screen-120px)] overflow-y-scroll scrollbar-hidden w-[350px] flex-col border-l p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden transition-all duration-300">
      {/* Top Questions */}
      <div>
        <h3 className="text-xl font-bold leading-[26px] text-dark-200 dark:text-light-900">
          Top Questions
        </h3>
        <div className="mt-6 flex flex-col gap-4">
          {hotQuestions?.length > 0 ? (
            hotQuestions.map((question, index) => (
              <div
                key={question._id}
                className="animate-fade-in"
                style={{
                  animationDelay: `${index * 150}ms`,
                  animation: `fadeInLeft 0.6s ease-out ${index * 150}ms both`,
                }}
              >
                <Link
                  href={`/question/${question._id}`}
                  className="group flex items-center justify-between gap-3 rounded-md px-4 py-3 bg-light-800 dark:bg-dark-300 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:bg-orange-50 dark:hover:bg-orange-900/20 border border-transparent hover:border-orange-200 dark:hover:border-orange-800"
                >
                  <p className="text-[14px] font-medium leading-[18.2px] text-dark-500 dark:text-light-700 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors line-clamp-2">
                    {question.title}
                  </p>
                  <Image
                    src="/assets/icons/chevron-right.svg"
                    alt="chevron right"
                    width={18}
                    height={18}
                    className="invert dark:invert-0 transition-transform duration-300 group-hover:translate-x-2 group-hover:text-orange-500 flex-shrink-0"
                  />
                </Link>
              </div>
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
        <h3 className="text-xl font-bold leading-[26px] text-dark-200 dark:text-light-900">
          Popular Tags
        </h3>
        <div className="mt-6 flex flex-wrap gap-3">
          {popularTags?.length > 0 ? (
            popularTags.map((tag, index) => (
              <div
                key={tag._id}
                className="transform transition-all duration-300 hover:scale-105 hover:translate-x-1 animate-fade-in"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: `fadeInUp 0.6s ease-out ${index * 100}ms both`,
                }}
              >
                <RenderTag
                  _id={tag._id}
                  name={tag.name}
                  totalQuestions={tag.numberOfQuestions}
                  showCount={false} // Don't show count as requested
                />
              </div>
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
