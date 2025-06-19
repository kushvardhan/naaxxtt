import { getAllUser } from "../../../../lib/actions/user.action";
import CommunityClient from "./CommunityClient";

const page = async () => {
  const result = await getAllUser({});

  return <CommunityClient users={result?.users || []} />;
};

export default page;
