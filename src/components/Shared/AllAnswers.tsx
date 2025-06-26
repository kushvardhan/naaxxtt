import React from 'react'
import { getAnswers } from '../../../lib/actions/answer.action';
import Link from 'next/link';
import Image from 'next/image';
import { getTimestamp } from '../../../lib/utils';
import ParseHTML from './ParseHTML';
import Votes from './Votes';
import Pagination from './Pagination';
import Filter from './Filter';
import { useSearchParams } from 'next/navigation';


interface Props {
  questionId: string;
  userId: string;
  totalAnswers: number;
  page?: number;
  filter?: string;
}



const AllAnswers = async ({ questionId, userId, totalAnswers, page, filter }: Props) => {
  const result = await getAnswers({
    questionId,
    page: page ? +page : 1,
    sortBy: filter,
  })
  console.log("AnswerJFJB : ", result);

  const AnswerFilters = [
  { name: "Highest Upvotes", value: "highestUpvotes" },
  { name: "Lowest Upvotes", value: "lowestUpvotes" },
  { name: "Most Recent", value: "recent" },
  { name: "Oldest", value: "old" },
];


  return (
    <div className="mt-11">
      <div className='flex items-center justify-between'>
        <h3 className='text-2xl font-mono text-black dark:text-white'>{totalAnswers} <span className='text-xl font-regular text-zinc-900 dark:text-zinc-100' >Answers</span></h3>

        <Filter filters={ AnswerFilters } />
      </div>

      <div>
        {result.answers.map((answer) => (
          <article key={answer._id} className='light-border border-b py-10'>
              <div className='mb-8 flex flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2'>
                <Link href={`/profile/${answer.author.clerkId}`} className="flex flex-1 items-start gap-1 sm:items-center">
                  <Image
                    src={answer?.author?.image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXdiU_9j45_WOVEx4pPhhIm7MaS1ju3RbXnt-k_mbz4XabjKhwDArh2jyExTXCl3IEVzw&usqp=CAU"}
                    width={26}
                    height={26}
                    alt="profile"
                    className="rounded-full object-cover max-sm:mt-0.5 border-1 border-orange-500"
                  />
                  <div className="flex items-center flex-col gap-3 ml-1 sm:flex-row sm:items-center">
                    <p className="text-lg font-semibold ">
                      {answer?.author?.name}
                    </p>

                    <p className="text-md text-zinc-900 dark:text-zinc-300/50 ml-2 mt-0.5 line-clamp-1">
                      answered {" "}
                      {getTimestamp(answer.createdAt)}
                      </p>
                  </div>
                </Link>
                <div className="flex justify-end">
                  <Votes 
                    type="Answer"
                    itemId={JSON.stringify(answer._id)}
                    userId={JSON.stringify(userId)}
                    upvotes={answer.upvotes.length}
                    hasupVoted={answer.upvotes.includes(userId)}
                    downvotes={answer.downvotes.length}
                    hasdownVoted={answer.downvotes.includes(userId)}
                  />
                </div>

            </div>
              <ParseHTML data={answer.content} />
          </article>
        ))}
      </div>

      <div className="mt-10 w-full">
        <Pagination 
          pageNumber={page ? +page : 1}
          isNext={result.isNextAnswer}
        />
      </div>
    </div>
  )
}

export default AllAnswers