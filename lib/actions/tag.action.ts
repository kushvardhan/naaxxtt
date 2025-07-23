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

    // Serialize the tags to avoid Buffer issues
    const serializedTags = tags.map((tag: any) => ({
      _id: tag._id.toString(),
      name: String(tag.name || ""),
      description: String(tag.description || ""),
      questions: Array.isArray(tag.questions)
        ? tag.questions.map((q: any) => q.toString())
        : [],
      followers: Array.isArray(tag.followers)
        ? tag.followers.map((f: any) => f.toString())
        : [],
      createdOn: tag.createdOn
        ? tag.createdOn.toISOString()
        : new Date().toISOString(),
    }));

    const isNext = totalTags > skipAmount + tags.length;

    return { tags: serializedTags, isNext };
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

    // Complete serialization to ensure no MongoDB objects leak through
    const cleanQuestions = JSON.parse(JSON.stringify(tag.questions || []));

    // Manually ensure populated data is plain objects with explicit type conversion
    const rawQuestions = cleanQuestions.map((q: any) => ({
      _id: String(q._id || ""),
      title: String(q.title || ""),
      content: String(q.content || ""),
      views: Number(q.views || 0),
      upvotes: Array.isArray(q.upvotes)
        ? q.upvotes.map((id: any) => String(id))
        : [],
      downvotes: Array.isArray(q.downvotes)
        ? q.downvotes.map((id: any) => String(id))
        : [],
      answers: Array.isArray(q.answers)
        ? q.answers.map((id: any) => String(id))
        : [],
      tags: Array.isArray(q.tags)
        ? q.tags.map((t: any) => ({
            _id: String(t._id || ""),
            name: String(t.name || ""),
          }))
        : [],
      author: q.author
        ? {
            _id: String(q.author._id || ""),
            name: String(q.author.name || ""),
            clerkId: String(q.author.clerkId || ""),
            image: String(q.author.image || ""),
          }
        : null,
      createdAt: q.createdAt ? String(q.createdAt) : "",
      updatedAt: q.updatedAt ? String(q.updatedAt) : "",
    }));

    return {
      tagTitle: String(tag.name || ""),
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
