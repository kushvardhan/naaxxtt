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

const CommunityPage = async () => {
  const result = await getAllUser();
  console.log("result of getAllUser: ", result);

  return (
    <div className="w-full h-[calc(100vh-130px)] mt-20 overflow-y-scroll scrollbar-hidden">
      <CommunityClient users={result?.users || []} />
    </div>
  );
};

export default CommunityPage;
