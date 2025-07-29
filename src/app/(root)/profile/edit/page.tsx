import type { Metadata } from "next";
import Profile from '../../../../components/forms/Profile';
import { auth } from "@clerk/nextjs/server";
import { getUserById } from "../../../../../lib/actions/user.action";
import Loading from './loading';

export const metadata: Metadata = {
  title: "NullFlow | Edit Profile",
};

interface PageProps {
  params: { id: string };
}

const Page = async ({ params }: PageProps) => {
  const { userId } = await auth();
  if (!userId) return null;

  const mongoUser = await getUserById({ userId: params.id }); // using params.id, not userId

  const isLoading = false; // temporarily hardcoded for demo
  if (isLoading) return <Loading />;

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

export default Page;
