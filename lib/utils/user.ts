import { currentUser } from "@clerk/nextjs/server";
import { getUserById, createUser } from "../actions/user.action";

/**
 * Gets or creates a user in MongoDB based on the current Clerk user
 * This ensures that users who sign up via Clerk but don't get created via webhook
 * are still properly stored in our database
 */
export async function getOrCreateUser() {
  const clerkUser = await currentUser();
  
  if (!clerkUser) {
    return null;
  }

  // Try to get existing user from MongoDB
  let mongoUser = await getUserById({ userId: clerkUser.id });

  // If user doesn't exist, create them
  if (!mongoUser) {
    console.log("User not found in MongoDB, creating new user...");
    try {
      mongoUser = await createUser({
        clerkId: clerkUser.id,
        name: `${clerkUser.firstName || ""}${
          clerkUser.lastName ? ` ${clerkUser.lastName}` : ""
        }`.trim() || "Anonymous User",
        username:
          clerkUser.username ||
          clerkUser.emailAddresses[0]?.emailAddress.split("@")[0] ||
          `user_${clerkUser.id.slice(-6)}`,
        email: clerkUser.emailAddresses[0]?.emailAddress || "",
        image: clerkUser.imageUrl || "",
        about: "Hello, I'm new here!",
      });
      console.log("User created successfully in MongoDB:", mongoUser);
    } catch (error) {
      console.error("Error creating user in MongoDB:", error);
      throw new Error("Failed to create user profile");
    }
  }

  return mongoUser;
}
