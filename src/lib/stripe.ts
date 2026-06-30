import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const PLANS = {
  monthly: {
    name: 'თვიური',
    price: '₾9.99',
    priceId: process.env.STRIPE_MONTHLY_PRICE_ID!,
    interval: 'month' as const,
  },
  yearly: {
    name: 'წლიური',
    price: '₾79.99',
    priceId: process.env.STRIPE_YEARLY_PRICE_ID!,
    interval: 'year' as const,
    savings: '33%',
  },
} as const;

export const FREE_CALCULATION_LIMIT = 3;
