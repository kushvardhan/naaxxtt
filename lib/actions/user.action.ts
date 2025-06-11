"use server";

import { revalidatePath } from "next/cache";
import mongoose from 'mongoose';
import Question from "../../database/question.model";
import User from "../../database/user.model";
import { connectToDatabase } from "../mongoose";
import {
  CreateUserParams,
  DeleteUserParams,
  UpdateUserParams,
  GetAllUsersParams
} from "./shared.type";

export async function getUserById(params: { userId: string }) {
  try {
    await connectToDatabase();
    console.log("Fetching USERRR");

    const { userId } = params;

    const user = await User.findOne({ clerkId: userId });

    console.log("User fetched: ", user);

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

    return user;
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

    const user = await User.findOne({ clerkId });

    if (!user) {
      throw new Error("User not found.");
    }

    // Get user questions before deleting them
    await Question.find({ author: user._id }).distinct("_id");

    await Question.deleteMany({ author: user._id });

    const deletedUser = await User.findByIdAndDelete(user._id);

    console.log(deletedUser, "deleted.");
    return deletedUser;
  } catch (err) {
    console.log("Error deleting user: ", err);
    throw err;
  }
}

export async function getAllUser(params:GetAllUsersParams){
  try{
    await connectToDatabase();

    // const {page=1, pageSize=20,filter,searchQuery}= params;

    const users = await User.find({}).sort({createdAt: -1});
    
    return {users};

  }catch(err){
    console.log("Error getting users: ",err);
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