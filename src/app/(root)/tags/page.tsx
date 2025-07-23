import TagsClient from "@/components/Shared/TagsClient";
import type { Metadata } from "next";
import { getAllTags } from "../../../../lib/actions/tag.action";

export interface Tag {
  _id: string;
  name: string;
  description: string;
  questions: string[];
  followers: string[];
  createdOn: string;
}

export const metadata: Metadata = {
  title: "NullPointer | Tags",
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
