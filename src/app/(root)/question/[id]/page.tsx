import Image from "next/image";
import Link from "next/link";
import { getQuestionById } from "../../../../../lib/actions/question.action";
import { Sparkles } from "lucide-react";


interface QuestionDetailPageProps {
  params: {
    id: string;
  };
}

const QuestionDetailPage = async ({ params }: QuestionDetailPageProps) => {
  try {
    const question = await getQuestionById({ questionId: params.id });

    if (!question) throw new Error("Question not found");

    const createdAt = new Date(question.createdAt).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    return (
<section className="w-full h-[calc(100vh-120px)] mt-20 overflow-y-auto scrollbar-hidden max-w-5xl mx-auto px-4 pt-6 pb-10 text-black dark:text-white">

      <div className=" flex items-center gap-4">
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
            <p className="font-semibold dark:text-zinc-100 text-zinc-900 text-regular">{question.author?.name}</p>
            {question.author?.username && (
              <p className="text-xs">@{question.author.username}</p>
            )}
          </div>
        </div>

        {/* Title */}
        <h1 className="mt-6 text-4xl md:text-4xl font-bold leading-snug break-words text-zinc-800 dark:text-zinc-100">
          {question.title}
        </h1>

        {/* Meta Info */}
        <div className="mt-3 flex flex-wrap justify-between items-center text-sm text-zinc-800 dark:text-zinc-200">
          <p> <span className='text-zinc-600 dark:text-zinc-400'>Asked on </span> {createdAt}</p>
          <p>{question.views?.toLocaleString()} <span className='text-zinc-600 dark:text-zinc-400'> views</span></p>
        </div>


        {/* Body */}
        <article
          className="prose dark:prose-invert max-w-none mt-10 text-regular font-mono leading-relaxed"
          dangerouslySetInnerHTML={{ __html: question.explanation }}
        />

        {/* Tags */}
        <div className="mt-10 flex flex-wrap gap-2">
          {question.tags.map((tag: any) => (
            <Link href={`/tags/${tag._id}`}>
            <span
            title={tag?.name}
              key={tag._id}
              className="bg-orange-100 dark:bg-orange-900/40 cursor-pointer text-orange-700 dark:text-orange-300 px-3 py-1 rounded-full text-md font-medium hover:bg-orange-200 dark:hover:bg-orange-800/60 transition"
            >
              #{tag.name}
            </span>
            </Link>
          ))}
        </div>

        {/* Answer Section */}
<section className="mt-14 border-t pt-10">
  <h2 className="text-2xl font-semibold mb-6">Your Answer</h2>

  {/* Generate AI Button */}
  <div className="flex justify-end mb-4">
    <button className="flex items-center gap-2 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-300 hover:bg-orange-200 dark:hover:bg-orange-800/50 px-4 py-2 rounded-md font-medium shadow-sm transition-all duration-200">
      <Sparkles className="w-5 h-5 text-orange-500" />
      Generate Answer with AI
    </button>
  </div>

  {/* Answer Input */}
  <form className="space-y-4">
    <textarea
      placeholder="Write your answer here..."
      className="w-full min-h-[150px] p-4 border border-zinc-300 dark:border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white resize-y"
    />

    <button
      type="submit"
      className="px-6 py-2 bg-orange-500 text-white font-medium rounded-md hover:bg-orange-600 transition"
    >
      Post Your Answer
    </button>
  </form>
</section>


        {/* Actions */}
        <div className="mt-12 flex flex-col md:flex-row items-start md:items-center gap-4">
          <Link
            href="/"
            className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition"
          >
            Go Home
          </Link>
          <Link
            href="/ask-question"
            className="px-4 py-2 border border-orange-500 text-orange-500 rounded-md hover:bg-orange-100 dark:hover:bg-orange-900/30 transition"
          >
            Ask a Question
          </Link>
        </div>
      </section>
    );
  } catch (err) {
    return (
      <div className="text-center py-24 px-4">
        <h1 className="text-4xl font-bold text-red-600 mb-4">Question Not Found</h1>
        <p className="text-zinc-600 dark:text-zinc-400 mb-6">
          The question you are looking for does not exist or has been removed.
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
