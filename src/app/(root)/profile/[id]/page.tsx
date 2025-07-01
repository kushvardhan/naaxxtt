import { getUserById, getUserInfo } from '../../../../../lib/actions/user.action'
import { auth } from '@clerk/nextjs/server'
import Link from 'next/link'

interface URLProps {
  params: { id: string }
  searchParams: { [key: string]: string | undefined }
}

export default async function Page({ params }: URLProps) {
  const { userId: clerkId } = await auth()
  const user = await getUserInfo({ userId: params.id })

  console.log(user);

  if (!user) {
    return (
      <div className="w-full h-[calc(100vh-130px)] mt-20 flex items-center justify-center">
        <p className="text-xl text-gray-500">User not found.</p>
      </div>
    )
  }

  return (
    <div className="w-full min-h-[calc(100vh-130px)]  mt-20 overflow-y-scroll scrollbar-hidden px-4 sm:px-6 md:px-10 lg:px-24 py-8 bg-gradient-to-br from-[#f9fafb] to-[#e9eff5] dark:from-gray-900 dark:to-gray-800">
      <h1>Profile Page</h1>
    </div>
  )
}
