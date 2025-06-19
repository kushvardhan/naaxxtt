"use server";

import { FilterQuery } from "mongoose";
import Question from "../../database/question.model";
import Tag from "../../database/tag.model";
import User from "../../database/user.model";
import { connectToDatabase } from "../mongoose";
import { GetTopInteractedTagsParams } from "./shared.type.d";

export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
  try {
    await connectToDatabase();
    const { userId, limit  } = params;
    // Find tags from user's questions
    const userQuestions = await Question.find({ author: userId })
      .populate("tags", "_id name")
      .exec();

    const tagCounts = new Map();

    userQuestions.forEach((question: any) => {
      question.tags.forEach((tag: any) => {
        const tagId = tag._id.toString();
        tagCounts.set(tagId, {
          _id: tag._id,
          name: tag.name,
          count: (tagCounts.get(tagId)?.count || 0) + 1,
        });
      });
    });

    const sortedTags = Array.from(tagCounts.values())
      .sort((a, b) => b.count - a.count)
      .slice(0, limit);

    return sortedTags;
  } catch (err) {
    console.log("Error getting top interacted tags: ", err);
    throw err;
  }
}

export async function getAllTags(params?: {
  searchQuery?: string;
  filter?: string;
  page?: number;
  pageSize?: number;
}) {
  try {
    await connectToDatabase();

    const { searchQuery, filter, page = 1, pageSize = 20 } = params || {};

    const skipAmount = (page - 1) * pageSize;

    const query: FilterQuery<typeof Tag> = {};

    if (searchQuery) {
      query.$or = [
        { name: { $regex: searchQuery, $options: "i" } },
        { description: { $regex: searchQuery, $options: "i" } },
      ];
    }

    let sortOptions = {};

    switch (filter) {
      case "popular":
        sortOptions = { followers: -1 };
        break;
      case "recent":
        sortOptions = { createdOn: -1 };
        break;
      case "name":
        sortOptions = { name: 1 };
        break;
      case "old":
        sortOptions = { createdOn: 1 };
        break;
      default:
        sortOptions = { followers: -1 };
        break;
    }

    
    const tags = await Tag.find(query)
      .sort(sortOptions)
      .skip(skipAmount)
      .limit(pageSize)
      .exec();

    const totalTags = await Tag.countDocuments(query);

    const isNext = totalTags > skipAmount + tags.length;

    return { tags, isNext };
  } catch (error) {
    console.log("Error getting all tags: ", error);
    throw error;
  }
}

export async function getTagById(params: { tagId: string }) {
  try {
    await connectToDatabase();

    const { tagId } = params;

    const tag = await Tag.findById(tagId).populate({
      path: "questions",
      model: Question,
      populate: [
        { path: "tags", model: Tag, select: "_id name" },
        { path: "author", model: User, select: "_id clerkId name image" },
      ],
    });

    return tag;
  } catch (error) {
    console.log("Error getting tag by id: ", error);
    throw error;
  }
}

export async function getTopPopularTags() {
  try {
    await connectToDatabase();

    const popularTags = await Tag.aggregate([
      { $project: { name: 1, numberOfQuestions: { $size: "$questions" } } },
      { $sort: { numberOfQuestions: -1 } },
      { $limit: 5 },
    ]);

    return popularTags;
  } catch (error) {
    console.log("Error getting top popular tags: ", error);
    throw error;
  }
}
