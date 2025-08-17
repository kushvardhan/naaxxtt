import type { Metadata } from "next";
import { getQuestions } from "../../../../lib/actions/question.action";
import ClientHomehh from "../../../components/Shared/ClientHomehh";

export const metadata: Metadata = {
  title: "NullPointer | Home",
  description:
    "Join NullPointer, the premier developer community for asking questions, sharing knowledge, and learning together. Get expert answers on programming, web development, mobile apps, and more.",
  keywords: [
    "programming",
    "developer community",
    "Q&A",
    "coding help",
    "software development",
    "web development",
    "mobile development",
    "tech questions",
  ],
  authors: [{ name: "NullPointer Team" }],
  creator: "NullPointer",
  publisher: "NullPointer",
  openGraph: {
    title: "NullPointer | Developer Q&A Community",
    description:
      "Join thousands of developers sharing knowledge and solving problems together",
    url: "https://nullpointer.dev",
    siteName: "NullPointer",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "NullPointer - Developer Community",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NullPointer | Developer Q&A Community",
    description:
      "Join thousands of developers sharing knowledge and solving problems together",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

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

    const mappedQuestions = questions.map((q: any) => ({
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
