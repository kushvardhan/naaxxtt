import Question from "@/components/forms/Question"

const Page = () => {

  return (
    <div className={`mt-20 `}>
      <h1 className={`text-2xl font-bold font-mono dark:text-white`}>
        Ask a Question
      </h1>

      <div className="mt-8">
        <Question />
      </div>
    </div>
  )
}

export default Page