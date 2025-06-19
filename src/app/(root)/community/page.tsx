import CommunityClient from "@/components/Shared/CommunityClient";
import { getAllUser } from "../../../../lib/actions/user.action";
import { getTopInteractedTags } from "../../../../lib/actions/tag.action"


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

  const interactedTags = await getTopInteractedTags({ userId: result?.users?._id });
console.log("interacted tags: ", interactedTags);


  return(
    <div className="w-full h-[calc(100vh-130px)] w-full mt-20 overflow-y-scroll scrollbar-hidden" >
    <CommunityClient  interactedTags={interactedTags} users={result?.users || []} />
  </div>
  ) 
};

export default CommunityPage;
