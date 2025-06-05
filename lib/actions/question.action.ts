"use server";

import { revalidatePath } from "next/cache";
import Question from "../../database/question.model";
import Tag from "../../database/tag.model";
import User from "../../database/user.model";
import { connectToDatabase } from "../mongoose";
import { createQuestionsParams, GetQuestionsParams } from "./shared.type";

export async function getQuestions(params: GetQuestionsParams) {
  try {
    await connectToDatabase();

    const { searchQuery, filter } = params;

    // Build query
    const query: Record<string, unknown> = {};

    if (searchQuery) {
      query.$or = [
        { title: { $regex: searchQuery, $options: "i" } },
        { explanation: { $regex: searchQuery, $options: "i" } },
      ];
    }

    // Build sort options
    let sortOptions: Record<string, 1 | -1> = {};

    switch (filter) {
      case "newest":
        sortOptions = { createdAt: -1 };
        break;
      case "frequent":
        sortOptions = { views: -1 };
        break;
      case "unanswered":
        query.answers = { $size: 0 };
        sortOptions = { createdAt: -1 };
        break;
      default:
        sortOptions = { createdAt: -1 };
        break;
    }

    const questions = await Question.find(query)
      .populate({
        path: "tags",
        model: Tag,
      })
      .populate({
        path: "author",
        model: User,
      })
      .sort(sortOptions);

    return { questions };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createQuestion(params: createQuestionsParams) {
  try {
    await connectToDatabase();
    console.log("createQuestion called with params:", params);

    const { title, explanation, tags, author, path } = params;

    const question = await Question.create({
      title,
      explanation,
      author,
    });
    const tagDocuments: any[] = [];

    if (tags && tags.length > 0) {
      for (const tag of tags) {
        const existingTag = await Tag.findOneAndUpdate(
          { name: { $regex: new RegExp(`^${tag}$`, "i") } },
          { $setOnInsert: { name: tag }, $push: { questions: question._id } },
          { new: true, upsert: true }
        );
        if (existingTag) {
          tagDocuments.push(existingTag._id);
        }
      }
    }

    if (tagDocuments.length > 0) {
      await Question.findByIdAndUpdate(question._id, {
        $push: {
          tags: { $each: tagDocuments },
        },
      });
    }

    if (path) {
      revalidatePath(path);
    }
  } catch (error) {
    console.log(error);
  }
}
