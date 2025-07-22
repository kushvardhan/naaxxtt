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
  searchParams: { [key: string]: string | string[] | undefined };
}

const TagsPage = async ({ searchParams }: SearchParams) => {
  try {
    const searchQuery = typeof searchParams.q === 'string' ? searchParams.q : '';
    const filter = typeof searchParams.filter === 'string' ? searchParams.filter : 'popular';
    const page = typeof searchParams.page === 'string' ? parseInt(searchParams.page) : 1;

    const result = await getAllTags({
      searchQuery,
      filter,
      page,
      pageSize: 10,
    });

    return (
      <div className="w-full h-[calc(100vh-130px)] mt-20 overflow-y-scroll scrollbar-hidden">
        <TagsClient tags={result?.tags || []} searchParams={searchParams} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching tags:", error);
    return <TagsClient tags={[]} searchParams={searchParams} />;
  }
};

export default TagsPage;
