'use client';

import { useState } from 'react';
import type { HealthScreening } from '@/lib/health/types';

interface Props {
  initialData?: Partial<HealthScreening>;
  onNext: (data: HealthScreening) => void;
  onBack: () => void;
}

export default function Step3HealthScreening({ initialData, onNext, onBack }: Props) {
  const [screening, setScreening] = useState<HealthScreening>({
    diabetes: initialData?.diabetes ?? false,
    prediabetes: initialData?.prediabetes ?? false,
    highBloodPressure: initialData?.highBloodPressure ?? false,
    cardiovascularDisease: initialData?.cardiovascularDisease ?? false,
    kidneyDisease: initialData?.kidneyDisease ?? false,
    liverDisease: initialData?.liverDisease ?? false,
    pregnantOrBreastfeeding: initialData?.pregnantOrBreastfeeding ?? false,
    eatingDisorderHistory: initialData?.eatingDisorderHistory ?? false,
    medicationAffectingWeight: initialData?.medicationAffectingWeight ?? false,
    digestiveIssues: initialData?.digestiveIssues ?? false,
    waistCm: initialData?.waistCm,
  });

  const [waistStr, setWaistStr] = useState(initialData?.waistCm?.toString() || '');

  function toggleField(field: keyof Omit<HealthScreening, 'waistCm'>) {
    setScreening((prev) => ({ ...prev, [field]: !prev[field] }));
  }

  function handleSubmit() {
    const waistCm = waistStr ? parseFloat(waistStr) : undefined;
    onNext({ ...screening, waistCm });
  }

  const questions: { field: keyof Omit<HealthScreening, 'waistCm'>; label: string }[] = [
    { field: 'diabetes', label: 'გაქვს დიაბეტი?' },
    { field: 'prediabetes', label: 'გაქვს პრე-დიაბეტი ან ინსულინრეზისტენტობა?' },
    { field: 'highBloodPressure', label: 'გაქვს მაღალი არტერიული წნევა?' },
    { field: 'cardiovascularDisease', label: 'გაქვს გულ-სისხლძარღვთა დაავადება?' },
    { field: 'kidneyDisease', label: 'გაქვს თირკმლის დაავადება?' },
    { field: 'liverDisease', label: 'გაქვს ღვიძლის დაავადება?' },
    { field: 'pregnantOrBreastfeeding', label: 'ხარ ორსულად ან კვებავ ძუძუთი?' },
    { field: 'eatingDisorderHistory', label: 'გქონია კვების აშლილობის ისტორია?' },
    {
      field: 'medicationAffectingWeight',
      label: 'იღებ ინსულინს, GLP-1 მედიკამენტს, წნევის წამალს ან სხვა მედიკამენტს, რომელიც მოქმედებს მადაზე, შაქარზე ან წონაზე?',
    },
    {
      field: 'digestiveIssues',
      label: 'გაქვს საჭმლის მომნელებლის პრობლემები (რეფლუქსი, გასტრიტი, IBS, ყაბზობა, ნაღვლის ბუშტის პრობლემა)?',
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">ჯანმრთელობის სკრინინგი</h2>
      <p className="text-sm text-gray-500">
        ეს ინფორმაცია საჭიროა უსაფრთხო რეკომენდაციის გასაცემად. თქვენი მონაცემები არ ინახება.
      </p>

      <div className="space-y-3">
        {questions.map(({ field, label }) => (
          <button
            key={field}
            type="button"
            onClick={() => toggleField(field)}
            className={`w-full text-left px-4 py-3 rounded-xl transition border flex items-center gap-3 ${
              screening[field]
                ? 'bg-amber-50 border-amber-400'
                : 'bg-white border-gray-200 hover:border-gray-300'
            }`}
            role="switch"
            aria-checked={screening[field]}
          >
            <div
              className={`w-5 h-5 rounded flex-shrink-0 flex items-center justify-center transition ${
                screening[field]
                  ? 'bg-amber-500 text-white'
                  : 'bg-gray-100 border border-gray-300'
              }`}
            >
              {screening[field] && (
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
            <span className="text-sm text-gray-700">{label}</span>
          </button>
        ))}
      </div>

      <div>
        <label htmlFor="waist" className="block text-sm font-medium text-gray-700 mb-1">
          წელის გარშემოწერილობა (სმ) — არასავალდებულო
        </label>
        <input
          id="waist"
          type="number"
          inputMode="decimal"
          value={waistStr}
          onChange={(e) => setWaistStr(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition text-lg"
          placeholder="მაგ: 90"
        />
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
          გამოთვლა
        </button>
      </div>
    </div>
  );
}
