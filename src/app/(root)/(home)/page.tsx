import { getQuestions } from "../../../../lib/actions/question.action";
import ClientHomehh from "../../../components/Shared/ClientHomehh";
import Loading from './loading';

interface Tag {
  _id: string;
  name: string;
}

interface Author {
  _id: any;
  clerkId: any;
  name?: string;
  image?: string;
}

interface Question {
  _id: string;
  title?: string;
  tags?: Tag[];
  author?: Author;
  upvotes?: number;
  answers?: number;
  views?: number;
  createdAt?: string | Date;
}

interface SearchParams {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Home({ searchParams }: SearchParams) {
  try {
    const resolvedSearchParams = await searchParams;
    const searchQuery =
      typeof resolvedSearchParams.q === "string" ? resolvedSearchParams.q : "";
    const filter =
      typeof resolvedSearchParams.filter === "string"
        ? resolvedSearchParams.filter
        : "newest";

    const result = await getQuestions({
      searchQuery,
      filter,
    });
    const questions = result || [];

    const mappedQuestions = questions.map((q: Question) => ({
      _id: q._id.toString(),
      title: q.title || "No Title",
      tags:
        q.tags?.map((tag) => ({
          _id: tag._id.toString(),
          name: tag.name || "Unknown",
        })) || [],
      user: {
        clerkId: q.author?.clerkId,
        userId: q.author?._id?.toString(),
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

  const isLoading = true;
  if(isLoading) return <Loading />

    return (
      <div className="w-full h-[calc(100vh-130px)] mt-20 overflow-y-scroll scrollbar-hidden">
        <ClientHomehh
          mappedQuestions={mappedQuestions}
          searchParams={resolvedSearchParams}
        />
      </div>
    );
  } catch (error) {
    console.error("Error loading home page:", error);
    const fallbackSearchParams = await searchParams;
    return (
      <div className="w-full h-[calc(100vh-130px)] mt-20 overflow-y-scroll scrollbar-hidden">
        <ClientHomehh
          mappedQuestions={[]}
          searchParams={fallbackSearchParams}
        />
      </div>
    );
  }
}
