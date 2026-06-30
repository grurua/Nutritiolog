import { auth } from '@/lib/auth';
import { getUserSubscription, incrementCalculations } from '@/lib/subscription';
import { FREE_CALCULATION_LIMIT } from '@/lib/stripe';

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return Response.json({
      status: 'anonymous',
      calculationsUsed: 0,
      canCalculate: true,
      limit: FREE_CALCULATION_LIMIT,
    });
  }

  const sub = await getUserSubscription(session.user.id);
  return Response.json({ ...sub, limit: FREE_CALCULATION_LIMIT });
}

export async function POST() {
  const session = await auth();
  if (!session?.user?.id) {
    return Response.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const sub = await getUserSubscription(session.user.id);
  if (!sub.canCalculate) {
    return Response.json({ error: 'Limit reached', requiresSubscription: true }, { status: 403 });
  }

  const count = incrementCalculations(session.user.id);
  return Response.json({ calculationsUsed: count, limit: FREE_CALCULATION_LIMIT });
}
