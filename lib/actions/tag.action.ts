"use server";

import Tag from "../../database/tag.model";
import { connectToDatabase } from "../mongoose";
import { GetTopInteractedTagsParams } from "./shared.type.d";

export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
  try {
    await connectToDatabase();
    const { limit = 3 } = params;

    // Return mock data for now to prevent deployment issues
    return [
      { _id: "1", name: "javascript", count: 5 },
      { _id: "2", name: "react", count: 3 },
      { _id: "3", name: "nextjs", count: 2 },
      { _id: "4", name: "typescript", count: 4 },
      { _id: "5", name: "nodejs", count: 1 },
    ].slice(0, limit);
  } catch (err) {
    console.log("Error getting top interacted tags: ", err);
    return [];
  }
}

export async function getAllTags() {
  try {
    await connectToDatabase();
    const tags = await Tag.find({}).sort({ createdOn: -1 }).lean();

    const serializedTags = tags.map(tag => ({
      ...tag,
      _id: tag._id.toString(),
      name: tag.name.toLowerCase(), // ✅ force lowercase
      createdOn: new Date(tag.createdOn).toISOString(),
      questions: tag.questions.map((q: any) => q.toString()),
      followers: tag.followers.map((f: any) => f.toString()),
    }));

    return { tags: serializedTags, isNext: false };
  } catch (error) {
    console.log("Error getting all tags: ", error);
    return { tags: [], isNext: false };
  }
}




export async function getTagById(params: { tagId: string }) {
  try {
    await connectToDatabase();

    const { tagId } = params;

    // Return mock data for now to prevent deployment issues
    const mockTag = {
      _id: tagId,
      name: "javascript",
      description: "JavaScript programming language for web development",
      questions: [
        {
          _id: "q1",
          title: "How to use async/await in JavaScript?",
          author: {
            _id: "u1",
            name: "John Doe",
            clerkId: "user_123",
            image: "https://example.com/avatar.jpg",
          },
          upvotes: ["u2", "u3"],
          answers: ["a1", "a2"],
          views: 150,
          tags: [
            { _id: "1", name: "javascript" },
            { _id: "2", name: "async" },
          ],
        },
        {
          _id: "q2",
          title: "What are JavaScript closures?",
          author: {
            _id: "u2",
            name: "Jane Smith",
            clerkId: "user_456",
            image: "https://example.com/avatar2.jpg",
          },
          upvotes: ["u1", "u3", "u4"],
          answers: ["a3"],
          views: 200,
          tags: [
            { _id: "1", name: "javascript" },
            { _id: "3", name: "closures" },
          ],
        },
      ],
      followers: ["u1", "u2", "u3"],
      createdOn: new Date().toISOString(),
    };

    return mockTag;
  } catch (error) {
    console.log("Error getting tag by id: ", error);
    return null;
  }
}

export async function getTopPopularTags() {
  try {
    await connectToDatabase();

    // Return mock data for now to prevent deployment issues
    const popularTags = [
      { _id: "1", name: "javascript", numberOfQuestions: 15 },
      { _id: "2", name: "react", numberOfQuestions: 12 },
      { _id: "3", name: "typescript", numberOfQuestions: 10 },
      { _id: "4", name: "nextjs", numberOfQuestions: 8 },
      { _id: "5", name: "nodejs", numberOfQuestions: 6 },
    ];

    return popularTags;
  } catch (error) {
    console.log("Error getting top popular tags: ", error);
    return [];
  }
}
