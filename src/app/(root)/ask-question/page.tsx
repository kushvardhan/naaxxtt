import Question from "@/components/forms/Question";
import { redirect } from "next/navigation";
import { getOrCreateUser } from "../../../../lib/helpers/user";

export const metadata: Metadata = {
  title: 'nullPointer | Ask-Question',
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
          <Question mongoUserId={mongoUser._id} />
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
