import CommunityClient from "@/components/Shared/CommunityClient";
import type { Metadata } from "next";
import { getAllUser } from "../../../../lib/actions/user.action";

export interface User {
  _id: string;
  clerkId: string;
  name: string;
  username: string;
  email: string;
  image: string;
  about: string;
  location?: string;
  portfolioWebsite?: string;
  reputation: number;
  saved: string[];
  joinedAt: string;
}

export const metadata: Metadata = {
  title: "NullPointer | Community",
};

interface SearchParams {
  searchParams: { [key: string]: string | string[] | undefined };
}

const CommunityPage = async ({ searchParams }: SearchParams) => {
  const searchQuery = typeof searchParams.q === "string" ? searchParams.q : "";
  const filter =
    typeof searchParams.filter === "string" ? searchParams.filter : "new_users";

  const result = await getAllUser({
    searchQuery,
    filter,
  });

  return (
    <div className="w-full h-[calc(100vh-130px)] mt-20 overflow-y-scroll scrollbar-hidden">
      <CommunityClient
        users={result?.users || []}
        searchParams={searchParams}
      />
    </div>
  );
};

export default CommunityPage;
