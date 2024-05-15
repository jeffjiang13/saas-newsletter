"use server";

import Subscriber from "@/models/subscriber.model";
import { connectDb } from "@/shared/libs/db";

export const getSubscribers = async ({
  newsLetterOwnerId,
}: {
  newsLetterOwnerId?: string;  // Allowing undefined
}) => {
  if (!newsLetterOwnerId) {
    console.error("No newsletter owner ID provided.");
    return [];
  }

  try {
    await connectDb();

    const subscribers = await Subscriber.find({
      newsLetterOwnerId,
    }).select('email');

    return subscribers.map(sub => sub.email);
  } catch (error) {
    console.error("Error fetching subscribers:", error);
    return [];
  }
};
