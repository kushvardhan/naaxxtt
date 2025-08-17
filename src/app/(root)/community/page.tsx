import CommunityClient from "@/components/Shared/CommunityClient";
import type { Metadata } from "next";
import { getAllUser } from "../../../../lib/actions/user.action";

// Force dynamic rendering for this page
export const dynamic = "force-dynamic";

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
  title: "Developer Community | NullPointer",
  description:
    "Connect with thousands of developers in the NullPointer community. Discover talented programmers, share knowledge, and build your professional network.",
  keywords: [
    "developer community",
    "programmers",
    "software engineers",
    "tech professionals",
    "networking",
  ],
  robots: {
    index: true,
    follow: true,
  },
};

interface SearchParams {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const CommunityPage = async ({ searchParams }: SearchParams) => {
  const resolvedSearchParams = await searchParams;
  const searchQuery =
    typeof resolvedSearchParams.q === "string" ? resolvedSearchParams.q : "";
  const filter =
    typeof resolvedSearchParams.filter === "string"
      ? resolvedSearchParams.filter
      : "new_users";

  const result = await getAllUser({
    searchQuery,
    filter,
  });

  return (
    <div className="w-full h-[calc(100vh-130px)] mt-20 overflow-y-scroll scrollbar-hidden">
      <CommunityClient
        users={result?.users || []}
        searchParams={resolvedSearchParams}
      />
    </div>
  );
};

export default CommunityPage;
