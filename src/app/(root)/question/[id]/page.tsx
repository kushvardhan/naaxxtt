import Image from "next/image";
import Link from "next/link";
import { getQuestionById } from "../../../../../lib/actions/question.action";

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
    console.log(question);
    if (!question) {
      throw new Error("Question not found");
    }

    // Format dates
    const createdAtFormatted = new Date(question.createdAt).toLocaleDateString(
      "en-US",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }
    );
    const updatedAtFormatted = new Date(
      question.updatedAt || question.createdAt
    ).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    return (
      <div className="w-full h-[calc(screen-120px)]  mt-20 overflow-y-scroll scrollbar-hidden  bg-white dark:bg-zinc-900/50 text-black dark:text-white flex flex-col justify-center items-start">
        <div className="flex items-center justify-between my-6 pt-6  ">
          <div className="flex items-center gap-4">
            <Link href={`/profile/${question?.author?.clerkId}`}>
              <Image
                src={
                  question.author?.image ||
                  "https://banner2.cleanpng.com/20180416/gbw/avfp7lvmb.webp"
                }
                alt={question.author?.name || "Profile"}
                width={34}
                height={34}
                className="rounded-full border-2 border-orange-400"
              />
            </Link>
            <div>
              <span className="font-semibold font-mono text-zinc-800 dark:text-zinc-100">
                {question?.author?.name}
              </span>
              <div className="flex items-center gap-2 text-sm">
                {
                  question?.author?.username && (
                    <span className="text-zinc-600 dark:text-zinc-400">
                      @{question.author?.username || "user"}
                    </span>
                  )
                }
              </div>
              {question.author?.reputation && (
                  <span className="text-orange-500 font-semibold">
                      {question.author.reputation.toLocaleString()} rep
                  </span>
              )}
            </div>
          </div>
        </div>

        <h1 className="text-3xl lg:text-4xl font-bold font-mono my-4 text-wrap leading-tight text-zinc-800 dark:text-zinc-100 break-words">
          {question?.title}
        </h1>

        <div className="flex flex-wrap items-center flex-end gap-4 text-sm font-mono mb-6">
          <span className="text-zinc-600 dark:text-zinc-400">
            Asked {createdAtFormatted}
          </span>
          <span className="text-zinc-600 dark:text-zinc-400">
            Viewed {question.views?.toLocaleString() || 0} times
          </span>
        </div>
      </div>
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
            The question you&apos;re looking for doesn&apos;t exist or has been
            removed.
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
