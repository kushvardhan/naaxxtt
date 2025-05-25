import ClientHomehh from "@/components/Shared/ClientHomehh";
import { getQuestions } from "../../../../lib/actions/question.action";

export default async function Home() {
  const result = await getQuestions({});
  console.log(result.questions);
  const questions = result?.questions || [];

  const mappedQuestions = questions.map((q: unknown) => ({
    _id: q._id.toString(),
    title: q.title || "No Title",
    tags:
      q.tags?.map((tag: any) => ({
        _id: tag._id.toString(),
        name: tag.name || "Unknown",
      })) || [],
    user: {
      name: q.author?.name || "Unknown User",
      image:
        q.author?.image ||
        "https://banner2.cleanpng.com/20180416/gbw/avfp7lvmb.webp",
    },
    upvotes: Array.isArray(q.upvotes) ? q.upvotes.length : 0,
    answers: Array.isArray(q.answers) ? q.answers.length : 0,
    views: q.views || 0,
    createdAt: q.createdAt
      ? new Date(q.createdAt).toISOString()
      : new Date().toISOString(),
  }));

  return (
    <div className="w-full h-[calc(100vh-130px)] w-full mt-20 overflow-y-scroll scrollbar-hidden ">
      <ClientHomehh mappedQuestions={mappedQuestions} />
    </div>
  );
}
