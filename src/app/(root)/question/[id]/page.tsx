import Link from "next/link";
import QuestionClient from "@/components/Shared/QuestionClient";
import {getQuestionById} from "../../../../../lib/actions/question.action"

import Image from "next/image";

interface QuestionCardProps {
  question: {
    _id: string;
    title: string;
    tags: { _id: string; name: string }[];
    user: { name: string; image: string };
    upvotes: number;
    answers: number;
    views: number;
    createdAt: string;
  };
}


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
            <div className="p-4 border rounded-md shadow-sm hover:shadow-md transition">
              <h2 className="text-lg hover:underline font-semibold">{question?.title}</h2>
        
              <div className="mt-2 flex gap-2 flex-wrap">
                {question?.tags?.map((tag) => (
                  <span
                    key={tag?._id}
                    className="bg-gray-200 px-2 py-0.5 text-xs rounded-md"
                  >
                    {tag?.name}
                  </span>
                ))}
              </div>
        
              <div className="mt-3 flex justify-between text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Image
                    src={
                      question?.user?.image ||
                      "https://banner2.cleanpng.com/20180416/gbw/avfp7lvmb.webp"
                    }
                    alt={question?.author?.name}
                    width={24}
                    height={24}
                    className="w-6 h-6 rounded-full"
                  />
                  <span>{question?.author?.name}</span>
                </div>
        
                <div className="flex gap-4 text-xs">
                  <span>👍 {question?.upvotes}</span>
                  <span>💬 {question?.answers}</span>
                  <span>👁️ {question?.views}</span>
                </div>
              </div>
            </div>
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
