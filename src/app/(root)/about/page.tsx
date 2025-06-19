const AboutPage = () => {
  return (
    <div className="w-full h-[calc(100vh-130px)] mt-20 overflow-y-scroll scrollbar-hidden">
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl lg:text-4xl font-bold font-mono tracking-wide mb-8 text-zinc-800 dark:text-zinc-100">
          About DevOverflow
        </h1>

        <div className="space-y-8 text-zinc-600 dark:text-zinc-300">
          <section>
            <h2 className="text-2xl font-bold font-mono mb-4 text-zinc-800 dark:text-zinc-100">
              Welcome to DevOverflow
            </h2>
            <p className="text-lg leading-relaxed">
              DevOverflow is a community-driven platform where developers can
              ask questions, share knowledge, and learn from each other. Built
              with modern technologies like Next.js, TypeScript, and MongoDB, we
              provide a seamless experience for developers of all skill levels.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold font-mono mb-4 text-zinc-800 dark:text-zinc-100">
              Features
            </h2>
            <ul className="space-y-2 list-disc list-inside">
              <li>Ask and answer technical questions</li>
              <li>Vote on questions and answers</li>
              <li>Tag-based organization</li>
              <li>User reputation system</li>
              <li>Dark/Light mode support</li>
              <li>Responsive design for all devices</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold font-mono mb-4 text-zinc-800 dark:text-zinc-100">
              Technology Stack
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-zinc-100 dark:bg-zinc-800">
                <h3 className="font-semibold text-orange-500">Frontend</h3>
                <p>Next.js, React, TypeScript</p>
              </div>
              <div className="p-4 rounded-lg bg-zinc-100 dark:bg-zinc-800">
                <h3 className="font-semibold text-orange-500">Backend</h3>
                <p>Node.js, MongoDB</p>
              </div>
              <div className="p-4 rounded-lg bg-zinc-100 dark:bg-zinc-800">
                <h3 className="font-semibold text-orange-500">
                  Authentication
                </h3>
                <p>Clerk</p>
              </div>
              <div className="p-4 rounded-lg bg-zinc-100 dark:bg-zinc-800">
                <h3 className="font-semibold text-orange-500">Styling</h3>
                <p>Tailwind CSS</p>
              </div>
              <div className="p-4 rounded-lg bg-zinc-100 dark:bg-zinc-800">
                <h3 className="font-semibold text-orange-500">Deployment</h3>
                <p>Vercel</p>
              </div>
              <div className="p-4 rounded-lg bg-zinc-100 dark:bg-zinc-800">
                <h3 className="font-semibold text-orange-500">Database</h3>
                <p>MongoDB Atlas</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
