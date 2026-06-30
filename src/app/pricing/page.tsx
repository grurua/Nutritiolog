'use client';

import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';

interface SubscriptionData {
  status: string;
  calculationsUsed: number;
  canCalculate: boolean;
  limit: number;
  currentPeriodEnd?: string;
}

function PricingContent() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const [sub, setSub] = useState<SubscriptionData | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('yearly');

  const success = searchParams.get('success');
  const canceled = searchParams.get('canceled');

  useEffect(() => {
    fetch('/api/subscription')
      .then((r) => r.json())
      .then(setSub);
  }, [success]);

  async function handleSubscribe() {
    if (!session) {
      window.location.href = '/auth/signin?callbackUrl=/pricing';
      return;
    }

    setLoading(true);
    const res = await fetch('/api/stripe/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ plan: selectedPlan }),
    });
    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    }
    setLoading(false);
  }

  async function handleManage() {
    setLoading(true);
    const res = await fetch('/api/stripe/portal', { method: 'POST' });
    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    }
    setLoading(false);
  }

  const isActive = sub?.status === 'active';

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-3">გამოწერა</h1>
        <p className="text-gray-500">
          უფასოდ შეგიძლია {sub?.limit || 3} გამოთვლის გაკეთება. შემდეგ საჭიროა გამოწერა.
        </p>
      </div>

      {success && (
        <div className="bg-emerald-50 text-emerald-700 rounded-xl p-4 mb-6 text-center">
          გამოწერა წარმატებით გააქტიურდა! ახლა შეგიძლია შეუზღუდავი გამოთვლა.
        </div>
      )}

      {canceled && (
        <div className="bg-yellow-50 text-yellow-700 rounded-xl p-4 mb-6 text-center">
          გადახდა გაუქმდა. შეგიძლია თავიდან სცადო.
        </div>
      )}

      {sub && !isActive && (
        <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">გამოყენებული გამოთვლები</p>
              <p className="text-2xl font-bold text-gray-900">
                {sub.calculationsUsed} / {sub.limit}
              </p>
            </div>
            <div className="w-16 h-16 relative">
              <svg className="w-16 h-16 -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="#e5e7eb" strokeWidth="3" />
                <circle
                  cx="18"
                  cy="18"
                  r="15.9"
                  fill="none"
                  stroke={sub.canCalculate ? '#10b981' : '#ef4444'}
                  strokeWidth="3"
                  strokeDasharray={`${(sub.calculationsUsed / sub.limit) * 100} 100`}
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
          {!sub.canCalculate && (
            <p className="text-sm text-red-600 mt-2">
              უფასო ლიმიტი ამოწურულია. გამოწერით მიიღებ შეუზღუდავ წვდომას.
            </p>
          )}
        </div>
      )}

      {isActive ? (
        <div className="bg-emerald-50 rounded-2xl border border-emerald-200 p-6 text-center">
          <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-lg font-bold text-emerald-800 mb-1">აქტიური გამოწერა</h2>
          <p className="text-sm text-emerald-600 mb-4">
            შეუზღუდავი წვდომა ყველა ფუნქციაზე
          </p>
          {sub?.currentPeriodEnd && (
            <p className="text-xs text-emerald-500 mb-4">
              მოქმედებს: {new Date(sub.currentPeriodEnd).toLocaleDateString('ka-GE')}-მდე
            </p>
          )}
          <button
            onClick={handleManage}
            disabled={loading}
            className="px-6 py-2 bg-white text-emerald-700 rounded-lg border border-emerald-200 text-sm font-medium hover:bg-emerald-50 transition-colors disabled:opacity-50"
          >
            გამოწერის მართვა
          </button>
        </div>
      ) : (
        <>
          <div className="flex gap-2 bg-gray-100 rounded-xl p-1 mb-6">
            <button
              onClick={() => setSelectedPlan('monthly')}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                selectedPlan === 'monthly'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500'
              }`}
            >
              თვიური
            </button>
            <button
              onClick={() => setSelectedPlan('yearly')}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                selectedPlan === 'yearly'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500'
              }`}
            >
              წლიური
              <span className="ml-1 text-emerald-600 text-xs">-33%</span>
            </button>
          </div>

          <div className="bg-white rounded-2xl border-2 border-emerald-500 p-6 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-xs font-medium px-3 py-1 rounded-full">
              {selectedPlan === 'yearly' ? 'საუკეთესო ფასი' : 'მოქნილი'}
            </div>

            <div className="text-center mb-6">
              <h2 className="text-lg font-bold text-gray-900 mb-1">პრემიუმი</h2>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-3xl font-bold text-gray-900">
                  {selectedPlan === 'monthly' ? '₾9.99' : '₾79.99'}
                </span>
                <span className="text-gray-500 text-sm">
                  / {selectedPlan === 'monthly' ? 'თვე' : 'წელი'}
                </span>
              </div>
              {selectedPlan === 'yearly' && (
                <p className="text-xs text-emerald-600 mt-1">₾6.67 / თვე</p>
              )}
            </div>

            <ul className="space-y-3 mb-6">
              {[
                'შეუზღუდავი გამოთვლები',
                'დეტალური მაკრონუტრიენტები',
                'კვების გეგმის გენერაცია',
                'სხეულის კომპოზიციის ანალიზი',
                'პერსონალიზებული რეკომენდაციები',
              ].map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-sm text-gray-700">
                  <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>

            <button
              onClick={handleSubscribe}
              disabled={loading}
              className="w-full py-3.5 bg-emerald-600 text-white rounded-xl font-medium text-lg hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200 disabled:opacity-50 disabled:cursor-wait"
            >
              {loading ? 'იტვირთება...' : 'გამოწერა'}
            </button>
          </div>

          <div className="mt-6 bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="font-medium text-gray-800 mb-3">უფასო გეგმა</h3>
            <ul className="space-y-2">
              {[
                `${sub?.limit || 3} უფასო გამოთვლა`,
                'BMI-ს გამოთვლა',
                'ძირითადი კალორიების რეკომენდაცია',
              ].map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-sm text-gray-500">
                  <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}

      <div className="mt-8 text-center">
        <Link
          href="/calculator"
          className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
        >
          დაბრუნება კალკულატორზე
        </Link>
      </div>
    </div>
  );
}

export default function PricingPage() {
  return (
    <Suspense fallback={
      <div className="max-w-2xl mx-auto px-4 py-16 text-center text-gray-400">
        იტვირთება...
      </div>
    }>
      <PricingContent />
    </Suspense>
  );
}
