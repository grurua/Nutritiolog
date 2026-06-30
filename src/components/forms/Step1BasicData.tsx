'use client';

import { useState } from 'react';
import type { Sex, Goal } from '@/lib/health/types';
import { AGE_MIN, HEIGHT_MIN, HEIGHT_MAX, WEIGHT_MIN, WEIGHT_MAX } from '@/lib/health/healthConstants';

interface Step1Data {
  age: number;
  sex: Sex;
  heightCm: number;
  weightKg: number;
  goalWeightKg?: number;
  goal: Goal;
}

interface Props {
  initialData?: Partial<Step1Data>;
  onNext: (data: Step1Data) => void;
}

export default function Step1BasicData({ initialData, onNext }: Props) {
  const [age, setAge] = useState(initialData?.age?.toString() || '');
  const [sex, setSex] = useState<Sex>(initialData?.sex || 'female');
  const [height, setHeight] = useState(initialData?.heightCm?.toString() || '');
  const [weight, setWeight] = useState(initialData?.weightKg?.toString() || '');
  const [goalWeight, setGoalWeight] = useState(initialData?.goalWeightKg?.toString() || '');
  const [goal, setGoal] = useState<Goal>(initialData?.goal || 'loseWeight');
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate(): boolean {
    const errs: Record<string, string> = {};
    const ageNum = parseInt(age);
    const heightNum = parseFloat(height);
    const weightNum = parseFloat(weight);

    if (!age || isNaN(ageNum) || ageNum < AGE_MIN || ageNum > 120) {
      errs.age = `ასაკი უნდა იყოს ${AGE_MIN}-დან 120-მდე`;
    }
    if (!height || isNaN(heightNum) || heightNum < HEIGHT_MIN || heightNum > HEIGHT_MAX) {
      errs.height = `სიმაღლე უნდა იყოს ${HEIGHT_MIN}-${HEIGHT_MAX} სმ`;
    }
    if (!weight || isNaN(weightNum) || weightNum < WEIGHT_MIN || weightNum > WEIGHT_MAX) {
      errs.weight = `წონა უნდა იყოს ${WEIGHT_MIN}-${WEIGHT_MAX} კგ`;
    }
    if (goalWeight) {
      const gw = parseFloat(goalWeight);
      if (isNaN(gw) || gw < WEIGHT_MIN || gw > WEIGHT_MAX) {
        errs.goalWeight = `სამიზნე წონა უნდა იყოს ${WEIGHT_MIN}-${WEIGHT_MAX} კგ`;
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleSubmit() {
    if (!validate()) return;
    onNext({
      age: parseInt(age),
      sex,
      heightCm: parseFloat(height),
      weightKg: parseFloat(weight),
      goalWeightKg: goalWeight ? parseFloat(goalWeight) : undefined,
      goal,
    });
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">ძირითადი მონაცემები</h2>

      <div>
        <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
          ასაკი
        </label>
        <input
          id="age"
          type="number"
          inputMode="numeric"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition text-lg"
          placeholder="მაგ: 30"
        />
        {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">სქესი</label>
        <div className="grid grid-cols-3 gap-2">
          {([
            { value: 'male' as Sex, label: 'მამრობითი' },
            { value: 'female' as Sex, label: 'მდედრობითი' },
            { value: 'preferNotToSay' as Sex, label: 'არ მსურს მითითება' },
          ]).map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setSex(option.value)}
              className={`px-3 py-3 rounded-xl text-sm font-medium transition border ${
                sex === option.value
                  ? 'bg-emerald-50 border-emerald-500 text-emerald-700'
                  : 'bg-white border-gray-200 text-gray-600 hover:border-emerald-300'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-1">
          სიმაღლე (სმ)
        </label>
        <input
          id="height"
          type="number"
          inputMode="decimal"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition text-lg"
          placeholder="მაგ: 170"
        />
        {errors.height && <p className="text-red-500 text-sm mt-1">{errors.height}</p>}
      </div>

      <div>
        <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">
          წონა (კგ)
        </label>
        <input
          id="weight"
          type="number"
          inputMode="decimal"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition text-lg"
          placeholder="მაგ: 80"
        />
        {errors.weight && <p className="text-red-500 text-sm mt-1">{errors.weight}</p>}
      </div>

      <div>
        <label htmlFor="goalWeight" className="block text-sm font-medium text-gray-700 mb-1">
          სამიზნე წონა (კგ) — არასავალდებულო
        </label>
        <input
          id="goalWeight"
          type="number"
          inputMode="decimal"
          value={goalWeight}
          onChange={(e) => setGoalWeight(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition text-lg"
          placeholder="მაგ: 70"
        />
        {errors.goalWeight && <p className="text-red-500 text-sm mt-1">{errors.goalWeight}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">მიზანი</label>
        <div className="space-y-2">
          {([
            { value: 'loseWeight' as Goal, label: 'წონის კლება' },
            { value: 'maintainWeight' as Goal, label: 'წონის შენარჩუნება' },
            { value: 'healthierHabits' as Goal, label: 'ჯანსაღი ჩვევების ჩამოყალიბება' },
          ]).map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setGoal(option.value)}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition border ${
                goal === option.value
                  ? 'bg-emerald-50 border-emerald-500 text-emerald-700'
                  : 'bg-white border-gray-200 text-gray-600 hover:border-emerald-300'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={handleSubmit}
        className="w-full py-4 bg-emerald-600 text-white rounded-xl font-medium text-lg hover:bg-emerald-700 transition-colors"
      >
        შემდეგი
      </button>
    </div>
  );
}
