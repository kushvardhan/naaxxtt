"use server";

import { revalidatePath } from "next/cache";
import Question from "../../database/question.model";
import Tag from "../../database/tag.model";
import User from "../../database/user.model";
import { connectToDatabase } from "../mongoose";
import { CreateQuestionParams, DeleteQuestionParams, EditQuestionParams, GetQuestionByIdParams, GetQuestionsParams, QuestionVoteParams, RecommendedParams } from "./shared.types";

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

    const questions = await Question.find(query as any)
      .populate({
        path: "tags",
        model: Tag,
      })
      .populate({
        path: "author",
        model: User,
      })
      .sort(sortOptions)
      .lean();

    // Convert to plain objects for client components
    const serializedQuestions = questions.map((question) => ({
      ...question,
      _id: question._id.toString(),
      tags: question.tags.map((tag: any) => ({
        ...tag,
        _id: tag._id.toString(),
        questions: tag.questions.map((id: any) => id.toString()),
        followers: tag.followers.map((id: any) => id.toString()),
      })),
      author: {
        ...question.author,
        _id: question.author._id.toString(),
        saved: question.author.saved.map((id: any) => id.toString()),
      },
      upvotes: question.upvotes.map((id: any) => id.toString()),
      downvotes: question.downvotes.map((id: any) => id.toString()),
      likes: question.likes.map((id: any) => id.toString()),
      answers: question.answers.map((id: any) => id.toString()),
    }));

    return serializedQuestions;
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

export async function getQuestionById(params: GetQuestionByIdParams) {
  try{
    await connectToDatabase();

    const {questionId} = params;

    const questionById = await Question.findById(questionId)
                                .populate({path:'tags', model: Tag, select: '_id name'})
                                .populate({path:'author', model: User, select: '_id clerkId name image'})
    return questionById;
  }catch(error){
    console.log(error);
    throw error; 
  }
}

export async function upvoteQuestion(params: QuestionVoteParams) {
  try {
    connectToDatabase();

    const { questionId, userId, hasupVoted, hasdownVoted, path } = params;

    let updateQuery = {};

    if(hasupVoted) {
      updateQuery = { $pull: { upvotes: userId }}
    } else if (hasdownVoted) {
      updateQuery = { 
        $pull: { downvotes: userId },
        $push: { upvotes: userId }
      }
    } else {
      updateQuery = { $addToSet: { upvotes: userId }}
    }

    const question = await Question.findByIdAndUpdate(questionId, updateQuery, { new: true });

    if(!question) {
      throw new Error("Question not found");
    }

    // Increment author's reputation by +1/-1 for upvoting/revoking an upvote to the question
    await User.findByIdAndUpdate(userId, {
      $inc: { reputation: hasupVoted ? -1 : 1}
    })

    // Increment author's reputation by +10/-10 for recieving an upvote/downvote to the question
    await User.findByIdAndUpdate(question.author, {
      $inc: { reputation: hasupVoted ? -10 : 10}
    })

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function downvoteQuestion(params: QuestionVoteParams) {
  try {
    connectToDatabase();

    const { questionId, userId, hasupVoted, hasdownVoted, path } = params;

    let updateQuery = {};

    if(hasdownVoted) {
      updateQuery = { $pull: { downvotes: userId }}
    } else if (hasupVoted) {
      updateQuery = { 
        $pull: { upvotes: userId },
        $push: { downvotes: userId }
      }
    } else {
      updateQuery = { $addToSet: { downvotes: userId }}
    }

    const question = await Question.findByIdAndUpdate(questionId, updateQuery, { new: true });

    if(!question) {
      throw new Error("Question not found");
    }

    // Increment author's reputation
    await User.findByIdAndUpdate(userId, { 
      $inc: { reputation: hasdownVoted ? -2 : 2 }
    })

    await User.findByIdAndUpdate(question.author, { 
      $inc: { reputation: hasdownVoted ? -10 : 10 }
    })

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}