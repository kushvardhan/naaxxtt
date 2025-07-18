"use client";

import { useEffect, useState } from "react";
import RightSideBarClient from "./RightSideBarClient";

const RightSideBarSelfFetching = () => {
  const [hotQuestions, setHotQuestions] = useState<{ slug: string; question: string }[]>([]);
  const [popularTags, setPopularTags] = useState<{ tag: string; count: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch hot questions
        const questionsResponse = await fetch('/api/hot-questions');
        const questionsData = await questionsResponse.json();
        console.log("questionsData: ", questionsData);
        
        // Fetch popular tags
        const tagsResponse = await fetch('/api/popular-tags');
        const tagsData = await tagsResponse.json();
        console.log("tagsData: ", tagsData);

        // Map the data to the expected format
        const mappedQuestions = questionsData.map((q: any) => ({
          slug: `/question/${q._id}`,
          question: q.title,
        }));

        const mappedTags = tagsData.map((tag: any) => ({
          tag: tag.name,
          count: tag.numberOfQuestions,
        }));

        setHotQuestions(mappedQuestions);
        setPopularTags(mappedTags);
      } catch (error) {
        console.error("Error fetching sidebar data:", error);
        // Set empty arrays on error
        setHotQuestions([]);
        setPopularTags([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <RightSideBarClient 
      hotQuestions={hotQuestions} 
      popularTags={popularTags} 
    />
  );
};

export default RightSideBarSelfFetching;
