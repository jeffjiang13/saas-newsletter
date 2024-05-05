"use server";

import Membership from "@/models/membership.model";
import Stripe from "stripe";
import { connectDb } from "@/shared/libs/db";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export const manageSubscription = async ({
  customerId,
  eventType, // Include event type to manage different actions
}: {
  customerId: string;
  eventType: string;
}) => {
  try {
    await connectDb();

    if (eventType === "customer.subscription.deleted") {
      // Handle deletion
      const deleteResult = await Membership.findOneAndUpdate(
        { stripeCustomerId: customerId },
        { plan: "Cancelled" }, // or delete the document entirely
        { new: true }
      );
      console.log('Subscription cancelled:', deleteResult);
      return { message: "Subscription cancelled successfully." };
    } else {
      // Handle other subscription management logic
      const portalSession = await stripe.billingPortal.sessions.create({
        customer: customerId,
        return_url: process.env.NEXT_PUBLIC_WEBSITE_URL + "/dashboard",
      });

      const customer = await stripe.customers.retrieve(customerId, {
        expand: ['subscriptions'],
      }) as Stripe.Customer & { subscriptions: Stripe.ApiList<Stripe.Subscription> };

      if (!customer.subscriptions.data.length) {
        throw new Error('No subscriptions found for this customer.');
      }

      const latestSubscription = customer.subscriptions.data[0];
      const latestPriceId = latestSubscription.items.data[0].price.id;
      const price = await stripe.prices.retrieve(latestPriceId);
      const product = await stripe.products.retrieve(price.product as string);

      const membership = await Membership.findOneAndUpdate(
        { stripeCustomerId: customerId },
        { plan: product.name },
        { new: true }
      );

      if (!membership) {
        throw new Error('Membership not found for the given customer ID.');
      }

      console.log('Updated membership plan:', membership.plan);
      return portalSession.url;
    }
  } catch (error) {
    console.error("Error in manageSubscription:", error);
    throw error;
  }
};
