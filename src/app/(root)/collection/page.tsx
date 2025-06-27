// /app/(root)/community/page.tsx
import { getAllUsers } from '../../../../lib/actions/user.action';
import type { Metadata } from 'next';
import CollectionPage from '../../../components/Shared/CollectionPage';

interface SearchParamsProps {
  searchParams: { [key: string]: string | undefined };
}

export const metadata: Metadata = {
  title: 'Community | Dev Overflow',
};

const Page = async ({ searchParams }: SearchParamsProps) => {
  const result = await getAllUsers({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: searchParams.page ? +searchParams.page : 1,
  });


  return (
    <div className="w-full h-[calc(100vh-130px)] mt-20 overflow-y-scroll scrollbar-hidden">
      <CollectionPage result={result} />
    </div>
  );
};

export default Page;
