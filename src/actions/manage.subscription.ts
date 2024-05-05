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

    // Properly type the response to include the subscriptions expansion
    const customer = await stripe.customers.retrieve(customerId, {
      expand: ['subscriptions'],
    }) as Stripe.Customer & { subscriptions: Stripe.ApiList<Stripe.Subscription> };

    const latestSubscription = customer.subscriptions.data[0]; // Now safe to access

    const newPlanId = latestSubscription.items.data[0].price.product;

    // Retrieve the product linked to the plan
    const product = await stripe.products.retrieve(newPlanId as string);

    const membership = await Membership.findOne({ stripeCustomerId: customerId });
    if (membership) {
      // Assume product.name contains the plan name
      await Membership.updateOne(
        { stripeCustomerId: customerId },
        { $set: { plan: product.name } }
      );
    }

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: process.env.NEXT_PUBLIC_WEBSITE_URL + "/dashboard",
    });

    return portalSession.url;
  } catch (error) {
    console.error("Error in manageSubscription:", error);
    throw error;
  }
};
