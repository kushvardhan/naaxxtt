import { auth } from "@clerk/nextjs/server";
import { getSavedQuestions } from "../../../../lib/actions/user.action";
import Link from "next/link";

const Collection = async () => {
  const { userId: clerkId } = auth();

  if (!clerkId) return <div className="text-center mt-10">User not logged in</div>;

  const { questions, isNext } = await getSavedQuestions({ clerkId });

  console.log("Saved Questions:", questions); // This logs in the terminal, not browser

  return (
    <section className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Your Saved Questions</h1>

      {questions.length === 0 ? (
        <p className="text-gray-500">No saved questions found.</p>
      ) : (
        <ul className="space-y-6">
          {questions.map((question: any) => (
            <li key={question._id} className="border rounded-xl p-4 hover:shadow-md transition">
              <Link href={`/question/${question._id}`}>
                <div className="text-lg font-medium text-blue-600 hover:underline">
                  {question.title}
                </div>
              </Link>
              <div className="text-sm text-gray-500 mt-1">
                {question.tags?.map((tag: any) => `#${tag.name} `)}
              </div>
              <div className="text-xs text-gray-400 mt-2">
                Asked by {question.author?.name || "Unknown"}
              </div>
            </li>
          ))}
        </ul>
      )}

      {isNext && (
        <div className="mt-6 text-center">
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Load More
          </button>
        </div>
      )}
    </section>
  );
};

export default Collection;
