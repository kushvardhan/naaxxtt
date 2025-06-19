import QuestionsClient from "@/components/Shared/QuestionsClient";

// Mock questions data for UI development
const mockQuestions = [
  {
    _id: "1",
    title: "How to implement authentication in Next.js with Clerk?",
    content: "I'm building a Next.js application and want to implement authentication using Clerk...",
    author: {
      _id: "user1",
      clerkId: "user_123",
      name: "John Doe",
      username: "johndoe",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      reputation: 1250,
    },
    tags: [
      { _id: "tag1", name: "nextjs" },
      { _id: "tag2", name: "clerk" },
      { _id: "tag3", name: "authentication" },
    ],
    upvotes: ["user2", "user3", "user4", "user5"],
    downvotes: ["user6"],
    views: 342,
    answers: 2,
    createdAt: "2024-01-15T09:15:00Z",
  },
  {
    _id: "2",
    title: "Best practices for state management in React applications?",
    content: "I'm working on a large React application and struggling with state management...",
    author: {
      _id: "user2",
      clerkId: "user_456",
      name: "Jane Smith",
      username: "janesmith",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      reputation: 2840,
    },
    tags: [
      { _id: "tag4", name: "react" },
      { _id: "tag5", name: "state-management" },
      { _id: "tag6", name: "redux" },
    ],
    upvotes: ["user1", "user3", "user7", "user8"],
    downvotes: [],
    views: 567,
    answers: 5,
    createdAt: "2024-01-14T14:30:00Z",
  },
  {
    _id: "3",
    title: "How to optimize MongoDB queries for better performance?",
    content: "My MongoDB queries are running slowly and I need to optimize them...",
    author: {
      _id: "user3",
      clerkId: "user_789",
      name: "Mike Johnson",
      username: "mikej",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      reputation: 1890,
    },
    tags: [
      { _id: "tag7", name: "mongodb" },
      { _id: "tag8", name: "database" },
      { _id: "tag9", name: "performance" },
    ],
    upvotes: ["user1", "user2", "user4"],
    downvotes: [],
    views: 234,
    answers: 3,
    createdAt: "2024-01-13T11:45:00Z",
  },
  {
    _id: "4",
    title: "TypeScript generics: When and how to use them effectively?",
    content: "I'm learning TypeScript and having trouble understanding when to use generics...",
    author: {
      _id: "user4",
      clerkId: "user_101",
      name: "Sarah Wilson",
      username: "sarahw",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      reputation: 945,
    },
    tags: [
      { _id: "tag10", name: "typescript" },
      { _id: "tag11", name: "generics" },
      { _id: "tag4", name: "react" },
    ],
    upvotes: ["user1", "user2"],
    downvotes: [],
    views: 189,
    answers: 1,
    createdAt: "2024-01-12T16:20:00Z",
  },
  {
    _id: "5",
    title: "Deploying Next.js app to Vercel: Common issues and solutions",
    content: "I'm having trouble deploying my Next.js application to Vercel...",
    author: {
      _id: "user5",
      clerkId: "user_202",
      name: "Alex Chen",
      username: "alexc",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      reputation: 1567,
    },
    tags: [
      { _id: "tag1", name: "nextjs" },
      { _id: "tag12", name: "vercel" },
      { _id: "tag13", name: "deployment" },
    ],
    upvotes: ["user1", "user3", "user4"],
    downvotes: ["user2"],
    views: 423,
    answers: 4,
    createdAt: "2024-01-11T08:30:00Z",
  },
];

const QuestionsPage = async () => {
  try {
    // In a real app, you would fetch the questions data here
    // const questions = await getAllQuestions();
    
    return (
    <>
    <div className='w-full h-[calc(100vh-130px)] mt-20 overflow-y-scroll scrollbar-hidden'>
    <QuestionsClient questions={mockQuestions} /> 
    </div>
    </>)
  } catch (error) {
    console.error("Error loading questions:", error);
    return <QuestionsClient questions={[]} />;
  }
};

export default QuestionsPage;
