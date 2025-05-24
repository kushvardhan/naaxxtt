"use server"

import User from "../../database/user.model";
import { connectToDatabase } from "../mongoose"

export async function getUserById(params: any) {
  try {
    await connectToDatabase(); 
    console.log('Fetching USERRR');
    const user = await User.findOne({ clerkId: params.clerkId }); // ✅ Use passed clerkId

    console.log("Fetched user:", user);
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
}
