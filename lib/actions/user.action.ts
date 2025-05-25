"use server"

import User from "../../database/user.model";
import { connectToDatabase } from "../mongoose"

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
