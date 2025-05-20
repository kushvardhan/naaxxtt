"use client";
import Link from "next/link";
import { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";

const topQuestions = [
  {
    question:
      "What is the best way to learn React amet consectetur The best way to learn React is to build projects. (SSR ) EIHH?",
    slug: "/questions/1",
  },
  {
    question:
      "What is the best way to learn React lorem ipsum dolor sit adipisicing elit?",
    slug: "/questions/2",
  },
  {
    question: "What is the best way to learn React?",
    slug: "/questions/3",
  },
  {
    question:
      "What is the best way to learn React The best way to learn React is to build projects?",
    slug: "/questions/4",
  },
  {
    question: "What is the best way to learn React?",
    slug: "/questions/5",
  },
];

const popularTags = [
  { tag: "JavaScript", count: 1250 },
  { tag: "React", count: 1120 },
  { tag: "Next.js aRCHITECHTURE", count: 980 },
  { tag: "MongoDB", count: 870 },
  { tag: "Node.js", count: 810 },
  { tag: "CSS", count: 780 },
  { tag: "HTML", count: 750 },
  { tag: "TypeScript", count: 700 },
  { tag: "Express", count: 640 },
];

const RightSideBar = () => {
  const theme = useContext(ThemeContext);

  const bgColor =
    theme.mode === "dark"
      ? "bg-zinc-900 text-white border-zinc-800"
      : "bg-gradient-to-l from-white to-zinc-100/30 text-black border-zinc-200";

  const hoverBg =
    theme.mode === "dark" ? "hover:bg-black" : "hover:bg-zinc-300";

  return (
   <section
  className={`${bgColor} ${
    theme.mode === "light" ? "shadow-xl shadow-zinc-400/60" : ""
  } sticky right-0 top-0 h-screen border-l p-6 pt-28 hidden lg:block lg:w-[300px] xl:w-[330px]`}
>
      <div className="h-full overflow-y-auto hide-scrollbar flex flex-col gap-6">
        {/* Top Questions */}
        <div>
          <h1 className="text-xl font-bold mb-3">Top Questions</h1>
          <div className="flex flex-col gap-2">
            {topQuestions.slice(0, 5).map((que, ind) => (
              <Link
                href={que.slug}
                key={ind}
                className={`group flex justify-between items-center gap-3 rounded-md px-2 py-3 text-sm ${hoverBg} transition-all duration-200`}
              >
                <span className="flex-1 line-clamp-3.5">{que.question}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 shrink-0"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
                </svg>
              </Link>
            ))}
          </div>
        </div>

        {/* Popular Tags */}
        <div>
          <h1 className="text-xl font-bold mb-4">Popular Tags</h1>
          <div className="flex flex-wrap gap-2">
            {popularTags.map(({ tag, count }, index) => (
              <Link
                href={`/tag/${tag.toLowerCase()}`}
                key={index}
                className={`flex items-center gap-2 px-2 py-1 rounded-full text-sm font-medium border ${
                  theme.mode === "dark"
                    ? "border-zinc-700 text-white hover:bg-orange-400/30"
                    : "border-zinc-300 text-black hover:bg-orange-200"
                } transition-all duration-200 whitespace-nowrap`}
              >
                #{tag}
                <span
                  className={`text-xs rounded-full px-2 py-0.5 ${
                    theme.mode === "dark"
                      ? "bg-zinc-800 text-zinc-300"
                      : "bg-zinc-200 text-zinc-700"
                  }`}
                >
                  {count}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RightSideBar;
