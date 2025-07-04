import { getUserById, getUserInfo } from '../../../../../lib/actions/user.action'
import {  auth } from '@clerk/nextjs/server';
import {  SignedIn } from '@clerk/nextjs';
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '../../../../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ProfileLink from '../../../../components/Shared/ProfileLink';
import Stats from '../../../../components/Shared/Stats';
import QuestionTab from '../../../../components/Shared/QuestionTab';

interface URLProps {
  params: {
    searchParams: { [key: string]: string };
    id: string;
  };
  searchParams: { [key: string]: string | undefined };
}

const getJoinedDate = (date: Date): string => {
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();
  return `${month} ${year}`;
};

export default async function Page({ params, searchParams }: URLProps) {
  const { userId: clerkId } = await auth();
  const userInfo = await getUserInfo({ userId: params.id });

  if (!userInfo) {
    return (
      <div className="w-full h-[calc(100vh-130px)] mt-20 flex items-center justify-center">
        <p className="text-xl text-gray-500">User not found.</p>
      </div>
    );
  }

  return (
    <div className="w-full h-[calc(100vh-120px)] overflow-y-auto scrollbar-hidden  px-4 sm:px-10 md:px-20 mt-18 bg-white dark:bg-zinc-950 text-black dark:text-white transition-colors duration-300">
      {/* Profile Header */}
      <div className="flex flex-col-reverse sm:flex-row justify-between items-start sm:items-center gap-6">
        <div className="flex items-start gap-6">
          <Image
            src={userInfo.user.image}
            alt="profile picture"
            width={130}
            height={130}
            className="rounded-full object-cover border-4 border-zinc-300 dark:border-zinc-700"
          />
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-800 dark:text-zinc-100">
              {userInfo.user.name}
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
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

            {userInfo.user.bio && (
              <p className="mt-4 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                {userInfo.user.bio}
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
      <div className="mt-12">
        <Tabs defaultValue="top-posts" className="w-full">
          <TabsList className="flex bg-zinc-100 dark:bg-zinc-800 rounded-md p-1 w-fit">
            <TabsTrigger
              value="top-posts"
              className="px-4 py-2 text-sm rounded-md transition-all data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              Top Posts
            </TabsTrigger>
            <TabsTrigger
              value="answers"
              className="px-4 py-2 text-sm rounded-md transition-all data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              Answers
            </TabsTrigger>
          </TabsList>

          <TabsContent value="top-posts" className="mt-6">
            <QuestionTab
              searchParams={searchParams}
              userId={userInfo.user._id.toString()}
              clerkId={clerkId}
            />
          </TabsContent>

          {/* Future implementation */}
          {/* <TabsContent value="answers" className="mt-6">
            <AnswersTab ... />
          </TabsContent> */}
        </Tabs>
      </div>
    </div>
  );
}
