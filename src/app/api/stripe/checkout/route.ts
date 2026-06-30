import { NextRequest } from 'next/server';
import { auth } from '@/lib/auth';
import { stripe, PLANS } from '@/lib/stripe';
import { getUserData, setStripeCustomerId } from '@/lib/subscription';

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.email) {
    return Response.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const { plan } = await request.json();
  const planConfig = PLANS[plan as keyof typeof PLANS];
  if (!planConfig) {
    return Response.json({ error: 'Invalid plan' }, { status: 400 });
  }

  const userData = getUserData(session.user.id!);
  let customerId = userData.stripeCustomerId;

  if (!customerId) {
    const customer = await stripe.customers.create({
      email: session.user.email,
      name: session.user.name || undefined,
      metadata: { userId: session.user.id! },
    });
    customerId = customer.id;
    setStripeCustomerId(session.user.id!, customerId);
  }

  const origin = request.headers.get('origin') || process.env.NEXTAUTH_URL || '';

  const checkoutSession = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: 'subscription',
    line_items: [{ price: planConfig.priceId, quantity: 1 }],
    success_url: `${origin}/pricing?success=true`,
    cancel_url: `${origin}/pricing?canceled=true`,
    metadata: { userId: session.user.id! },
  });

  return Response.json({ url: checkoutSession.url });
}
