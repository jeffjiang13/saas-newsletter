"use server";

import Membership from "@/models/membership.model";
import Stripe from "stripe";
import { connectDb } from "@/shared/libs/db";

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

    // Create the billing portal session
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: process.env.NEXT_PUBLIC_WEBSITE_URL + "/dashboard",
    });

    // Retrieve customer with expanded subscriptions
    const customer = await stripe.customers.retrieve(customerId, {
      expand: ['subscriptions'],
    }) as Stripe.Customer & { subscriptions: Stripe.ApiList<Stripe.Subscription> };

    if (!customer.subscriptions.data.length) {
      throw new Error('No subscriptions found for this customer.');
    }

    const latestSubscription = customer.subscriptions.data[0];
    const latestPriceId = latestSubscription.items.data[0].price.id;

    // Retrieve the product details using the price ID
    const price = await stripe.prices.retrieve(latestPriceId);
    const product = await stripe.products.retrieve(price.product as string);

    // Update membership with the retrieved product name
    const membership = await Membership.findOneAndUpdate(
      { stripeCustomerId: customerId },
      { plan: product.name },
      { new: true }  // Return the updated document
    );

    if (!membership) {
      throw new Error('Membership not found for the given customer ID.');
    }

    console.log('Updated membership plan:', membership.plan);

    return portalSession.url;
  } catch (error) {
    console.error("Error in manageSubscription:", error);
    throw error; // It's good practice to re-throw errors for further handling or logging
  }
};
