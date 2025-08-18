import FindJobsClient from "@/components/Shared/FindJobsClient";
import type { Metadata } from "next";

// Force dynamic rendering for this page
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Find Jobs | NullFlow",
  description:
    "Discover amazing job opportunities in tech. Find your next career move with NullFlow's curated job listings.",
  keywords: [
    "tech jobs",
    "software developer jobs",
    "programming careers",
    "remote jobs",
    "developer opportunities",
  ],
};

interface SearchParams {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function FindJobsPage({ searchParams }: SearchParams) {
  try {
    const resolvedSearchParams = await searchParams;

    return (
      <div className="flex w-full flex-col">
        <FindJobsClient searchParams={resolvedSearchParams} />
      </div>
    );
  } catch (error) {
    console.error("Error in find-jobs page:", error);
    return (
      <div className="flex w-full flex-col items-center justify-center min-h-[400px]">
        <h1 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
          Error Loading Jobs
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Something went wrong while loading the jobs page. Please try again
          later.
        </p>
      </div>
    );
  }
}
