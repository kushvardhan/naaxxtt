import Question from "@/components/forms/Question";
import { getUserById } from "../../../../lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const Page = async () => {

  // const {userId} = auth();

  const userId = 'user_abc123xyz';
  console.log("ask-question: ",userId);
  if(!userId) redirect('/sign-in');

  const mongoUser = await getUserById({userId});
  console.log("mongo user ",mongoUser); 

  return (
    <div className="mt-20 max-h-[80vh] overflow-y-auto scrollbar-none">
      <h1  className={`text-3xl font-bold font-mono  text-black !important dark:text-white `}>
        Ask a Question
      </h1>
      <div className="mt-8 px-2">
        <Question mongoUserId={JSON.stringify(mongoUser._id)} />
      </div>
    </div>
  );
}; 

export default Page;
