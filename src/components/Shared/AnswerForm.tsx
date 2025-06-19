"use client";

import { useUser } from "@clerk/nextjs";
import { Sparkles } from "lucide-react";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../../context/ThemeContext";

interface AnswerFormProps {
  questionId: string;
}

const AnswerForm = ({ questionId }: AnswerFormProps) => {
  const theme = useContext(ThemeContext);
  const { user } = useUser();
  const [mounted, setMounted] = useState(false);
  const [answer, setAnswer] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPreview, setIsPreview] = useState(false);

  const [popped, setPopped] = useState(false);

  const handleClick = () => {
    setPopped(true);
    setTimeout(() => setPopped(false), 400);
    // TODO: Trigger AI action here
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !theme || !theme.mounted) {
    return (
      <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-2xl h-64">
        <div className="p-6 space-y-4">
          <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/4"></div>
          <div className="h-32 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
          <div className="h-10 bg-gray-300 dark:bg-gray-600 rounded w-32"></div>
        </div>
      </div>
    );
  }

  const isDark = theme?.mode === "dark";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!answer.trim()) return;

    setIsSubmitting(true);

    try {
      // Here you would submit the answer to your API
      console.log("Submitting answer:", { questionId, answer });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Reset form
      setAnswer("");
      setIsPreview(false);

      // Show success message or redirect
      alert("Answer submitted successfully!");
    } catch (error) {
      console.error("Error submitting answer:", error);
      alert("Failed to submit answer. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatAnswerForPreview = (text: string) => {
    return text
      .replace(/\n/g, "<br>")
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(
        /`(.*?)`/g,
        '<code class="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm">$1</code>'
      );
  };

  if (!user) {
    return (
      <div
        className={`rounded-2xl border p-8 text-center ${
          isDark ? "bg-zinc-900/50 border-zinc-800" : "bg-white border-zinc-200"
        }`}
      >
        <h3
          className={`text-xl font-bold font-mono mb-4 ${
            isDark ? "text-zinc-100" : "text-zinc-800"
          }`}
        >
          Sign in to answer this question
        </h3>
        <p className={`mb-6 ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>
          You need to be signed in to post an answer.
        </p>
        <button className="px-6 py-3 bg-orange-500 text-white font-mono font-semibold rounded-xl hover:bg-orange-600 transition-colors duration-200">
          Sign In
        </button>
      </div>
    );
  }

  return (
    <div
      className={`rounded-2xl border ${
        isDark ? "bg-zinc-900/50 border-zinc-800" : "bg-white border-zinc-200"
      }`}
    >
      <div className="p-8">
        <h3
          className={`text-xl font-bold font-mono mb-6 ${
            isDark ? "text-zinc-100" : "text-zinc-800"
          }`}
        >
          Your Answer
        </h3>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* User Info */}
          <div className="flex items-center gap-4 mb-4">
            <Image
              src={user.imageUrl}
              alt={user.fullName || "User"}
              width={40}
              height={40}
              className="rounded-full border-2 border-orange-400"
            />
            <div>
              <div
                className={`font-semibold font-mono ${
                  isDark ? "text-zinc-100" : "text-zinc-800"
                }`}
              >
                {user.fullName}
              </div>
              <div
                className={`text-sm ${
                  isDark ? "text-zinc-400" : "text-zinc-600"
                }`}
              >
                @
                {user.username ||
                  user.emailAddresses[0]?.emailAddress.split("@")[0]}
              </div>
            </div>
          </div>

          {/* Editor Tabs */}
          <div className="w-full flex items-center justify-between">
            <div className="flex gap-2 mb-4 items-center">
              <button
                type="button"
                onClick={() => setIsPreview(false)}
                className={`px-4 py-2 rounded-lg font-mono text-sm transition-colors ${
                  !isPreview
                    ? "bg-orange-500 text-white"
                    : isDark
                    ? "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800"
                    : "text-zinc-600 hover:text-zinc-800 hover:bg-zinc-100"
                }`}
              >
                Write
              </button>
              <button
                type="button"
                onClick={() => setIsPreview(true)}
                className={`px-4 py-2 rounded-lg font-mono text-sm transition-colors ${
                  isPreview
                    ? "bg-orange-500 text-white"
                    : isDark
                    ? "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800"
                    : "text-zinc-600 hover:text-zinc-800 hover:bg-zinc-100"
                }`}
              >
                Preview
              </button>
            </div>
            <div
              type="button"
              onClick={handleClick}
              className={`group flex gap-2 items-center cursor-pointer border-2 ${
                isDark ? "border-orange-500" : "border-orange-600"
              } rounded-lg px-2 py-2 transition-transform duration-600 ease-out ${
                popped ? "scale-105" : "scale-100"
              }`}
            >
              <Sparkles
        className={`h-4 w-4 transition-transform duration-500 ease-out ${
          isDark ? "text-orange-500" : "text-orange-600"
        } group-hover:scale-110`}
      />
      <span className="text-sm font-semibold font-mono">Generate AI answer</span>
    </div>
          </div>

          {/* Editor */}
          {!isPreview ? (
            <div className="space-y-2">
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Write your answer here... You can use **bold**, *italic*, and `code` formatting."
                rows={12}
                className={`w-full p-4 rounded-xl border font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all ${
                  isDark
                    ? "bg-zinc-800 border-zinc-700 text-zinc-100 placeholder-zinc-500"
                    : "bg-white border-zinc-300 text-zinc-800 placeholder-zinc-500"
                }`}
                required
              />
              <div
                className={`text-xs ${
                  isDark ? "text-zinc-500" : "text-zinc-500"
                }`}
              >
                Tip: Use **bold**, *italic*, and `code` for formatting
              </div>
            </div>
          ) : (
            <div
              className={`w-full p-4 rounded-xl border min-h-[200px] ${
                isDark
                  ? "bg-zinc-800 border-zinc-700"
                  : "bg-zinc-50 border-zinc-300"
              }`}
            >
              {answer ? (
                <div
                  className={`prose max-w-none ${isDark ? "prose-invert" : ""}`}
                  dangerouslySetInnerHTML={{
                    __html: formatAnswerForPreview(answer),
                  }}
                />
              ) : (
                <div
                  className={`text-sm ${
                    isDark ? "text-zinc-500" : "text-zinc-700"
                  }`}
                >
                  Nothing to preview yet. Write your answer in the
                  &quot;Write&quot; tab.
                </div>
              )}
            </div>
          )}

          {/* Submit Button */}
          <div className="flex items-center justify-between">
            <div
              className={`text-sm ${
                isDark ? "text-zinc-400" : "text-zinc-600"
              }`}
            >
              By posting your answer, you agree to our terms of service.
            </div>
            <button
              type="submit"
              disabled={!answer.trim() || isSubmitting}
              className={`px-6 py-3 rounded-xl font-mono font-semibold transition-all duration-200 ${
                !answer.trim() || isSubmitting
                  ? "bg-zinc-300 dark:bg-zinc-700 text-zinc-500 cursor-not-allowed"
                  : "bg-orange-500 text-white hover:bg-orange-600 hover:scale-105"
              }`}
            >
              {isSubmitting ? "Posting..." : "Post Your Answer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AnswerForm;
