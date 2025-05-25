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
    console.log("Params: ",params);
    const questions = await Question.find({})
    .populate({
      path:'tags',
      model: Tag,
    }).populate({
      path:'author',
      model: User,
    })
    .sort({createdAt: -1});

    return {questions};

  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createQuestion(params: createQuestionsParams) {
  try {
    await connectToDatabase();
    console.log("createQuestion called with params:", params);

    const { title, explanation, tags,author,path} = params;


    const question = await Question.create({
      title,
      explanation,
      author,
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

    await Question.findByIdAndUpdate(question._id, {
      $push: {
        tags: { $each: tagDocuments },
      },
    });

    revalidatePath(path);

  } catch (error) {
    console.log(error);
  }
}
