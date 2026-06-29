'use client';

import { useState } from 'react';
import type { ActivityLevel, TrainingType, FoodPreference } from '@/lib/health/types';

interface Step2Data {
  activityLevel: ActivityLevel;
  trainingType: TrainingType;
  mealsPerDay: number;
  foodPreferences: FoodPreference[];
}

interface Props {
  initialData?: Partial<Step2Data>;
  onNext: (data: Step2Data) => void;
  onBack: () => void;
}

export default function Step2Lifestyle({ initialData, onNext, onBack }: Props) {
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>(
    initialData?.activityLevel || 'sedentary'
  );
  const [trainingType, setTrainingType] = useState<TrainingType>(
    initialData?.trainingType || 'none'
  );
  const [mealsPerDay, setMealsPerDay] = useState(initialData?.mealsPerDay || 3);
  const [foodPreferences, setFoodPreferences] = useState<FoodPreference[]>(
    initialData?.foodPreferences || ['omnivore']
  );

  function togglePreference(pref: FoodPreference) {
    setFoodPreferences((prev) => {
      if (prev.includes(pref)) {
        return prev.filter((p) => p !== pref);
      }
      return [...prev, pref];
    });
  }

  function handleSubmit() {
    onNext({ activityLevel, trainingType, mealsPerDay, foodPreferences });
  }

  const activityOptions: { value: ActivityLevel; label: string; desc: string }[] = [
    { value: 'sedentary', label: 'მჯდომარე', desc: 'ოფისში მუშაობა, მცირე მოძრაობა' },
    { value: 'lightlyActive', label: 'ოდნავ აქტიური', desc: 'მსუბუქი სეირნობა, საშინაო საქმეები' },
    { value: 'moderatelyActive', label: 'საშუალოდ აქტიური', desc: 'რეგულარული ვარჯიში 3-5 დღე' },
    { value: 'veryActive', label: 'ძალიან აქტიური', desc: 'ინტენსიური ვარჯიში 6-7 დღე' },
  ];

  const trainingOptions: { value: TrainingType; label: string }[] = [
    { value: 'none', label: 'არ ვარჯიშობ' },
    { value: 'walking', label: 'სეირნობა' },
    { value: 'strength', label: 'ძალოვანი ვარჯიში' },
    { value: 'cardio', label: 'კარდიო' },
    { value: 'mixed', label: 'შერეული' },
  ];

  const preferenceOptions: { value: FoodPreference; label: string }[] = [
    { value: 'omnivore', label: 'ყველა პროდუქტი' },
    { value: 'noPork', label: 'ღორის გარეშე' },
    { value: 'vegetarian', label: 'ვეგეტარიანული' },
    { value: 'noDairy', label: 'რძის გარეშე' },
    { value: 'lowBudget', label: 'ეკონომიური' },
    { value: 'georgianFriendly', label: 'ქართული სამზარეულო' },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">ცხოვრების წესი</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">აქტივობის დონე</label>
        <div className="space-y-2">
          {activityOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setActivityLevel(opt.value)}
              className={`w-full text-left px-4 py-3 rounded-xl transition border ${
                activityLevel === opt.value
                  ? 'bg-emerald-50 border-emerald-500'
                  : 'bg-white border-gray-200 hover:border-emerald-300'
              }`}
            >
              <span className={`text-sm font-medium ${activityLevel === opt.value ? 'text-emerald-700' : 'text-gray-700'}`}>
                {opt.label}
              </span>
              <span className="block text-xs text-gray-400 mt-0.5">{opt.desc}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">ვარჯიშის ტიპი</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {trainingOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setTrainingType(opt.value)}
              className={`px-3 py-3 rounded-xl text-sm font-medium transition border ${
                trainingType === opt.value
                  ? 'bg-emerald-50 border-emerald-500 text-emerald-700'
                  : 'bg-white border-gray-200 text-gray-600 hover:border-emerald-300'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          კვების რაოდენობა დღეში
        </label>
        <div className="grid grid-cols-4 gap-2">
          {[2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setMealsPerDay(n)}
              className={`py-3 rounded-xl text-sm font-medium transition border ${
                mealsPerDay === n
                  ? 'bg-emerald-50 border-emerald-500 text-emerald-700'
                  : 'bg-white border-gray-200 text-gray-600 hover:border-emerald-300'
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          კვებითი პრეფერენციები
        </label>
        <div className="grid grid-cols-2 gap-2">
          {preferenceOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => togglePreference(opt.value)}
              className={`px-3 py-3 rounded-xl text-sm font-medium transition border ${
                foodPreferences.includes(opt.value)
                  ? 'bg-emerald-50 border-emerald-500 text-emerald-700'
                  : 'bg-white border-gray-200 text-gray-600 hover:border-emerald-300'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 py-4 bg-gray-100 text-gray-600 rounded-xl font-medium text-lg hover:bg-gray-200 transition-colors"
        >
          უკან
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className="flex-1 py-4 bg-emerald-600 text-white rounded-xl font-medium text-lg hover:bg-emerald-700 transition-colors"
        >
          შემდეგი
        </button>
      </div>
    </div>
  );
}
