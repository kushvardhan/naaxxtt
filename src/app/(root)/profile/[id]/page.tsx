import { SignedIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getUserInfo } from "../../../../../lib/actions/user.action";
import ProfileLink from "../../../../components/Shared/ProfileLink";
import ProfileTabs from "../../../../components/Shared/ProfileTabs";
import Stats from "../../../../components/Shared/Stats";
import { Button } from "../../../../components/ui/button";

export const metadata: Metadata = {
  title: "NullFlow | Profile",
};

interface URLProps {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

const getJoinedDate = (date: Date): string => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  return `${month} ${year}`;
};

export default async function Page({ params, searchParams }: URLProps) {
  const { userId: clerkId } = await auth();
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const userInfo = await getUserInfo({ userId: resolvedParams?.id });

  if (!userInfo) {
    return (
      <div className="w-full h-[calc(100vh-130px)] mt-20 flex items-center justify-center">
        <p className="text-xl text-gray-500">User not found.</p>
      </div>
    );
  }

  return (
    <div className="w-full h-[calc(100vh-130px)] overflow-y-auto scrollbar-hidden  px-4 sm:px-10 md:px-20 mt-20 bg-white dark:bg-black text-black dark:text-white transition-colors duration-300">
      {/* Profile Header */}
      <div className="flex flex-col-reverse mt-3 sm:flex-row justify-between items-start sm:items-center gap-6 animate-fadeIn">
        <div className="flex items-start gap-6">
          <div className="relative group">
            <Image
              src={userInfo.user.image}
              alt="profile picture"
              width={130}
              height={130}
              className="rounded-full object-cover border-4 border-orange-300 dark:border-orange-700 transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl"
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-orange-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-800 dark:text-zinc-100">
              {userInfo.user.name}
            </h2>
            <p className="text-md text-zinc-700 dark:text-zinc-300">
              @{userInfo.user.username}
            </p>

            <div className="mt-4 flex flex-wrap gap-4">
              {userInfo.user.portfolioWebsite && (
                <ProfileLink
                  imgUrl="/assets/icons/link.svg"
                  href={userInfo.user.portfolioWebsite}
                  title="Portfolio"
                />
              )}
              {userInfo.user.location && (
                <ProfileLink
                  imgUrl="/assets/icons/location.svg"
                  title={userInfo.user.location}
                />
              )}
              <ProfileLink
                imgUrl="/assets/icons/calendar.svg"
                title={getJoinedDate(userInfo.user.joinedAt)}
              />
            </div>

            {userInfo.user.about && (
              <p className="mt-4 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                {userInfo.user.about}
              </p>
            )}
          </div>
        </div>

        <SignedIn>
          {clerkId === userInfo.user.clerkId && (
            <Link href="/profile/edit">
              <Button className="bg-blue-600 text-sm cursor-pointer hover:bg-blue-700 text-white py-3 px-5 rounded-md shadow-md">
                Edit Profile
              </Button>
            </Link>
          )}
        </SignedIn>
      </div>

      {/* Stats */}
      <Stats
        reputation={userInfo.reputation}
        totalQuestions={userInfo.totalQuestions}
        totalAnswers={userInfo.totalAnswers}
        badges={userInfo.badgeCounts}
      />

      {/* Questions Tabs */}
      {userInfo?.user?._id ? (
        <ProfileTabs
          userId={userInfo.user._id.toString()}
          searchParams={resolvedSearchParams}
        />
      ) : (
        <div className="text-center py-8 text-zinc-600 dark:text-zinc-400">
          Unable to load profile data. Please try again.
        </div>
      )}
    </div>
  );
}
