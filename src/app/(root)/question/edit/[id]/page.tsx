import Question from '@/components/forms/Question';
import { getQuestionById } from '../../../../../../lib/actions/question.action';
import { getUserById } from '../../../../../../lib/actions/user.action';
import { auth } from '@clerk/nextjs/server'

interface ParamsProps {
  params: { id: string };
}


const Page = async ({ params }: ParamsProps) => {
  const { userId } = auth();

  if(!userId) return null;

  const mongoUser = await getUserById({ userId })
  const result = await getQuestionById({ questionId: params.id})

  return (
    <div className="w-full h-[calc(100vh-120px)] mt-18 overflow-y-auto scrollbar-hidden max-w-5xl mx-auto px-4 pt-6 pb-10 text-black dark:text-white">
      <h1 className="h1-bold text-dark100_light900">Edit Question</h1>

      <div className="mt-9">
        <Question 
          type="Edit"
          mongoUserId={mongoUser._id}
          questionDetails={JSON.stringify(result)}
        />
      </div>
    </>
  )
}

export default Page