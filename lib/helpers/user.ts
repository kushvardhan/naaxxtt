import { currentUser } from "@clerk/nextjs/server";
import User from "../../database/user.model";
import { createUser, getUserById, updateUser } from "../actions/user.action";
import { connectToDatabase } from "../mongoose";

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

  // Try to get existing user from MongoDB by clerkId
  let mongoUser = await getUserById({ userId: clerkUser.id });

  // If user doesn't exist by clerkId, check if they exist by email
  if (!mongoUser && clerkUser.emailAddresses[0]?.emailAddress) {
    // console.log("User not found by clerkId, checking by email...");
    try {
      await connectToDatabase();
      const existingUser = await User.findOne({
        email: clerkUser.emailAddresses[0].emailAddress,
      }).lean();

      if (existingUser) {
        // console.log("Found existing user by email, updating clerkId...");
        // Update the existing user with the new clerkId
        await updateUser({
          clerkId: existingUser.clerkId || clerkUser.id,
          updateData: {
            clerkId: clerkUser.id,
            name:
              `${clerkUser.firstName || ""}${
                clerkUser.lastName ? ` ${clerkUser.lastName}` : ""
              }`.trim() || existingUser.name,
            username: clerkUser.username || existingUser.username,
            image: clerkUser.imageUrl || existingUser.image,
          },
          path: "/ask-question",
        });

        // Fetch the updated user
        mongoUser = await getUserById({ userId: clerkUser.id });
      }
    } catch (error) {
      console.error("Error checking/updating existing user:", error);
    }
  }

  // If user still doesn't exist, create them
  if (!mongoUser) {
    // console.log("User not found in MongoDB, creating new user...");

    // Generate a unique username
    const baseUsername =
      clerkUser.username ||
      clerkUser.emailAddresses[0]?.emailAddress.split("@")[0] ||
      `user_${clerkUser.id.slice(-6)}`;

    let uniqueUsername = baseUsername;
    let usernameCounter = 1;

    // Check if username already exists and generate a unique one
    try {
      await connectToDatabase();
      while (await User.findOne({ username: uniqueUsername })) {
        uniqueUsername = `${baseUsername}_${usernameCounter}`;
        usernameCounter++;
      }
    } catch (error) {
      console.error("Error checking username uniqueness:", error);
    }

    try {
      mongoUser = await createUser({
        clerkId: clerkUser.id,
        name:
          `${clerkUser.firstName || ""}${
            clerkUser.lastName ? ` ${clerkUser.lastName}` : ""
          }`.trim() || "Anonymous User",
        username: uniqueUsername,
        email: clerkUser.emailAddresses[0]?.emailAddress || "",
        image: clerkUser.imageUrl || "",
        about: "Hello, I'm new here!",
      });
      console.log("User created successfully in MongoDB:", mongoUser);
    } catch (error) {
      console.error("Error creating user in MongoDB:", error);

      // If it's a duplicate key error, try to find the existing user one more time
      if (
        error.message.includes("E11000") ||
        error.message.includes("duplicate key")
      ) {
        // console.log("Duplicate key error, attempting to find existing user...");
        try {
          await connectToDatabase();

          // Try to find by email first
          let existingUser = await User.findOne({
            email: clerkUser.emailAddresses[0]?.emailAddress,
          });

          // If not found by email, try by username
          if (!existingUser) {
            existingUser = await User.findOne({
              username: uniqueUsername,
            });
          }

          if (existingUser) {
            // console.log(
            //   "Found existing user after duplicate error, updating clerkId..."
            // );
            await User.findByIdAndUpdate(existingUser._id, {
              clerkId: clerkUser.id,
            });

            mongoUser = await getUserById({ userId: clerkUser.id });
            if (mongoUser) {
              // console.log("Successfully recovered existing user");
              return mongoUser;
            }
          }
        } catch (recoveryError) {
          console.error("Error during recovery attempt:", recoveryError);
        }
      }

      throw new Error("Failed to create user profile");
    }
  }

  return mongoUser;
}
