"use client";

import { useEffect, useState } from "react";
import RightSideBarClient from "./RightSideBarClient";

const RightSideBarSelfFetching = () => {
  const [hotQuestions, setHotQuestions] = useState<
    { _id: string; title: string }[]
  >([]);
  const [popularTags, setPopularTags] = useState<
    { _id: string; name: string; numberOfQuestions: number }[]
  >([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const fetchData = async () => {
      try {
        // Fetch real data from API routes
        let questionsData = [];
        let tagsData = [];

        try {
          console.log("Fetching hot questions from API...");
          const questionsResponse = await fetch("/api/hot-questions");
          if (questionsResponse.ok) {
            const questionsText = await questionsResponse.text();
            console.log("Questions response:", questionsText);
            if (
              questionsText.startsWith("{") ||
              questionsText.startsWith("[")
            ) {
              questionsData = JSON.parse(questionsText);
              console.log("Parsed questions data:", questionsData);
            }
          }
        } catch (apiError) {
          console.error("Hot questions API failed:", apiError);
        }

        try {
          console.log("Fetching popular tags from API...");
          const tagsResponse = await fetch("/api/popular-tags");
          if (tagsResponse.ok) {
            const tagsText = await tagsResponse.text();
            console.log("Tags response:", tagsText);
            if (tagsText.startsWith("{") || tagsText.startsWith("[")) {
              tagsData = JSON.parse(tagsText);
              console.log("Parsed tags data:", tagsData);
            }
          }
        } catch (apiError) {
          console.error("Popular tags API failed:", apiError);
        }

        // Only use fallback if API completely failed and returned no data
        if (!questionsData || questionsData.length === 0) {
          console.log("No questions data from API, showing empty state");
          questionsData = [];
        }

        if (!tagsData || tagsData.length === 0) {
          console.log("No tags data from API, showing empty state");
          tagsData = [];
        }

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
        // Set empty arrays on error - let the UI handle empty states
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
    <RightSideBarClient hotQuestions={hotQuestions} popularTags={popularTags} />
  );
};

export default RightSideBarSelfFetching;
