"use server"

import Answer from "../../database/answer.model";
import { connectToDatabase } from "../mongoose";
import { AnswerVoteParams, CreateAnswerParams, DeleteAnswerParams, GetAnswersParams } from "./shared.type";
import Question from "../../database/question.model";
import { revalidatePath } from "next/cache";
import Interaction from "../../database/interaction.model";
import User from "../../database/user.model";

export async function createAnswer(params: CreateAnswerParams) {
  try {
    connectToDatabase();

    const { content, author, question, path } = params;

    const [newAnswer] = await Answer.create([{ content, author, question }]);
    
    const questionObject = await Question.findByIdAndUpdate(question, {
      $push: { answers: newAnswer._id}
    })

    await Interaction.create({
      user: author,
      action: "answer",
      question,
      answer: newAnswer._id,
      tags: questionObject.tags
    })

    await User.findByIdAndUpdate(author, { $inc: { reputation: 10 }})

    revalidatePath(path)
  } catch (error) {
    console.log(error);
    throw error;
  }
}