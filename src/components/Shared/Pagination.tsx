"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery } from "../../../lib/utils";

interface Props {
  pageNumber: number;
  isNext: boolean;
}

const Pagination = ({ pageNumber, isNext }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const theme = useContext(ThemeContext);

  const handleNavigation = (direction: string) => {
    const nextPageNumber =
      direction === "prev" ? pageNumber - 1 : pageNumber + 1;

    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "page",
      value: nextPageNumber.toString(),
    });

    router.push(newUrl);
  };

  if (!isNext && pageNumber === 1) return null;

  const isDark = (theme as any)?.mode === "dark";

  return (
    <div className="flex w-full items-center justify-center gap-3 mt-8">
      <button
        disabled={pageNumber === 1}
        onClick={() => handleNavigation("prev")}
        className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
          pageNumber === 1
            ? "opacity-50 cursor-not-allowed"
            : "hover:scale-105 active:scale-95"
        } ${
          isDark
            ? "bg-gray-800 text-white border border-gray-700 hover:bg-gray-700 hover:border-orange-500"
            : "bg-white text-gray-700 border border-gray-300 hover:bg-orange-50 hover:border-orange-500"
        }`}
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="hidden sm:inline">Previous</span>
      </button>

      <div
        className={`flex items-center justify-center px-4 py-2 rounded-lg font-bold ${
          isDark
            ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white"
            : "bg-gradient-to-r from-orange-500 to-orange-600 text-white"
        }`}
      >
        <span className="text-sm">Page {pageNumber}</span>
      </div>

      <button
        disabled={!isNext}
        onClick={() => handleNavigation("next")}
        className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
          !isNext
            ? "opacity-50 cursor-not-allowed"
            : "hover:scale-105 active:scale-95"
        } ${
          isDark
            ? "bg-gray-800 text-white border border-gray-700 hover:bg-gray-700 hover:border-orange-500"
            : "bg-white text-gray-700 border border-gray-300 hover:bg-orange-50 hover:border-orange-500"
        }`}
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
};

export default Pagination;
