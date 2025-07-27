import Question from '@/components/forms/Question';
import { getQuestionById } from '../../../../../../lib/actions/question.action';
import { getUserById } from '../../../../../../lib/actions/user.action';
import { auth } from '@clerk/nextjs/server';
import Loading from './loading';

interface ParamsProps {
  params: { id: string };
}


const Page = async ({ params }: ParamsProps) => {
  const { userId } = await auth();
  console.log("user idherfIPW: ",userId);

  if(!userId) return null;

  const mongoUser = await getUserById({ userId })
  const result = await getQuestionById({ questionId: params.id})

  const isLoading = true;
  if(isLoading) return <Loading />

  return (
    <div className="w-full h-[calc(100vh-120px)] mt-18 overflow-y-auto scrollbar-hidden max-w-5xl mx-auto px-4 pt-6 pb-10 text-black dark:text-white">
      <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold font-mono text-black dark:text-white">Edit Question</h1>

      <div className="mt-9">

        <Question 
  type="Edit"
  mongoUserId={mongoUser._id.toString()}
  questionDetails={JSON.stringify(result)}
/>

      </div>
    </div>
  )
}

export default Page