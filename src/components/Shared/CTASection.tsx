import Link from "next/link";
import { useUser } from "@clerk/nextjs";

const CTASection = () => {
  const { isSignedIn } = useUser();

  return (
    <section className="py-16 px-8 rounded-3xl text-center bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-200 dark:from-orange-900/20 dark:to-orange-800/20 dark:border-orange-800/30">
      <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-zinc-800 dark:text-zinc-100">
        Ready to Start Your Journey?
      </h2>
      <p className="text-lg mb-8 max-w-2xl mx-auto text-zinc-600 dark:text-zinc-300">
        Join thousands of developers who are already part of our growing
        community. Share knowledge, learn new skills, and advance your career.
      </p>

      <div className="flex flex-wrap justify-center gap-4">
        <Link href="/ask-question">
          <button className="px-6 py-3 rounded-xl font-semibold text-base transition-all duration-300 transform hover:scale-105 bg-orange-500 hover:bg-orange-600 text-white shadow-lg hover:shadow-orange-500/25 dark:bg-orange-600 dark:hover:bg-orange-700">
            Ask a Question
          </button>
        </Link>

        <Link href="/">
          <button className="px-6 py-3 rounded-xl font-semibold text-base transition-all duration-300 transform hover:scale-105 bg-white hover:bg-zinc-100 text-zinc-800 border border-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-zinc-100 dark:border-none">
            Browse Questions
          </button>
        </Link>

        <Link href="/tags">
          <button className="px-6 py-3 rounded-xl font-semibold text-base transition-all duration-300 transform hover:scale-105 bg-white hover:bg-zinc-100 text-zinc-800 border border-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-zinc-100 dark:border-none">
            Explore Tags
          </button>
        </Link>

        <Link href="/community">
          <button className="px-6 py-3 rounded-xl font-semibold text-base transition-all duration-300 transform hover:scale-105 bg-white hover:bg-zinc-100 text-zinc-800 border border-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-zinc-100 dark:border-none">
            Join Communities
          </button>
        </Link>

        <Link href="/jobs">
          <button className="px-6 py-3 rounded-xl font-semibold text-base transition-all duration-300 transform hover:scale-105 bg-white hover:bg-zinc-100 text-zinc-800 border border-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-zinc-100 dark:border-none">
            Explore Jobs
          </button>
        </Link>

        {isSignedIn ? (
          <>
            <Link href="/bookmarks">
              <button className="px-6 py-3 rounded-xl font-semibold text-base transition-all duration-300 transform hover:scale-105 bg-orange-500 hover:bg-orange-600 text-white shadow-lg hover:shadow-orange-500/25 dark:bg-orange-600 dark:hover:bg-orange-700">
                View Bookmarks
              </button>
            </Link>

            <Link href={`/profile/me`}>
              <button className="px-6 py-3 rounded-xl font-semibold text-base transition-all duration-300 transform hover:scale-105 bg-orange-500 hover:bg-orange-600 text-white shadow-lg hover:shadow-orange-500/25 dark:bg-orange-600 dark:hover:bg-orange-700">
                Your Questions
              </button>
            </Link>
          </>
        ) : (
          <p className="text-sm italic mt-6 text-zinc-600 dark:text-zinc-400">
            Sign in to ask questions, bookmark content, and contribute answers.
          </p>
        )}
      </div>
    </section>
  );
};

export default CTASection;
