import type { Metadata } from "next";
import Profile from '../../../../components/forms/Profile';
import { auth } from "@clerk/nextjs/server";
import { getUserById } from "../../../../../lib/actions/user.action";

interface ParamsProps {
  params: { id: string };
}


export const metadata: Metadata = {
  title: "NullFlow | Edit Profile",
};

const Page = async ({ params }: ParamsProps) => {
  const { userId } = await auth();
  console.log("User id of edit page: ", userId);

  if (!userId) return null;

  const mongoUser = await getUserById({ userId });
  console.log("mongoUser: ", mongoUser);

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Edit Profile</h1>
      
      <div className="mt-9">
        <Profile 
          clerkId={userId}
          user={JSON.stringify(mongoUser)}
        />
      </div>
    </>
  )
}

export default Page