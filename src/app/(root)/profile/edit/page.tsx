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
    <div className='w-full h-[calc(100vh-120px)] mt-20 overflow-y-scroll scrollbar-hidden'>
      <h1 className="text-xl mt-2 lg:text-4xl font-bold font-mono lg:text-5xl font-bold dark:text-zinc-100 text-black">Edit Profile</h1>
      
      <div className="mt-9">
        <Profile 
          clerkId={userId}
          user={JSON.stringify(mongoUser)}
        />
      </div>
    </div>
  )
}

export default Page