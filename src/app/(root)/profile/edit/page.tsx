import type { Metadata } from "next";
export const dynamic = 'force-dynamic';

import Profile from '../../../../components/forms/Profile';
import { auth } from "@clerk/nextjs/server";
import { getUserById } from "../../../../../lib/actions/user.action";

export const metadata: Metadata = {
  title: "NullFlow | Edit Profile",
};

interface ParamsProps {
  params: { id: string };
}

const Page = async ({ params }: ParamsProps) => {
  try {
    const { userId } = await auth();
    if (!userId) return null;

    const mongoUser = await getUserById({ userId });
    if (!mongoUser) return null;

    return (
      <div className='w-full h-[calc(100vh-120px)] mt-20 overflow-y-scroll scrollbar-hidden'>
        <h1 className="text-xl mt-2 lg:text-4xl font-bold font-mono lg:text-5xl font-bold dark:text-zinc-100 text-black">
          Edit Profile
        </h1>

        <div className="mt-9">
          <Profile
            clerkId={userId}
            user={JSON.stringify(mongoUser)}
          />
        </div>
      </div>
    );
  } catch (error) {
    console.error("Edit Page Error:", error);
    return null;
  }
};

export default Page;
