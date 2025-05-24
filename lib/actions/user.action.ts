"use server"

import User from "../../database/user.model";
import { connectToDatabase } from "../mongoose"

export async function getUserById({ clerkId }: { clerkId: string }) {
  try {
    await connectToDatabase();
    const user = await User.findOne({ clerkId });
    return user;
  } catch (error) {
    console.error("Error in getUserById:", error);
    throw error;
  }
}
