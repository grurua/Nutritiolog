import { stripe, FREE_CALCULATION_LIMIT } from './stripe';

export type SubscriptionStatus = 'free' | 'active' | 'canceled' | 'past_due';

export interface UserSubscription {
  status: SubscriptionStatus;
  calculationsUsed: number;
  canCalculate: boolean;
  stripeCustomerId?: string;
  currentPeriodEnd?: string;
}

const userDataStore = new Map<string, { calculationsUsed: number; stripeCustomerId?: string }>();

export function getUserData(userId: string) {
  if (!userDataStore.has(userId)) {
    userDataStore.set(userId, { calculationsUsed: 0 });
  }
  return userDataStore.get(userId)!;
}

export function incrementCalculations(userId: string): number {
  const data = getUserData(userId);
  data.calculationsUsed += 1;
  return data.calculationsUsed;
}

export function setStripeCustomerId(userId: string, customerId: string) {
  const data = getUserData(userId);
  data.stripeCustomerId = customerId;
}

export async function getUserSubscription(userId: string): Promise<UserSubscription> {
  const data = getUserData(userId);

  if (data.stripeCustomerId) {
    try {
      const subscriptions = await stripe.subscriptions.list({
        customer: data.stripeCustomerId,
        status: 'all',
        limit: 1,
      });

      const sub = subscriptions.data[0];
      if (sub && (sub.status === 'active' || sub.status === 'trialing')) {
        const periodEnd = (sub as unknown as Record<string, number>).current_period_end;
        return {
          status: 'active',
          calculationsUsed: data.calculationsUsed,
          canCalculate: true,
          stripeCustomerId: data.stripeCustomerId,
          currentPeriodEnd: periodEnd
            ? new Date(periodEnd * 1000).toISOString()
            : undefined,
        };
      }

      if (sub && sub.status === 'past_due') {
        return {
          status: 'past_due',
          calculationsUsed: data.calculationsUsed,
          canCalculate: false,
          stripeCustomerId: data.stripeCustomerId,
        };
      }
    } catch {
      // Stripe not configured — fall through to free
    }
  }

  return {
    status: 'free',
    calculationsUsed: data.calculationsUsed,
    canCalculate: data.calculationsUsed < FREE_CALCULATION_LIMIT,
    stripeCustomerId: data.stripeCustomerId,
  };
}
