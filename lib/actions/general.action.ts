"use server";

import Answer from "../../database/answer.model";
import Question from "../../database/question.model";
import Tag from "../../database/tag.model";
import User from "../../database/user.model";
import { connectToDatabase } from "../mongoose";

interface SearchParams {
  query?: string | null;
  type?: string | null;
}

const SearchableTypes = ["question", "answer", "user", "tag"];

export async function globalSearch(params: SearchParams) {
  try {
    await connectToDatabase();

    const { query, type } = params;
    console.log("🔍 GlobalSearch Action: ", query, type);

    // Early return for empty queries
    if (!query || query.trim().length < 2) {
      return JSON.stringify([]);
    }

    const regexQuery = { $regex: query.trim(), $options: "i" };
    let results = [];

    const modelsAndTypes = [
      { model: Question, searchField: "title", type: "question" },
      { model: User, searchField: "name", type: "user" },
      { model: Answer, searchField: "content", type: "answer" },
      { model: Tag, searchField: "name", type: "tag" },
    ];

    const typeLower = type?.toLowerCase();

    if (!typeLower || !SearchableTypes.includes(typeLower)) {
      // SEARCH ACROSS EVERYTHING - Use Promise.all for parallel execution
      const searchPromises = modelsAndTypes.map(
        async ({ model, searchField, type }) => {
          const queryResults = await model
            .find({ [searchField]: regexQuery })
            .select(searchField + " _id clerkId question") // Only select needed fields
            .limit(2)
            .lean(); // Use lean() for better performance

          return queryResults.map((item) => ({
            title:
              type === "answer"
                ? `Answers containing ${query}`
                : item[searchField],
            type,
            id:
              type === "user"
                ? item.clerkId
                : type === "answer"
                ? item.question
                : item._id,
          }));
        }
      );

      const searchResults = await Promise.all(searchPromises);
      results = searchResults.flat();
    } else {
      const modelInfo = modelsAndTypes.find((item) => item.type === typeLower);

      console.log("🔍 Filtered search:", { modelInfo, type: typeLower });
      if (!modelInfo) {
        throw new Error("Invalid search type");
      }

      const queryResults = await modelInfo.model
        .find({ [modelInfo.searchField]: regexQuery })
        .select(modelInfo.searchField + " _id clerkId question") // Only select needed fields
        .limit(8)
        .lean(); // Use lean() for better performance

      results = queryResults.map((item) => ({
        title:
          typeLower === "answer"
            ? `Answers containing ${query}`
            : item[modelInfo.searchField],
        type: typeLower,
        id:
          typeLower === "user"
            ? item.clerkId
            : typeLower === "answer"
            ? item.question
            : item._id,
      }));
    }

    console.log("🔍 Search results:", results.length, "items");
    return JSON.stringify(results);
  } catch (error) {
    console.log(`Error fetching global results, ${error}`);
    throw error;
  }
}
