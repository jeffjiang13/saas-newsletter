"use server";

import { connectDb } from "@/shared/libs/db";
import Membership from "@/models/membership.model";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export const manageSubscription = async ({
  customerId,
}: {
  customerId: string;
}) => {
  try {
    await connectDb();
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2023-10-16",
    });

    // Create the billing portal session
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: process.env.NEXT_PUBLIC_WEBSITE_URL + "/dashboard",
    });

    // Listen for changes on the customer's subscription
    // This assumes you have some mechanism, like webhooks, to listen for subscription changes
    // Here we simulate fetching the updated subscription data after a change
    const customer = await stripe.customers.retrieve(customerId, {
      expand: ['subscriptions'],
    }) as Stripe.Customer & { subscriptions: Stripe.ApiList<Stripe.Subscription> };
    const latestSubscription = customer.subscriptions.data[0]; // Get the latest subscription
    const newPlan = latestSubscription.items.data[0].price.product; // Assuming product ID is stored as plan

    // Fetch and update the user's membership data
    const membership = await Membership.findOne({ stripeCustomerId: customerId });
    if (membership) {
      membership.plan = newPlan; // Update with new plan information
      await membership.save();
    }

    return portalSession.url;
  } catch (error) {
    console.error("Error in manageSubscription:", error);
    throw error; // It's good practice to re-throw errors for further handling or logging
  }
};
