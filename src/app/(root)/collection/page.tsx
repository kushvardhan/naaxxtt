import { auth } from "@clerk/nextjs/server";
import type { Metadata } from "next";
import { getSavedQuestions } from "../../../../lib/actions/user.action";
import CollectionPage from "../../../components/Shared/CollectionPage";

interface SearchParamsProps {
  searchParams: { [key: string]: string | undefined };
}

export const metadata: Metadata = {
  title: "NullFlow | Collection",
};

const Page = async ({ searchParams }: SearchParamsProps) => {
  const { userId: clerkId } = await auth();
  const resolvedSearchParams = await searchParams;
  // console.log("CLERKID COLLECTION: ",clerkId);

  if (!clerkId) {
    return (
      <div className="mt-20 text-center text-lg">
        Please log in to view your saved questions.
      </div>
    );
  }

  const result = await getSavedQuestions({
    clerkId,
    searchQuery: resolvedSearchParams?.q,
    filter: resolvedSearchParams?.filter,
    page: resolvedSearchParams?.page ? +resolvedSearchParams?.page : 1,
  });
  // console.log("Collection DOEFD: ", result);

  const mappedQuestions = Array.isArray(result?.questions)
    ? result?.questions?.map((q: any) => ({
        _id: q?._id?.toString(),
        title: q?.title || "No Title",
        tags:
          q.tags?.map((tag) => ({
            _id: tag?._id?.toString(),
            name: tag?.name || "Unknown",
          })) || [],
        user: {
          name: q?.author?.name || "Unknown User",
          image: q?.author?.image,
        },
        upvotes: Array.isArray(q.upvotes) ? q.upvotes.length : 0,
        answers: Array.isArray(q.answers) ? q.answers.length : 0,
        views: q.views || 0,
        createdAt: q.createdAt
          ? new Date(q.createdAt).toISOString()
          : new Date().toISOString(),
      }))
    : [];

  // console.log('mapped collection: ', mappedQuestions);

  return (
    <div className="w-full h-[calc(100vh-130px)] mt-20 overflow-y-scroll scrollbar-hidden">
      <CollectionPage mappedQuestions={mappedQuestions} />
    </div>
  );
};

export default Page;
