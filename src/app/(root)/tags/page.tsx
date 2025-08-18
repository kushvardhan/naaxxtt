import TagsClient from "@/components/Shared/TagsClient";
import type { Metadata } from "next";
import { getAllTags } from "../../../../lib/actions/tag.action";

// Force dynamic rendering for this page
export const dynamic = "force-dynamic";

export interface Tag {
  _id: string;
  name: string;
  description: string;
  questions: string[];
  followers: string[];
  createdOn: string;
}

export const metadata: Metadata = {
  title: "Programming Tags | NullPointer",
  description:
    "Explore programming tags and technologies on NullPointer. Find questions and discussions about React, JavaScript, Python, Node.js, and hundreds of other technologies.",
  keywords: [
    "programming tags",
    "technology topics",
    "coding categories",
    "development frameworks",
    "programming languages",
  ],
  robots: {
    index: true,
    follow: true,
  },
};

interface SearchParams {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const TagsPage = async ({ searchParams }: SearchParams) => {
  try {
    const resolvedSearchParams = await searchParams;
    const searchQuery =
      typeof resolvedSearchParams.q === "string" ? resolvedSearchParams.q : "";
    const filter =
      typeof resolvedSearchParams.filter === "string"
        ? resolvedSearchParams.filter
        : "popular";
    const page =
      typeof resolvedSearchParams.page === "string"
        ? parseInt(resolvedSearchParams.page)
        : 1;

    const result = await getAllTags({
      searchQuery,
      filter,
      page,
      pageSize: 10,
    });

    return (
      <div className="w-full h-[calc(100vh-130px)] mt-20 overflow-y-scroll scrollbar-hidden">
        <TagsClient
          tags={result?.tags || []}
          searchParams={resolvedSearchParams}
          pagination={{
            page,
            isNext: result?.isNext || false,
            totalTags: result?.totalTags || 0,
          }}
        />
      </div>
    );
  } catch (error) {
    console.error("Error fetching tags:", error);
    const fallbackSearchParams = await searchParams;
    return <TagsClient tags={[]} searchParams={fallbackSearchParams} />;
  }
};

export default TagsPage;
