import { auth } from "@clerk/nextjs/server";
import type { Metadata } from "next";
import { getUserById } from "../../../../../lib/actions/user.action";
import Profile from "../../../../components/forms/Profile";

export const metadata: Metadata = {
  title: "NullFlow | Edit Profile",
};

const Page = async () => {
  const { userId } = await auth();

  if (!userId) return null;

  const mongoUser = await getUserById({ userId });

  return (
    <div className="w-full h-[calc(100vh-120px)] mt-20 overflow-y-scroll scrollbar-hidden">
      <h1 className="text-xl mt-2 font-mono lg:text-5xl font-bold dark:text-zinc-100 text-black">
        Edit Profile
      </h1>

      <div className="mt-9">
        <Profile clerkId={userId} user={JSON.stringify(mongoUser)} />
      </div>
    </div>
  );
};

export default Page;
