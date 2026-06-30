import { NextRequest } from 'next/server';
import { stripe } from '@/lib/stripe';
import { setStripeCustomerId } from '@/lib/subscription';
import type Stripe from 'stripe';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const sig = request.headers.get('stripe-signature')!;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch {
    return Response.json({ error: 'Invalid signature' }, { status: 400 });
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.userId;
      if (userId && session.customer) {
        setStripeCustomerId(userId, session.customer as string);
      }
      break;
    }
    case 'customer.subscription.deleted':
    case 'customer.subscription.updated':
      break;
  }

  return Response.json({ received: true });
}
