import Stripe from 'stripe';

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error('STRIPE_SECRET_KEY is not set');
    }
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  }
  return _stripe;
}

export const PLANS = {
  monthly: {
    name: 'თვიური',
    price: '₾9.99',
    priceId: process.env.STRIPE_MONTHLY_PRICE_ID || '',
    interval: 'month' as const,
  },
  yearly: {
    name: 'წლიური',
    price: '₾79.99',
    priceId: process.env.STRIPE_YEARLY_PRICE_ID || '',
    interval: 'year' as const,
    savings: '33%',
  },
} as const;

export const FREE_CALCULATION_LIMIT = 3;
