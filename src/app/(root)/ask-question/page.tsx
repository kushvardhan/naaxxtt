import Question from "@/components/forms/Question";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getOrCreateUser } from "../../../../lib/helpers/user";

// Force dynamic rendering for this page
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Ask a Question | NullPointer",
  description:
    "Ask your programming questions and get expert answers from the NullPointer developer community. Share your coding challenges and learn from experienced developers.",
  keywords: [
    "ask question",
    "programming help",
    "coding problem",
    "developer support",
    "technical question",
  ],
  robots: {
    index: true,
    follow: true,
  },
};

const Page = async () => {
  try {
    const mongoUser = await getOrCreateUser();

    if (!mongoUser) {
      redirect("/sign-in");
    }

    return (
      <div className="mt-20 max-h-[80vh] overflow-y-auto scrollbar-none">
        <h1 className="text-3xl font-bold font-mono text-black dark:text-white">
          Ask a Question
        </h1>
        <div className="mt-8 px-2">
          <Question
            type="Create"
            questionDetails={undefined}
            mongoUserId={mongoUser._id.toString()}
          />
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error in ask-question page:", error);
    return (
      <div className="mt-20 w-full h-[80vh] flex justify-center items-center overflow-y-auto scrollbar-none">
        <h1 className="text-3xl font-bold font-mono text-black dark:text-white">
          Error loading page. Please try again.
        </h1>
      </div>
    );
  }
};

export default Page;
