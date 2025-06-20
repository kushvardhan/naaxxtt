import Link from "next/link";
import QuestionClient from "@/components/Shared/QuestionClient";
import {getQuestionById} from "../../../../../lib/actions/question.action"


interface QuestionDetailPageProps {
  params: {
    id: string;
  };
}

const QuestionDetailPage = async ({ params }: QuestionDetailPageProps) => {
  try {
    const question = await getQuestionById({ questionId: params.id });
    console.log("Question fetched by ID: ",question);
    if (!question) {
      throw new Error("Question not found");
    }


    return (
      <>
      <div className='w-full h-[calc(100vh-130px)] mt-20 overflow-y-scroll scrollbar-hidden'>
        <QuestionClient question={question} />
      </div>
      </>
    );
    
  } catch (error) {
    console.error("Error loading question:", error);
    return (
      <div className="text-center py-20 px-4">
        <div className="max-w-md mx-auto">
          <div className="text-6xl mb-4">❓</div>
          <h1 className="text-2xl font-bold text-red-500 mb-4">
            Question Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The question you&apos;re looking for doesn&apos;t exist or has been removed.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/"
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              Go Home
            </Link>
            <Link
              href="/ask-question"
              className="px-4 py-2 border border-orange-500 text-orange-500 rounded-lg hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-colors"
            >
              Ask Question
            </Link>
          </div>
        </div>
      </div>
    );
  }
};

export default QuestionDetailPage;
