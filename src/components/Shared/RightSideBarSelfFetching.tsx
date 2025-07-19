"use client";

import { useEffect, useState } from "react";
import RightSideBarClient from "./RightSideBarClient";

const RightSideBarSelfFetching = () => {
  const [hotQuestions, setHotQuestions] = useState<{ _id: string; title: string }[]>([]);
  const [popularTags, setPopularTags] = useState<{ _id: string; name: string; numberOfQuestions: number }[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const fetchData = async () => {
      try {
        // Fetch hot questions
        const questionsResponse = await fetch('/api/hot-questions');
        const questionsData = await questionsResponse.json();
        
        // Fetch popular tags
        const tagsResponse = await fetch('/api/popular-tags');
        const tagsData = await tagsResponse.json();

        // Map the data to the expected format
        const mappedQuestions = (questionsData || []).map((q: any) => ({
          _id: q._id,
          title: q.title,
        }));

        const mappedTags = (tagsData || []).map((tag: any) => ({
          _id: tag._id,
          name: tag.name,
          numberOfQuestions: tag.numberOfQuestions,
        }));

        setHotQuestions(mappedQuestions);
        setPopularTags(mappedTags);
      } catch (error) {
        console.error("Error fetching sidebar data:", error);
        // Set empty arrays on error
        setHotQuestions([]);
        setPopularTags([]);
      }
    };

    fetchData();
  }, [mounted]);

  // Don't render anything until mounted to prevent hydration issues
  if (!mounted) {
    return null;
  }

  return (
    <RightSideBarClient 
      hotQuestions={hotQuestions} 
      popularTags={popularTags} 
    />
  );
};

export default RightSideBarSelfFetching;
