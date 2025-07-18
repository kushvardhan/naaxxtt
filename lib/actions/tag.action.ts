"use server";

import { FilterQuery } from "mongoose";
import Question from "../../database/question.model";
import Tag, { ITag } from "../../database/tag.model";
import User from "../../database/user.model";
import { connectToDatabase } from "../mongoose";
import {
  GetAllTagsParams,
  GetQuestionsByTagIdParams,
  GetTopInteractedTagsParams,
} from "./shared.type.d";

export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
  try {
    connectToDatabase();

    const { userId } = params;

    const user = await User.findById(userId);

    if (!user) throw new Error("User not found");

    // Find interactions for the user and group by tags...
    // Interaction...

    return [
      { _id: "1", name: "tag" },
      { _id: "2", name: "tag2" },
    ];
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAllTags(params: GetAllTagsParams) {
  try {
    await connectToDatabase();

    const { searchQuery, filter, page = 1, pageSize = 10 } = params;
    const skipAmount = (page - 1) * pageSize;

    const query: FilterQuery<typeof Tag> = {};

    if (searchQuery) {
      const escapedSearchQuery = searchQuery.replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&"
      );
      query.$or = [{ name: { $regex: new RegExp(escapedSearchQuery, "i") } }];
    }

    let sortOptions = {};

    switch (filter) {
      case "popular":
        sortOptions = { questions: -1 };
        break;
      case "recent":
        sortOptions = { createdAt: -1 };
        break;
      case "name":
        sortOptions = { name: 1 };
        break;
      case "old":
        sortOptions = { createdAt: 1 };
        break;

      default:
        break;
    }

    const totalTags = await Tag.countDocuments(query);

    const tags = await Tag.find(query)
      .sort(sortOptions)
      .skip(skipAmount)
      .limit(pageSize)
      .lean();

    console.log("GetAllTags from DB: ", tags);

    const isNext = totalTags > skipAmount + tags.length;

    return { tags, isNext };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getQuestionsByTagId(params: GetQuestionsByTagIdParams) {
  try {
    connectToDatabase();

    const { tagId, page = 1, pageSize = 10, searchQuery } = params;
    const skipAmount = (page - 1) * pageSize;

    const tagFilter: FilterQuery<ITag> = { _id: tagId };

    const tag = await Tag.findOne(tagFilter)
      .populate({
        path: "questions",
        model: Question,
        match: searchQuery
          ? { title: { $regex: searchQuery, $options: "i" } }
          : {},
        options: {
          sort: { createdAt: -1 },
          skip: skipAmount,
          limit: pageSize + 1,
        },
        populate: [
          {
            path: "tags",
            model: Tag,
            select: "_id name",
            options: { lean: true },
          },
          {
            path: "author",
            model: User,
            select: "_id clerkId name image",
            options: { lean: true },
          },
        ],
      })
      .lean();
    console.log("GetQuestionbyID from DB: ", tag);

    if (!tag) {
      throw new Error("Tag not found");
    }

    // Manually ensure populated data is plain objects
    const rawQuestions = (tag.questions as any[]).map((q: any) => ({
      ...q,
      _id: q._id.toString(),
      tags: q.tags.map((t: any) => ({
        _id: t._id.toString(),
        name: t.name,
      })),
      author: q.author
        ? {
            _id: q.author._id.toString(),
            name: q.author.name,
            clerkId: q.author.clerkId,
            image: q.author.image,
          }
        : null,
      createdAt: q.createdAt?.toString() || "",
      updatedAt: q.updatedAt?.toString() || "",
    }));

    return {
      tagTitle: tag.name,
      questions: rawQuestions.slice(0, pageSize), // ensure pagination
      isNext: rawQuestions.length > pageSize,
    };
  } catch (error) {
    console.log("Error in getQuestionsByTagId:", error);
    throw error;
  }
}

export async function getTopPopularTags() {
  try {
    connectToDatabase();

    const popularTags = await Tag.aggregate([
      { $project: { name: 1, numberOfQuestions: { $size: "$questions" } } },
      { $sort: { numberOfQuestions: -1 } },
      { $limit: 5 },
    ]);

    // Complete serialization to ensure no MongoDB objects leak through
    const cleanTags = JSON.parse(JSON.stringify(popularTags));

    // Map to plain objects with explicit typing
    const serializedTags = cleanTags.map((tag: any) => {
      return {
        _id: String(tag._id || ""),
        name: String(tag.name || "Unknown"),
        numberOfQuestions: Number(tag.numberOfQuestions || 0),
      };
    });

    return serializedTags;
  } catch (error) {
    console.error("getTopPopularTags error:", error);
    // Return empty array on error instead of throwing
    return [];
  }
}
