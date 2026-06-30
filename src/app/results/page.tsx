'use client';

import { useRouter } from 'next/navigation';
import { useAppState } from '@/lib/context';
import ResultCards from '@/components/results/ResultCards';
import { generateMealPlan } from '@/lib/meal-plan/mealGenerator';
import Link from 'next/link';
import { useState } from 'react';

export default function ResultsPage() {
  const { profile, screening, result, setMealPlan } = useAppState();
  const router = useRouter();
  const [generating, setGenerating] = useState(false);

  if (!result || !profile || !screening) {
    return (
      <div className="max-w-lg mx-auto px-4 py-16 text-center">
        <p className="text-gray-500 mb-4">ჯერ გამოთვლა არ გაკეთებულა.</p>
        <Link
          href="/calculator"
          className="inline-flex px-6 py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-colors"
        >
          დაიწყე გამოთვლა
        </Link>
      </div>
    );
  }

  function handleGenerateMealPlan() {
    if (!result || !profile || !screening) return;

    setGenerating(true);

    setTimeout(() => {
      const calories = result.calorieTarget
        ? result.calorieTarget.selected
        : result.tdee.isRange
        ? Math.round((result.tdee.male! + result.tdee.female!) / 2)
        : result.tdee.value!;

      if (result.macros) {
        const plan = generateMealPlan(
          result.macros,
          calories,
          profile.mealsPerDay,
          profile.foodPreferences,
          screening.digestiveIssues
        );
        setMealPlan(plan);
      }
      setGenerating(false);
      router.push('/meal-plan');
    }, 800);
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">შენი შედეგები</h1>
      <ResultCards result={result} />

      {result.canGeneratePlan && result.macros && (
        <div className="mt-6 sticky bottom-0 bg-gray-50 py-4 -mx-4 px-4">
          <button
            type="button"
            onClick={handleGenerateMealPlan}
            disabled={generating}
            className="w-full py-4 bg-emerald-600 text-white rounded-xl font-medium text-lg hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200 disabled:opacity-60 disabled:cursor-wait"
          >
            {generating ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                </svg>
                იგენერირება...
              </span>
            ) : (
              'კვების გეგმის გენერაცია'
            )}
          </button>
        </div>
      )}

      <div className="mt-6 flex gap-3">
        <Link
          href="/calculator"
          className="flex-1 py-3 text-center bg-gray-100 text-gray-600 rounded-xl font-medium hover:bg-gray-200 transition-colors"
        >
          თავიდან გამოთვლა
        </Link>
      </div>
    </div>
  );
}
