"use server";

import Membership from "@/models/membership.model";
import { connectDb } from "@/shared/libs/db";
import { currentUser } from "@clerk/nextjs";

export const getMemberShip = async () => {
  try {
    // Ensure database connection is established
    await connectDb();

    // Get the current user
    const user = await currentUser();
    if (!user) {
      console.log("No user found");
      return null; // Return null or appropriate response when no user is found
    }

    // Retrieve membership information for the user
    const membership = await Membership.findOne({
      userId: user.id,
    });

    // Return membership or null if not found
    return membership || null;
  } catch (error) {
    console.error("Error fetching membership:", error);
    // Consider throwing the error or returning a specific error response
    throw new Error("Failed to retrieve membership information.");
  }
};
