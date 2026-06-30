'use client';

import type { MealPlan } from '@/lib/health/types';

interface Props {
  mealPlan: MealPlan;
}

export default function MealPlanDisplay({ mealPlan }: Props) {
  return (
    <div className="space-y-4">
      <div className="text-xs text-gray-500 bg-gray-50 rounded-xl p-4 leading-relaxed">
        ეს კვების გეგმა არის ზოგადი რეკომენდაცია. პორციები და ინგრედიენტები მორგეთ თქვენს
        გემოვნებასა და ტოლერანტობას.
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <h3 className="font-medium text-gray-800 mb-3">დღის ჯამი</h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center">
          <div className="bg-emerald-50 rounded-lg p-2">
            <p className="text-xs text-gray-500">კკალ</p>
            <p className="font-bold text-emerald-700">{mealPlan.totalCalories}</p>
          </div>
          <div className="bg-red-50 rounded-lg p-2">
            <p className="text-xs text-gray-500">ცილა</p>
            <p className="font-bold text-red-600">{mealPlan.totalProtein}გ</p>
          </div>
          <div className="bg-amber-50 rounded-lg p-2">
            <p className="text-xs text-gray-500">ცხიმი</p>
            <p className="font-bold text-amber-600">{mealPlan.totalFat}გ</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-2">
            <p className="text-xs text-gray-500">ნახშირწყლები</p>
            <p className="font-bold text-blue-600">{mealPlan.totalCarbs}გ</p>
          </div>
          <div className="bg-green-50 rounded-lg p-2">
            <p className="text-xs text-gray-500">ბოჭკო</p>
            <p className="font-bold text-green-600">{mealPlan.totalFiber}გ</p>
          </div>
        </div>
      </div>

      {mealPlan.meals.map((meal, idx) => (
        <div key={idx} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="bg-emerald-50 px-4 py-3 border-b border-emerald-100">
            <h3 className="font-medium text-emerald-800">{meal.name}</h3>
          </div>
          <div className="p-4">
            <table className="w-full text-sm mb-3">
              <thead>
                <tr className="text-xs text-gray-400 border-b">
                  <th className="text-left pb-2 font-medium">ინგრედიენტი</th>
                  <th className="text-right pb-2 font-medium">გრამი</th>
                  <th className="text-right pb-2 font-medium">კკალ</th>
                  <th className="text-right pb-2 font-medium hidden sm:table-cell">ცილა</th>
                </tr>
              </thead>
              <tbody>
                {meal.ingredients.map((ing, i) => (
                  <tr key={i} className="border-b border-gray-50">
                    <td className="py-2 text-gray-700">{ing.name}</td>
                    <td className="py-2 text-right text-gray-600">{ing.grams}გ</td>
                    <td className="py-2 text-right text-gray-600">{ing.calories}</td>
                    <td className="py-2 text-right text-gray-600 hidden sm:table-cell">{ing.protein}გ</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex flex-wrap gap-3 text-xs">
              <span className="bg-gray-100 px-2 py-1 rounded">
                კკალ: <span className="font-medium">{meal.totalCalories}</span>
              </span>
              <span className="bg-red-50 px-2 py-1 rounded">
                ცილა: <span className="font-medium">{meal.totalProtein}გ</span>
              </span>
              <span className="bg-amber-50 px-2 py-1 rounded">
                ცხიმი: <span className="font-medium">{meal.totalFat}გ</span>
              </span>
              <span className="bg-blue-50 px-2 py-1 rounded">
                ნახშ: <span className="font-medium">{meal.totalCarbs}გ</span>
              </span>
              <span className="bg-green-50 px-2 py-1 rounded">
                ბოჭკო: <span className="font-medium">{meal.totalFiber}გ</span>
              </span>
            </div>

            <p className="text-xs text-gray-500 mt-3 italic">{meal.explanation}</p>
          </div>
        </div>
      ))}

      {mealPlan.notes.length > 0 && (
        <div className="bg-blue-50 rounded-xl p-4">
          <h4 className="font-medium text-blue-800 mb-2 text-sm">შენიშვნები</h4>
          <ul className="space-y-1">
            {mealPlan.notes.map((note, idx) => (
              <li key={idx} className="text-xs text-blue-700">• {note}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
