import { Skeleton } from '../../../../components/ui/skeleton';
import React from 'react'

const Loading = () => {
  return (
    <section className='w-full h-[calc(100vh-120px)] mt-20 overflow-y-scroll scrollbar-hidden'>
      <h1 className="text-xl lg:text-3xl font-bold font-mono dark:text-zinc-100 text-black mt-3">
                Edit User Profile
              </h1>

      <div className="mb-12 mt-11 flex flex-wrap gap-5">
        <Skeleton className="h-14 flex-1" />
        <Skeleton className="h-14 w-28" />
      </div>

      <div className="flex flex-wrap gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
          <Skeleton key={item} className="h-60 w-full rounded-2xl sm:w-[260px]" />
        ))}
      </div>
    </section>
  )
}

export default Loading