import AnswerCard from './AnswerCard';
import { getUserAnswers } from  '../../../lib/actions/user.action';
import Pagination from "./Pagination";

interface Props {
  userId: string;
  searchParams: { [key: string]: string | undefined };
}

const AllAnswers = async ({ userId, searchParams }: Props) => {
  const result = await getUserAnswers({
    userId,
    page: searchParams.page ? +searchParams.page : 1,
  });

  console.log("idj  ihdforJPFR: ",result);

  return (
    <div className="w-full">
      <div className="mt-8 flex w-full flex-col gap-6">
        <h1>ANSWER TAB</h1>
        {result.answers && result.answers.length > 0 ? (
          <>
            {result.answers
              .filter(
                (ans) => ans.question && ans.author && typeof ans.author === "object"
              )
              .map((ans: any) => (
                <AnswerCard key={ans._id} answer={ans} />
              ))}

            <div className="mt-10">
              <Pagination
                pageNumber={searchParams.page ? +searchParams.page : 1}
                isNext={result.isNextAnswer}
              />
            </div>
          </>
        ) : (
          <div
            className="relative max-w-xl mx-auto p-8 mb-6 rounded-3xl transition-all duration-300 overflow-hidden shadow-md
              bg-white text-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
          >
            {/* Floating Cards */}
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-blue-200 text-blue-600 dark:bg-blue-900 dark:text-blue-300 rounded-xl shadow-md flex items-center justify-center text-3xl font-bold rotate-[-12deg]">
              💭
            </div>
            <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-purple-200 text-purple-600 dark:bg-purple-900 dark:text-purple-300 rounded-xl shadow-md flex items-center justify-center text-2xl font-bold rotate-[10deg]">
              💬
            </div>

            {/* Message */}
            <p className="text-center text-2xl font-bold font-mono tracking-tighter">
              No Answers Yet
            </p>
            <p className="text-center mt-2 text-base font-medium select-none text-zinc-700 dark:text-zinc-300/80">
              You haven’t shared your thoughts yet. ✍️ Dive in and start answering — your insights might be exactly what someone needs to move forward!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllAnswers;
