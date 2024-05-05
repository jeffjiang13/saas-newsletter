import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import Membership from "@/models/membership.model";
import { connectDb } from "@/shared/libs/db";  // Ensure this utility sets up a reusable connection.

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

const webhookHandler = async (req: NextRequest) => {
  await connectDb();  // Ensure the database connection is ready and reusable.
  try {
    const sig = req.headers.get("stripe-signature")!;
    const event = stripe.webhooks.constructEvent(await req.text(), sig, webhookSecret);

    // Successfully constructed event.
    console.log("✅ Success:", event.id);
    const subscription = event.data.object as Stripe.Subscription;
    const itemId:any = subscription.items.data[0].price.product;  // Corrected to a more specific type.

    // Fetch the product (plan) details
    const product = await stripe.products.retrieve(itemId);
    const planName = product.name;

    // Handle the event based on its type
    if (event.type === "customer.subscription.created" || event.type === "customer.subscription.updated") {
      const membership = await Membership.findOne({ stripeCustomerId: subscription.customer });
      if (membership) {
        // Update the plan name and potentially other details.
        await Membership.updateOne(
          { stripeCustomerId: subscription.customer },
          { $set: { plan: planName, updatedAt: new Date() } }
        );
      }
    } else if (event.type === "customer.subscription.deleted") {
      // Handle subscription deletion, if necessary.
    }

    return new NextResponse(JSON.stringify({ received: true }), { status: 200 });
  } catch (err:any) {
    console.error('Webhook Error:', err.message);
    return new NextResponse(JSON.stringify({ error: 'Webhook handler failed', details: err.message }), { status: 400 });
  }
};

export { webhookHandler as POST };
