"use server";

import Question from "../../database/question.model";
import Tag from "../../database/tag.model";
import User from "../../database/user.model";
import { connectToDatabase } from "../mongoose";

export async function createQuestion(params: any) {
  try {
    await connectToDatabase();
    console.log("createQuestion called with params:", params);

    const { title, explanation, tags, author, path } = params;

    const user = await User.findOne(author);

    if (!user || !user._id) {
      console.log("User not found or missing _id", user);
      return null;
    }

    const question = await Question.create({
      title,
      explanation,
      author: user._id,
    });
    const tagDocuments = [];

    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, "i") } },
        { $setOnInsert: { name: tag }, $push: { questions: question._id } },
        { new: true, upsert: true }
      );
      tagDocuments.push(existingTag._id);
    }

    const newQuet = await Question.findByIdAndUpdate(question._id, {
      $push: {
        tags: { $each: tagDocuments },
      },
    });

    return newQuet;
  } catch (error) {
    console.log(error);
  }
}
