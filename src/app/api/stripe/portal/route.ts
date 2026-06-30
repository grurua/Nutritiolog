import { auth } from '@/lib/auth';
import { getStripe } from '@/lib/stripe';
import { getUserData } from '@/lib/subscription';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return Response.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const userData = getUserData(session.user.id);
  if (!userData.stripeCustomerId) {
    return Response.json({ error: 'No subscription found' }, { status: 400 });
  }

  const origin = request.headers.get('origin') || process.env.NEXTAUTH_URL || '';

  const portalSession = await getStripe().billingPortal.sessions.create({
    customer: userData.stripeCustomerId,
    return_url: `${origin}/pricing`,
  });

  return Response.json({ url: portalSession.url });
}
