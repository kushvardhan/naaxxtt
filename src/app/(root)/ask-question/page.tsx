import Question from "@/components/forms/Question";
import { auth } from "@clerk/nextjs";
import { redirect} from "next/navigation";
import { getUserById } from "../../../../lib/actions/user.action";

const Page = async () => {
  const newLocal = auth();
  const { userId } = await newLocal;

  const actualUserId = userId || "";
  if (!actualUserId) redirect("/sign-in");

  const mongoUser = await getUserById({ userId: actualUserId });
  console.log("mongo user ", mongoUser);

  if (!mongoUser) {
    return (
      <div className="mt-20 max-h-[80vh] overflow-y-auto scrollbar-none">
        <h1 className="text-3xl font-bold font-mono text-black dark:text-white">
          User not found
        </h1>
      </div>
    );
  }

  return (
    <div className="mt-20 max-h-[80vh] overflow-y-auto scrollbar-none">
      <h1
        className={`text-3xl font-bold font-mono  text-black !important dark:text-white `}
      >
        Ask a Question
      </h1>
      <div className="mt-8 px-2">
        <Question mongoUserId={mongoUser._id} />
      </div>
    </div>
  );
};

export default Page;
