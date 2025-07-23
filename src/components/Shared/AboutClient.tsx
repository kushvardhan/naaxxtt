"use client";

import { useContext, useEffect, useState } from "react";
import {
  Sparkles,
  Users2,
  Trophy,
  LayoutPanelTop,
  Activity,
  BellRing,
  FolderKanban,
  BadgeHelp,
  ThumbsUp,
  Tags,
  Star,
  Moon,
  TabletSmartphone
} from "lucide-react";
import { ThemeContext } from "../../../context/ThemeContext";
import Image from "next/image";
import Link from "next/link";

const AboutClient = () => {
  const theme = useContext(ThemeContext);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !theme || !theme.mounted) {
    return (
      <div className="w-full h-full animate-pulse" suppressHydrationWarning>
        <div className="max-w-6xl mx-auto p-6 space-y-8" suppressHydrationWarning>
          <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-1/3" suppressHydrationWarning></div>
          <div className="space-y-4" suppressHydrationWarning>
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-4 bg-gray-200 dark:bg-gray-700 rounded" suppressHydrationWarning></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const isDark = theme.mode === "dark";

const features = [
  {
    icon: Sparkles,
    title: "AI Answer Suggestions",
    description: "Get instant AI-generated answers while typing your question using advanced LLMs"
  },
  {
    icon: Users2,
    title: "Real-Time Collaboration",
    description: "Work together on answers in real-time, just like Google Docs"
  },
  {
    icon: Trophy,
    title: "Weekly Challenges",
    description: "Sharpen your skills with weekly coding problems and climb the leaderboard"
  },
  {
    icon: LayoutPanelTop,
    title: "Live Code Editor",
    description: "Add runnable code snippets directly inside your answers using a built-in editor"
  },
  {
    icon: Activity,
    title: "Smart Recommendations",
    description: "Get personalized question suggestions based on your activity and interests"
  },
  {
    icon: BellRing,
    title: "Tag Following & Notifications",
    description: "Follow your favorite tags and get notified about new posts and updates"
  },
  {
    icon: FolderKanban,
    title: "Bookmark Collections",
    description: "Save and organize your favorite content into custom collections"
  },
  {
    icon: BadgeHelp,
    title: "Ask & Answer",
    description: "Post technical questions and get expert answers from the community"
  },
  {
    icon: ThumbsUp,
    title: "Vote System",
    description: "Upvote quality content and help the best answers rise to the top"
  },
  {
    icon: Tags,
    title: "Smart Tags",
    description: "Organize content with tags for easy discovery and navigation"
  },
  {
    icon: Star,
    title: "Reputation",
    description: "Build your reputation by contributing valuable content"
  },
  {
    icon: Moon,
    title: "Dark Mode",
    description: "Seamless dark/light mode switching for comfortable coding"
  },
  {
    icon: TabletSmartphone,
    title: "Responsive",
    description: "Perfect experience across all devices and screen sizes"
  }
];


  const techStack = [
    { name: "Next.js", category: "Frontend", color: "bg-blue-500" },
    { name: "React", category: "Frontend", color: "bg-cyan-500" },
    { name: "TypeScript", category: "Language", color: "bg-blue-600" },
    { name: "MongoDB", category: "Database", color: "bg-green-500" },
    { name: "Tailwind CSS", category: "Styling", color: "bg-teal-500" },
    { name: "Clerk", category: "Auth", color: "bg-purple-500" },
    { name: "Vercel", category: "Deployment", color: "bg-black" },
    { name: "Node.js", category: "Backend", color: "bg-green-600" }
  ];

  return (
    <div className={`min-h-screen transition-all duration-300 ${
      isDark ? "bg-black text-white" : "bg-white text-black"
    }`}>
      <div className="max-w-6xl mx-auto p-6 space-y-16">
        
        {/* Hero Section */}
        <section className="text-center py-16 animate-fade-in">
          <div className="mb-8">
            <h1 className={`text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent animate-pulse`}>
              NullPointer
            </h1>
            <p className={`text-xl lg:text-2xl font-light max-w-3xl mx-auto leading-relaxed ${
              isDark ? "text-zinc-300" : "text-zinc-600"
            }`}>
              A modern, community-driven platform where developers connect, learn, and grow together through knowledge sharing.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
            <Link href="/ask-question">
              <button className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 ${
                isDark 
                  ? "bg-orange-600 hover:bg-orange-700 text-white shadow-lg hover:shadow-orange-500/25" 
                  : "bg-orange-500 hover:bg-orange-600 text-white shadow-lg hover:shadow-orange-500/25"
              }`}>
                Ask a Question
              </button>
            </Link>
            <Link href="/community">
              <button className={`px-8 py-4 rounded-xl font-semibold text-lg border-2 transition-all duration-300 transform hover:scale-105 ${
                isDark 
                  ? "border-zinc-600 text-zinc-300 hover:bg-zinc-800 hover:border-zinc-500" 
                  : "border-zinc-300 text-zinc-700 hover:bg-zinc-50 hover:border-zinc-400"
              }`}>
                Join Community
              </button>
            </Link>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-16">
          <h2 className={`text-4xl font-bold text-center mb-12 ${
            isDark ? "text-zinc-100" : "text-zinc-800"
          }`}>
            Why Choose NullPointer?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {features.map((feature, index) => {
    const Icon = feature.icon;
    return (
      <div
        key={index}
        className={`p-6 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 ${
          isDark 
            ? "bg-zinc-900 border border-zinc-800 hover:border-orange-500/50" 
            : "bg-zinc-50 border border-zinc-200 hover:border-orange-500/50"
        } shadow-lg hover:shadow-xl`}
        style={{ 
          animationDelay: `${index * 100}ms`,
          animation: `fadeInUp 0.6s ease-out ${index * 100}ms both`
        }}
      >
        <div className="mb-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-orange-500">
          <Icon />
        </div>
        <h3 className={`text-xl font-bold mb-3 ${
          isDark ? "text-zinc-100" : "text-zinc-800"
        }`}>
          {feature.title}
        </h3>
        <p className={`leading-relaxed ${
          isDark ? "text-zinc-400" : "text-zinc-600"
        }`}>
          {feature.description}
        </p>
      </div>
    );
  })}
</div>

        </section>

        {/* Tech Stack */}
        <section className="py-16">
          <h2 className={`text-4xl font-bold text-center mb-12 ${
            isDark ? "text-zinc-100" : "text-zinc-800"
          }`}>
            Built with Modern Technology
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {techStack.map((tech, index) => (
              <div
                key={index}
                className={`p-4 rounded-xl text-center transition-all duration-300 transform hover:scale-110 ${
                  isDark 
                    ? "bg-zinc-900 border border-zinc-800 hover:border-zinc-600" 
                    : "bg-zinc-50 border border-zinc-200 hover:border-zinc-300"
                } shadow-md hover:shadow-lg`}
                style={{ 
                  animationDelay: `${index * 50}ms`,
                  animation: `fadeInUp 0.6s ease-out ${index * 50}ms both`
                }}
              >
                <div className={`w-3 h-3 rounded-full mx-auto mb-3 ${tech.color}`}></div>
                <h3 className={`font-bold text-lg ${
                  isDark ? "text-zinc-100" : "text-zinc-800"
                }`}>
                  {tech.name}
                </h3>
                <p className={`text-sm ${
                  isDark ? "text-zinc-400" : "text-zinc-600"
                }`}>
                  {tech.category}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className={`py-16 px-8 rounded-3xl text-center ${
          isDark 
            ? "bg-gradient-to-r from-orange-900/20 to-orange-800/20 border border-orange-800/30" 
            : "bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-200"
        }`}>
          <h2 className={`text-3xl lg:text-4xl font-bold mb-6 ${
            isDark ? "text-zinc-100" : "text-zinc-800"
          }`}>
            Ready to Start Your Journey?
          </h2>
          <p className={`text-lg mb-8 max-w-2xl mx-auto ${
            isDark ? "text-zinc-300" : "text-zinc-600"
          }`}>
            Join thousands of developers who are already part of our growing community. 
            Share knowledge, learn new skills, and advance your career.
          </p>
          
          <Link href="/sign-up">
            <button className={`px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 ${
              isDark 
                ? "bg-orange-600 hover:bg-orange-700 text-white shadow-lg hover:shadow-orange-500/25" 
                : "bg-orange-500 hover:bg-orange-600 text-white shadow-lg hover:shadow-orange-500/25"
            }`}>
              Get Started Today
            </button>
          </Link>
        </section>

      </div>
    </div>
  );
};

export default AboutClient;
