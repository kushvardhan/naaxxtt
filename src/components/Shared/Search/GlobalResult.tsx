"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IoReload } from "react-icons/io5";
import { globalSearch } from "../../../../lib/actions/general.action";
import GlobalFilters from "./GlobalFilters";

const GlobalResult = () => {
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState([
    { type: "question", id: 1, title: "Next.js question" },
    { type: "tag", id: 1, title: "Nextjs" },
    { type: "user", id: 1, title: "jsm" },
  ]);

  const global = searchParams.get("global");
  const type = searchParams.get("type");

  useEffect(() => {
    const fetchResult = async () => {
      setResult([]);
      setIsLoading(true);

      try {
        const res = await globalSearch({ query: global, type });
        console.log("res from global search: ", res);

        setResult(JSON.parse(res));
      } catch (error) {
        console.error(error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    };

    if (global) {
      fetchResult();
    }
  }, [global, type]);

  const renderLink = (type: string, id: string) => {
    switch (type) {
      case "question":
      case "answer":
        return `/question/${id}`;
      case "user":
        return `/profile/${id}`;
      case "tag":
        return `/tags/${id}`;
      default:
        return "/";
    }
  };

  return (
    <div className="absolute top-full z-10 mt-3 w-full rounded-xl bg-gray-100 py-5 shadow-sm dark:bg-gray-900">
      <GlobalFilters />
      <div className="my-5 h-[1px] bg-gray-200/50 dark:bg-gray-600/50" />

      <div className="space-y-5">
        <p className="px-5 text-base font-semibold text-neutral-600 dark:text-neutral-100">
          Top Match
        </p>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center px-5">
            <IoReload className="my-2 h-10 w-10 animate-spin text-orange-500" />
            <p className="text-sm font-normal text-neutral-400 dark:text-neutral-200">
              Browsing the entire database
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {result.length > 0 ? (
              result.map((item: any, index: number) => (
                <Link
                  href={renderLink(item.type, item.id)}
                  key={item.type + item.id + index}
                  className="flex w-full cursor-pointer items-start gap-3 px-5 py-2.5 hover:bg-gray-200/50 dark:hover:bg-gray-800/50"
                >
                  <Image
                    src="/assets/icons/tag.svg"
                    alt="tags"
                    width={18}
                    height={18}
                    className="invert mt-1 object-contain dark:invert-0 text-black dark:text-white"
                  />

                  <div className="flex flex-col">
                    <p className="line-clamp-1 text-base font-medium text-neutral-400 dark:text-neutral-200">
                      {item.title}
                    </p>
                    <p className="mt-1 text-xs font-medium text-gray-400 dark:text-gray-500 capitalize">
                      {item.type}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center px-5">
                <p className="px-5 py-2.5 text-sm font-normal text-neutral-400 dark:text-neutral-200">
                  Oops, no results found
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GlobalResult;
