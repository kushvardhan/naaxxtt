"use server"

import { revalidatePath } from "next/cache";
import User from "../../database/user.model";
import Question from '../../database/question.model';
import { connectToDatabase } from "../mongoose";
import { CreateUserParams,UpdateUserParams,DeleteUserParams } from "./shared.type";

export async function getUserById(params: unknown) {
  try {
    await connectToDatabase(); 
    console.log('Fetching USERRR');

    const { userId } = params;    

    const user = await User.findOne({clerkId: userId });

    console.log("User fetched: ",user);
 
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
}

export async function createUser(userData: CreateUserParams) {
  try {
    await connectToDatabase(); 
    console.log('Creating USERRR');

    const user = await User.create(
      userData
    );

    console.log("User created: ",user);
 
    return user;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
} 

export async function updateUser(params: UpdateUserParams) {
  try {
    await connectToDatabase(); 
    console.log('Updating USERRR');

    const {clerkId,updateData,path} = params;

    await User.findOneAndUpdate(
      {clerkId},
      updateData,
      {
        new:true,
      }
    )

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
      throw new Error('User not found.');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const userQuestionIds = await Question.find({ author: user._id }).distinct('_id');

    await Question.deleteMany({ author: user._id });

    const deletedUser = await User.findByIdAndDelete(user._id);

    console.log(deletedUser, 'deleted.');
    return deletedUser;

  } catch (err) {
    console.log("Error deleting user: ", err);
    throw err;
  }
}
