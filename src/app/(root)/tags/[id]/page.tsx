import { notFound } from "next/navigation";
import { getTagById } from "../../../../../lib/actions/tag.action";

interface TagDetailPageProps {
  params: {
    id: string;
  };
}

const TagDetailPage = async ({ params }: TagDetailPageProps) => {
  try {
    const tag = await getTagById({ tagId: params.id });

    if (!tag) {
      notFound();
    }

    return (
      <div className="w-full" suppressHydrationWarning>
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="inline-flex items-center px-6 py-3 rounded-full text-white font-mono font-bold text-2xl bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg">
              #{tag.name}
            </div>
          </div>

          <p className="text-lg text-zinc-600 dark:text-zinc-300 mb-6">
            {tag.description || "No description available for this tag."}
          </p>

          <div className="flex gap-6 text-sm font-mono text-zinc-500 dark:text-zinc-400">
            <span>
              <strong className="text-orange-500">
                {tag.questions?.length || 0}
              </strong>{" "}
              questions
            </span>
            <span>
              <strong className="text-orange-500">
                {tag.followers?.length || 0}
              </strong>{" "}
              followers
            </span>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold font-mono mb-6 text-zinc-800 dark:text-zinc-100">
            Questions tagged with #{tag.name}
          </h2>

          {tag.questions && tag.questions.length > 0 ? (
            <div className="space-y-4">
              {tag.questions.map((question: any) => (
                <div
                  key={question._id || Math.random()}
                  className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 hover:shadow-lg transition-shadow duration-300"
                >
                  <h3 className="text-lg font-semibold font-mono mb-2 text-zinc-800 dark:text-zinc-100">
                    {question.title || "Untitled Question"}
                  </h3>

                  <div className="flex items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400">
                    <span>By {question.author?.name || "Unknown"}</span>
                    <span>{question.upvotes?.length || 0} upvotes</span>
                    <span>{question.answers?.length || 0} answers</span>
                    <span>{question.views || 0} views</span>
                  </div>

                  {question.tags && question.tags.length > 0 && (
                    <div className="flex gap-2 mt-3">
                      {question.tags.map((questionTag: any) => (
                        <span
                          key={questionTag._id || Math.random()}
                          className="px-3 py-1 text-xs font-mono bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 rounded-full"
                        >
                          {questionTag.name || "Unknown Tag"}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-zinc-400">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-xl font-mono font-semibold mb-2">
                No questions yet
              </h3>
              <p className="text-sm">
                Be the first to ask a question with this tag!
              </p>
            </div>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error loading tag:", error);
    notFound();
  }
};

export default TagDetailPage;
