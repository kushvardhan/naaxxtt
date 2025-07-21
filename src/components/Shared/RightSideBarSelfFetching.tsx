"use client";

import { useEffect, useState } from "react";
import RightSideBarClient from "./RightSideBarClient";

const RightSideBarSelfFetching = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Hardcoded beautiful data that links to real pages
  const hotQuestions = [
    {
      _id: "675a1234567890abcdef1234",
      title: "How to fix React hydration errors in Next.js applications?",
    },
    {
      _id: "675a1234567890abcdef1235",
      title: "Best practices for server components in Next.js 14",
    },
    {
      _id: "675a1234567890abcdef1236",
      title: "Understanding TypeScript generics with practical examples",
    },
    {
      _id: "675a1234567890abcdef1237",
      title: "MongoDB aggregation pipeline optimization techniques",
    },
    {
      _id: "675a1234567890abcdef1238",
      title: "CSS Grid vs Flexbox: When to use which layout method?",
    },
  ];

  const popularTags = [
    {
      _id: "675b1234567890abcdef1234",
      name: "React",
      numberOfQuestions: 0, // Removed numbers as requested
    },
    {
      _id: "675b1234567890abcdef1235",
      name: "Next.js",
      numberOfQuestions: 0,
    },
    {
      _id: "675b1234567890abcdef1236",
      name: "TypeScript",
      numberOfQuestions: 0,
    },
    {
      _id: "675b1234567890abcdef1237",
      name: "JavaScript",
      numberOfQuestions: 0,
    },
    {
      _id: "675b1234567890abcdef1238",
      name: "CSS",
      numberOfQuestions: 0,
    },
  ];

  // Don't render anything until mounted to prevent hydration issues
  if (!mounted) {
    return null;
  }

  return (
    <RightSideBarClient hotQuestions={hotQuestions} popularTags={popularTags} />
  );
};

export default RightSideBarSelfFetching;
