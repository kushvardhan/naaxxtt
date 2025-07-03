import { getUserById, getUserInfo } from '../../../../../lib/actions/user.action'
import {  auth } from '@clerk/nextjs/server';
import {  SignedIn } from '@clerk/nextjs';
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ProfileLink from '@/components/Shared/ProfileLink';
import Stats from '@/components/Shared/Stats';
import QuestionTab from '@/components/Shared/QuestionTab';



interface URLProps {
  params: {
    searchParams: { [key: string]: string; }; id: string 
}
  searchParams: { [key: string]: string | undefined }
}

const getJoinedDate = (date: Date): string => {
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();

  const joinedDate = `${month} ${year}`;

  return joinedDate;
}


export default async function Page({ params }: URLProps) {
  const { userId: clerkId } = await auth()
  const userInfo = await getUserInfo({ userId: params.id })

  console.log(userInfo);

  if (!userInfo) {
    return (
      <div className="w-full h-[calc(100vh-130px)] mt-20 flex items-center justify-center">
        <p className="text-xl text-gray-500">User not found.</p>
      </div>
    )
  }

  return (
    <div className="w-full h-[calc(100vh-130px)] mt-20 flex items-center justify-center bg-white dark:bg-black text-black dark:text-white">
          <div className="flex flex-col-reverse items-start justify-between sm:flex-row">
        <div className="flex flex-col items-start gap-4 lg:flex-row">
          <Image 
            src={userInfo?.user?.image}
            alt="profile picture"
            width={140}
            height={140}
            className="rounded-full object-cover"
          />

          <div className="mt-3">
            <h2 className="h2-bold text-dark100_light900">{userInfo.user.name}</h2>
            <p className="paragraph-regular text-dark200_light800">@{userInfo.user.username}</p>

            <div className="mt-5 flex flex-wrap items-center justify-start gap-5">
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
              <p className="paragraph-regular text-dark400_light800 mt-8">
                {userInfo.user.bio}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end max-sm:mb-5 max-sm:w-full sm:mt-3">
          <SignedIn>
            {clerkId === userInfo.user.clerkId && (
              <Link href="/profile/edit">
                <Button className="paragraph-medium btn-secondary text-dark300_light900 min-h-[46px] min-w-[175px] px-4 py-3">
                  Edit Profile
                </Button>
              </Link>
            )}
          </SignedIn>
        </div>
      </div>
      
      <Stats
        reputation={userInfo.reputation}
        totalQuestions={userInfo.totalQuestions}
        totalAnswers={userInfo.totalAnswers}
        badges={userInfo.badgeCounts}
      />
    <div className="mt-10 flex gap-10">
        <Tabs defaultValue="top-posts" className="flex-1">
          <TabsList className="background-light800_dark400 min-h-[42px] p-1">
            <TabsTrigger value="top-posts" className="tab">Top Posts</TabsTrigger>
            <TabsTrigger value="answers" className="tab">Answers</TabsTrigger>
          </TabsList>
          <TabsContent value="top-posts" className="mt-5 flex w-full flex-col gap-6">
            <QuestionTab 
  searchParams={params.searchParams}
  userId={userInfo.user._id.toString()}
  clerkId={clerkId}
/>

          </TabsContent>
          {/* <TabsContent value="answers" className="flex w-full flex-col gap-6">
            <AnswersTab 
              searchParams={searchParams}
              userId={userInfo.user._id}
              clerkId={clerkId}
            />
          </TabsContent> */}
        </Tabs>
      </div>

    </div>
  )
}
