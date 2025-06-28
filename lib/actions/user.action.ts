"use server";

import { FilterQuery } from "mongoose";
import { revalidatePath } from "next/cache";
import Question from "../../database/question.model";
import User from "../../database/user.model";
import Tag from "../../database/tag.model";
import { connectToDatabase } from "../mongoose";
import { CreateUserParams, DeleteUserParams, GetAllUsersParams, GetSavedQuestionsParams, GetUserByIdParams, GetUserStatsParams, ToggleSaveQuestionParams, UpdateUserParams } from "./shared.type";


export async function getAllUser(params?: GetAllUsersParams) {
  try {
    await connectToDatabase();

    // const {page=1, pageSize=20, filter, searchQuery} = params;

    const users = await User.find({}).sort({ createdAt: -1 }).lean();

    const plainUsers = users.map((user) => ({
      ...user,
      _id: user._id.toString(),
      joinedAt: user.joinedAt instanceof Date ? user.joinedAt.toISOString() : user.joinedAt,
      saved: user.saved?.map((id: any) => id.toString()) || [],
    }));

    return { users: plainUsers };
  } catch (err) {
    console.log("Error getting users: ", err);
    throw err;
  }
}

export async function toggleSaveQuestion(params?: ToggleSaveQuestionParams) {
  try {
    connectToDatabase();

    const { userId, questionId, path } = params;

    const user = await User.findById(userId);

    if(!user) {
      throw new Error('User not found');
    }

    const isQuestionSaved = user.saved.includes(questionId);

    if(isQuestionSaved) {
      // remove question from saved
      await User.findByIdAndUpdate(userId, 
        { $pull: { saved: questionId }},
        { new: true }
      )
    } else {
      // add question to saved
      await User.findByIdAndUpdate(userId, 
        { $addToSet: { saved: questionId }},
        { new: true }
      )
    }

    revalidatePath(path)
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getSavedQuestions(params: GetSavedQuestionsParams) {
  try {
    connectToDatabase();

    const { clerkId, searchQuery, filter, page = 1, pageSize = 20 } = params;
    console.log(clerkId, searchQuery, filter);

    const skipAmount = (page - 1) * pageSize;
    
    const query: FilterQuery<typeof Question> = searchQuery
      ? { title: { $regex: new RegExp(searchQuery, 'i') } }
      : { };

      let sortOptions = {};

      switch (filter) {
        case "most_recent":
          sortOptions = { createdAt: -1 }
          break;
        case "oldest":
          sortOptions = { createdAt: 1 }
          break;
        case "most_voted":
          sortOptions = { upvotes: -1 }
          break;
        case "most_viewed":
          sortOptions = { views: -1 }
          break;
        case "most_answered":
          sortOptions = { answers: -1 }
          break;
      
        default:
          break;
      }

    const user = await User
    .findOne({ clerkId })
    .populate({
      path: 'saved',
      match: query,
      options: {
        sort: sortOptions,
        skip: skipAmount,
        limit: pageSize + 1,
      },
      populate: [
        { path: 'tags', model: Tag, select: "_id name" },
        { path: 'author', model: User, select: '_id clerkId name image'}
      ]
    })

    const isNext = user.saved.length > pageSize;
    
    if(!user) {
      throw new Error('User not found');
    }

    const savedQuestions = user.saved;

    return { questions: savedQuestions, isNext };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUserById(params: { userId: string }) {
  try {
    await connectToDatabase();
    console.log("Fetching USERRR");

    const { userId } = params;

    const user = await User.findOne({ clerkId: userId }).lean();

    console.log("User fetched: ", user);

    if (!user) return null;

    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
}

export async function createUser(userData: CreateUserParams) {
  try {
    await connectToDatabase();
    console.log("Creating USERRR");

    const user = await User.create(userData);

    console.log("User created: ", user);

    // Convert to plain object for client components
    return {
      ...user.toObject(),
      _id: user._id.toString(),
      saved: user.saved.map((id: any) => id.toString()),
    };
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

export async function updateUser(params: UpdateUserParams) {
  try {
    await connectToDatabase();
    console.log("Updating USERRR");

    const { clerkId, updateData, path } = params;

    await User.findOneAndUpdate({ clerkId }, updateData, {
      new: true,
    });

    console.log("User updated!!");

    revalidatePath(path);
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
}

export async function deleteUser(params: DeleteUserParams) {
  try {
    await connectToDatabase();
    const { clerkId } = params;

    const user = await User.findOne({ clerkId }).lean();

    if (!user) {
      throw new Error("User not found.");
    }

    // Get user questions before deleting them
    await Question.find({ author: user._id }).distinct("_id");

    await Question.deleteMany({ author: user._id });

    const deletedUser = await User.findByIdAndDelete(user._id).lean();

    console.log(deletedUser, "deleted.");

    if (!deletedUser) return null;

    // Convert to plain object for client components
    return {
      ...deletedUser,
      _id: deletedUser._id.toString(),
      saved: deletedUser.saved.map((id: any) => id.toString()),
    };
  } catch (err) {
    console.log("Error deleting user: ", err);
    throw err;
  }
}


// export async function User(params:GetAllUsersParams){
//   try{
//     await connectToDatabase();

//   }catch(err){
//     console.log("Error getting users: ",err);
//     throw err;
//   }
// }
