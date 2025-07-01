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
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8 space-y-8 transition-all">
        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-6">
          <img
            src={user.image}
            alt={user.name}
            className="w-24 h-24 rounded-full object-cover border-4 border-blue-500 shadow-lg transition hover:scale-105"
          />
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{user.name}</h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg">@{user.username}</p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
              Joined on {new Date(user.joinedAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* About Section */}
        <div className="space-y-4 text-base text-gray-700 dark:text-gray-300">
          <p><strong className="text-gray-900 dark:text-white">About:</strong> {user.about}</p>
          <p><strong className="text-gray-900 dark:text-white">Location:</strong> {user.location}</p>
          <p>
            <strong className="text-gray-900 dark:text-white">Email:</strong> 
            <span className="ml-1 text-blue-600 dark:text-blue-400">{user.email}</span>
          </p>
          <p>
            <strong className="text-gray-900 dark:text-white">Portfolio:</strong>{' '}
            <Link
              href={user.portfolioWebsite}
              target="_blank"
              className="text-blue-600 hover:underline transition"
            >
              {user.portfolioWebsite}
            </Link>
          </p>
          <p>
            <strong className="text-gray-900 dark:text-white">Reputation:</strong>{' '}
            <span className="font-medium text-green-600 dark:text-green-400">{user.reputation}</span>
          </p>
        </div>

        {/* Saved Questions Placeholder */}
        <div className="pt-6 border-t border-gray-300 dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Saved Questions</h2>
          {user.saved.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {user.saved.map((qid: any, index: number) => (
                <Link
                  key={qid.toString()}
                  href={`/question/${qid}`}
                  className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition block"
                >
                  Question ID: <span className="font-mono">{qid.toString().slice(-6)}</span>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">No questions saved yet.</p>
          )}
        </div>
      </div>
    </div>
  )
}
