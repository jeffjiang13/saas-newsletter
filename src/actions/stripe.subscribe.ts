"use server";

import Membership from "@/models/membership.model";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export const stripeSubscribe = async ({ price, userId }: { price: string; userId: string }) => {
  try {
    const user = await Membership.findOne({ userId });
    if (!user || !user.stripeCustomerId) {
      throw new Error("User not found or lacks a Stripe customer ID");
    }

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer: user.stripeCustomerId,
      line_items: [{ price: price, quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/error`,
      subscription_data: {
        metadata: { payingUserId: userId },
      },
    });

    if (!checkoutSession.url) {
      throw new Error("Failed to create a checkout session");
    }

    return checkoutSession.url; // Consistently return the URL or throw an error
  } catch (error) {
    console.error("Error in stripeSubscribe:", error);
    throw error; // Optionally re-throw to allow caller to handle or log it further up the chain
  }
};
