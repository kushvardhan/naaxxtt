import Question from "@/components/forms/Question";

const Page = () => {

  return (
    <div className="mt-20 max-h-[80vh] overflow-y-auto scrollbar-none">
      <h1  className={`text-3xl font-bold font-mono  text-black !important dark:text-white `}>
        Ask a Question
      </h1>
      <div className="mt-8">
        <Question />
      </div>
    </div>
  );
};

export default Page;
