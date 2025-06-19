import Link from "next/link";
import QuestionClient from "@/components/Shared/QuestionClient";

interface QuestionDetailPageProps {
  params: {
    id: string;
  };
}

// Mock question data for UI development
const mockQuestion = {
  _id: "1",
  title: "How to implement authentication in Next.js with Clerk?",
  content: `
    <p>I'm building a Next.js application and want to implement authentication using Clerk. I've followed the documentation but I'm running into some issues with the setup.</p>
    
    <p>Here's what I've tried so far:</p>
    
    <ol>
      <li>Installed @clerk/nextjs package</li>
      <li>Set up environment variables</li>
      <li>Wrapped my app with ClerkProvider</li>
    </ol>
    
    <p>However, I'm getting hydration errors and the authentication flow doesn't seem to work properly. Can someone help me understand what I might be doing wrong?</p>
    
    <pre><code>
// app/layout.tsx
import { ClerkProvider } from '@clerk/nextjs'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    &lt;ClerkProvider&gt;
      &lt;html lang="en"&gt;
        &lt;body&gt;{children}&lt;/body&gt;
      &lt;/html&gt;
    &lt;/ClerkProvider&gt;
  )
}
    </code></pre>
  `,
  author: {
    _id: "user1",
    clerkId: "user_123",
    name: "John Doe",
    username: "johndoe",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    reputation: 1250,
  },
  tags: [
    { _id: "tag1", name: "nextjs" },
    { _id: "tag2", name: "clerk" },
    { _id: "tag3", name: "authentication" },
    { _id: "tag4", name: "react" },
  ],
  upvotes: ["user2", "user3", "user4", "user5"],
  downvotes: ["user6"],
  views: 342,
  answers: [
    {
      _id: "answer1",
      content: `
        <p>The hydration errors you're experiencing are common when setting up Clerk with Next.js. Here's how to fix them:</p>
        
        <h3>1. Add suppressHydrationWarning</h3>
        <pre><code>
&lt;html lang="en" suppressHydrationWarning&gt;
  &lt;body suppressHydrationWarning&gt;
    {children}
  &lt;/body&gt;
&lt;/html&gt;
        </code></pre>
        
        <h3>2. Use proper environment variables</h3>
        <p>Make sure you have these in your .env.local:</p>
        <pre><code>
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
        </code></pre>
        
        <p>This should resolve your hydration issues!</p>
      `,
      author: {
        _id: "user2",
        clerkId: "user_456",
        name: "Jane Smith",
        username: "janesmith",
        image:
          "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
        reputation: 2840,
      },
      upvotes: ["user1", "user3", "user7"],
      downvotes: [],
      createdAt: "2024-01-15T10:30:00Z",
    },
    {
      _id: "answer2",
      content: `
        <p>In addition to what Jane mentioned, you should also consider using a middleware file to handle authentication routes:</p>
        
        <pre><code>
// middleware.ts
import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/", "/api/webhook"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
        </code></pre>
        
        <p>This will ensure proper authentication handling across your app.</p>
      `,
      author: {
        _id: "user3",
        clerkId: "user_789",
        name: "Mike Johnson",
        username: "mikej",
        image:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        reputation: 1890,
      },
      upvotes: ["user1", "user2"],
      downvotes: [],
      createdAt: "2024-01-15T14:20:00Z",
    },
  ],
  createdAt: "2024-01-15T09:15:00Z",
  updatedAt: "2024-01-15T09:15:00Z",
};

const QuestionDetailPage = async ({ params }: QuestionDetailPageProps) => {
  try {
    // In a real app, you would fetch the question data here
    // const question = await getQuestionById({ questionId: params.id });

    // For now, we'll use mock data but make it dynamic based on the ID
    const questionWithId = {
      ...mockQuestion,
      _id: params.id,
      title:
        params.id === "1"
          ? mockQuestion.title
          : `Question ${params.id}: How to solve common development issues?`,
      views: mockQuestion.views + parseInt(params.id) * 50,
    };

    return <QuestionClient question={questionWithId} />;
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
