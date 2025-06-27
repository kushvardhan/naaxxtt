import { getSavedQuestions } from '../../../../lib/actions/user.action';
import type { Metadata } from 'next';
import CollectionPage from '../../../components/Shared/CollectionPage';
import { auth } from "@clerk/nextjs/server";

interface SearchParamsProps {
  searchParams: { [key: string]: string | undefined };
}

export const metadata: Metadata = {
  title: 'Collection | Dev Overflow',
};

const Page = async ({ searchParams }: SearchParamsProps) => {
    const {userId: clerkId} = await auth();
    console.log(clerkId, " from collection");

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
  console.log(result);
  return (
    <div className="w-full h-[calc(100vh-130px)] mt-20 overflow-y-scroll scrollbar-hidden">
      <CollectionPage result={result} />
    </div>
  );
};

export default Page;
