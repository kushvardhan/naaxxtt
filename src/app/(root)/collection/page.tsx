import { getSavedQuestions } from '../../../../lib/actions/user.action';
import type { Metadata } from 'next';
import CollectionPage from '../../../components/Shared/CollectionPage';
import { auth } from "@clerk/nextjs/server";

interface SearchParamsProps {
  searchParams: { [key: string]: string | undefined };
}

export const metadata: Metadata = {
  title: 'nullPointer | Collection',
};

const Page = async ({ searchParams }: SearchParamsProps) => {
    const {userId: clerkId} = await auth();
    console.log("CLERKID COLLECTION: ",clerkId);

  if (!clerkId) {
    return <div className="mt-20 text-center text-lg">
        Please log in to view your saved questions.
      </div>
  }

  const result = await getSavedQuestions({
    clerkId,
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: searchParams.page ? +searchParams.page : 1,
  });
  console.log("Collection DOEFD: ", result);

const mappedQuestions = Array.isArray(result.questions)
  ? result.questions.map((q: any) => ({
      _id: q._id?.toString() || "",
      title: q.title || "No Title",
      tags: Array.isArray(q.tags)
        ? q.tags.map((tag: any) => ({
            _id: tag?._id?.toString() || "",
            name: tag?.name || "Unknown",
          }))
        : [],
      user: {
        name: q.author?.name || "Unknown User",
        image:
          q.author?.image ||
          "https://banner2.cleanpng.com/20180416/gbw/avfp7lvmb.webp",
      },
      upvotes: Array.isArray(q.upvotes) ? q.upvotes.length : 0,
      answers: Array.isArray(q.answers) ? q.answers.length : 0,
      views: typeof q.views === "number" ? q.views : 0,
      createdAt: q.createdAt
        ? new Date(q.createdAt).toISOString()
        : new Date().toISOString(),
    }))
  : [];


console.log('mapped collection: ', mappedQuestions);

  return (
    <div className="w-full h-[calc(100vh-130px)] mt-20 overflow-y-scroll scrollbar-hidden">
      <CollectionPage mappedQuestions={mappedQuestions} />
    </div>
  );
};

export default Page;
