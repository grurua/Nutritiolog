'use client';

import { useAppState } from '@/lib/context';
import MealPlanDisplay from '@/components/results/MealPlanDisplay';
import Link from 'next/link';

export default function MealPlanPage() {
  const { mealPlan } = useAppState();

  if (!mealPlan) {
    return (
      <div className="max-w-lg mx-auto px-4 py-16 text-center">
        <p className="text-gray-500 mb-4">კვების გეგმა ჯერ არ დაგენერირებულა.</p>
        <Link
          href="/calculator"
          className="inline-flex px-6 py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-colors"
        >
          დაიწყე გამოთვლა
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">შენი კვების გეგმა</h1>
      <MealPlanDisplay mealPlan={mealPlan} />

      <div className="mt-6 flex gap-3">
        <Link
          href="/results"
          className="flex-1 py-3 text-center bg-gray-100 text-gray-600 rounded-xl font-medium hover:bg-gray-200 transition-colors"
        >
          უკან შედეგებზე
        </Link>
        <Link
          href="/calculator"
          className="flex-1 py-3 text-center bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-colors"
        >
          თავიდან გამოთვლა
        </Link>
      </div>
    </div>
  );
}
