export const dynamic = "force-dynamic";

import Metric from "../../../../components/Shared/Metric" ;
import { Eye,Clock,MessageCircle} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { auth } from '@clerk/nextjs/server';
import Votes from "../../../../components/Shared/Votes";
import AllAnswers from "../../../../components/Shared/AllAnswers";
import ParseHTML from "../../../../components/Shared/ParseHTML";
import { formatAndDivideNumber, getTimestamp } from '../../../../../lib/utils';
import { getQuestionById } from "../../../../../lib/actions/question.action";
import { getUserById } from "../../../../../lib/actions/user.action";
import Answer from '../../../../components/forms/Answer';



interface QuestionDetailPageProps {
  params: {
    id: string;
  };
}

const QuestionDetailPage = async ({ params,searchParams }: QuestionDetailPageProps) => {
  try {

  const { userId: clerkId } = await auth();

  let mongoUser;

  if(clerkId) {
    mongoUser = await getUserById({ userId: clerkId })
  }
    const paramsId = await params.id;
    const question = await getQuestionById({ questionId: params?.id });
    console.log("QUEGEDY: ",question);

    if (!question) {
  return <div className="text-red-500 text-center p-10">No question found! Check console.</div>;
}



    return (
      <section className="w-full h-[calc(100vh-120px)] mt-18 overflow-y-auto scrollbar-hidden max-w-5xl mx-auto px-4 pt-6 pb-10 text-black dark:text-white">
        <div className="w-full flex justify-end">
            <Votes 
              type="Question"
              itemId={JSON.stringify(question?._id)}
              userId={JSON.stringify(mongoUser?._id)}
              upvotes={question?.upvotes?.length}
              hasupVoted={question?.upvotes?.includes(mongoUser?._id)}
              downvotes={question?.downvotes?.length}
              hasdownVoted={question?.downvotes?.includes(mongoUser?._id)}
              hasSaved={mongoUser?.saved?.includes(question?._id)}
            />
          </div>
        <div className="mt-4 flex  items-center gap-4">
          <Link href={`/profile/${question?.author?.clerkId}`}>
            <Image
              src={question.author?.image || "/default-avatar.png"}
              alt={question.author?.name || "User"}
              width={40}
              height={40}
              className="rounded-full border-2 border-orange-400"
            />
          </Link>
          <div>
            <p className="font-semibold dark:text-zinc-100 text-zinc-900 text-regular">
              {question.author?.name}
            </p>
            {question.author?.username && (
              <p className="text-xs">@{question.author.username}</p>
            )}
          </div>
        </div>

        {/* Title */}
        <h1 className="mt-6 text-5xl md:text-4xl font-bold leading-snug break-words text-zinc-800 dark:text-zinc-100">
          {question.title}
        </h1>

        <div className="mb-8 mt-5 flex items-center justify-end flex-wrap gap-6">
          <Metric 
            icon={<Clock />}
            alt="clock icon"
            value={` asked ${getTimestamp(question?.createdAt)}`}
            title=" Asked"
            textStyles="text-regular text-zinc-900 dark:text-zinc-200"
          />
          <Metric 
            icon={<MessageCircle />}
            alt="Answer"
            value={formatAndDivideNumber(question?.answers?.length)}
            title=" Answers"
            textStyles="text-regular text-zinc-900 dark:text-zinc-200"
          />
          <Metric 
            icon={<Eye />}
            alt="View"
            value={formatAndDivideNumber(question?.views)}
            title=" Views"
            textStyles="text-regular text-zinc-900 dark:text-zinc-200"
          />
      </div>

        {/* Body */}
        <ParseHTML data={question?.explanation} />

        {/* Tags */}
        <div className="my-8 flex flex-wrap gap-2">
            {question?.tags?.map((tag: any) => (
  <Link href={`/tags/${tag._id}`} key={tag._id}>
    <span
      title={tag?.name}
      className="bg-orange-100 dark:bg-orange-900/40 cursor-pointer text-orange-700 dark:text-orange-300 px-3 py-1 rounded-full text-md font-medium hover:bg-orange-200 dark:hover:bg-orange-800/60 transition"
    >
      #{tag.name}
    </span>
  </Link>
))}

        </div>
        <AllAnswers 
        questionId={question?._id}
        userId={mongoUser?._id}
        totalAnswers={question?.answers?.length}
        page={Number(searchParams?.get('page')) || 1}
        filter={searchParams?.get('filter') || "10"}
      />

      <h1 className='text-3xl text-purple-600'>Answers: {question?.answers?.length}</h1>


        {/* Answer Section */}
        <Answer question={question?.explanation}
        questionId = {JSON.stringify(question._id)}
        authorId = {JSON.stringify(mongoUser._id)}
        />

      </section>
    );
  } catch (err) {
    return (
      <div className="text-center py-24 px-4">
        <h1 className="text-4xl font-bold text-red-600 mb-4">
          Question Not Found
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 mb-6">
          The question you are looking for does not exist or has been removed.
          {err}
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/"
            className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
          >
            Go Home
          </Link>
          <Link
            href="/ask-question"
            className="px-4 py-2 border border-orange-500 text-orange-500 rounded hover:bg-orange-50 dark:hover:bg-orange-900/20"
          >
            Ask a Question
          </Link>
        </div>
      </div>
    );
  }
};

export default QuestionDetailPage;
