import CommunityClient from "@/components/Shared/CommunityClient";
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

const CommunityPage = async () => {
  const result = await getAllUser();
  console.log('result of getAllUser: ', result);

  return <CommunityClient users={result?.users || []} />;
};

export default CommunityPage;
