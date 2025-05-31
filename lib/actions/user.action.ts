"use server"

import { revalidatePath } from "next/cache";
import User from "../../database/user.model";
import { connectToDatabase } from "../mongoose"
import { CreateUserParams,UpdateUserParams } from "./shared.type";

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
    console.error("Error creating user:", error);
    throw error;
  }
} 