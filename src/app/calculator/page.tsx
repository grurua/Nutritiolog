'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import StepIndicator from '@/components/forms/StepIndicator';
import Step1BasicData from '@/components/forms/Step1BasicData';
import Step2Lifestyle from '@/components/forms/Step2Lifestyle';
import Step3HealthScreening from '@/components/forms/Step3HealthScreening';
import { useAppState } from '@/lib/context';
import { computeAll } from '@/lib/health/calculations';
import type { UserProfile, HealthScreening } from '@/lib/health/types';

const STEP_LABELS = ['ძირითადი', 'ცხოვრების წესი', 'ჯანმრთელობა'];

interface SubInfo {
  status: string;
  calculationsUsed: number;
  canCalculate: boolean;
  limit: number;
}

export default function CalculatorPage() {
  const [step, setStep] = useState(0);
  const [step1Data, setStep1Data] = useState<Partial<UserProfile>>({});
  const [step2Data, setStep2Data] = useState<Partial<UserProfile>>({});
  const [subInfo, setSubInfo] = useState<SubInfo | null>(null);
  const [blocked, setBlocked] = useState(false);
  const { setProfile, setScreening, setResult } = useAppState();
  const { data: session, status: authStatus } = useSession();
  const router = useRouter();

  useEffect(() => {
    fetch('/api/subscription')
      .then((r) => r.json())
      .then(setSubInfo)
      .catch(() => setSubInfo({ status: 'free', calculationsUsed: 0, canCalculate: true, limit: 3 }));
  }, []);

  function handleStep1(data: {
    age: number;
    sex: UserProfile['sex'];
    heightCm: number;
    weightKg: number;
    goalWeightKg?: number;
    goal: UserProfile['goal'];
  }) {
    setStep1Data(data);
    setStep(1);
  }

  function handleStep2(data: {
    activityLevel: UserProfile['activityLevel'];
    trainingType: UserProfile['trainingType'];
    mealsPerDay: number;
    foodPreferences: UserProfile['foodPreferences'];
  }) {
    setStep2Data(data);
    setStep(2);
  }

  async function handleStep3(screening: HealthScreening) {
    if (!session) {
      router.push('/auth/signin?callbackUrl=/calculator');
      return;
    }

    const res = await fetch('/api/subscription', { method: 'POST' });
    if (!res.ok) {
      const data = await res.json();
      if (data.requiresSubscription) {
        setBlocked(true);
        return;
      }
    }

    const profile: UserProfile = {
      age: step1Data.age!,
      sex: step1Data.sex!,
      heightCm: step1Data.heightCm!,
      weightKg: step1Data.weightKg!,
      goalWeightKg: step1Data.goalWeightKg,
      goal: step1Data.goal!,
      activityLevel: step2Data.activityLevel ?? 'sedentary',
      trainingType: step2Data.trainingType ?? 'none',
      mealsPerDay: step2Data.mealsPerDay ?? 3,
      foodPreferences: step2Data.foodPreferences ?? ['omnivore'],
    };

    setProfile(profile);
    setScreening(screening);

    const result = computeAll(profile, screening);
    setResult(result);

    router.push('/results');
  }

  if (blocked) {
    return (
      <div className="max-w-lg mx-auto px-4 py-16 text-center">
        <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
          <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-7 h-7 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m0 0v2m0-2h2m-2 0H10m9.364-7.364l-1.414 1.414M12 3v2m0 14v2M5.636 5.636l1.414 1.414M3 12h2m14 0h2" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">უფასო ლიმიტი ამოიწურა</h2>
          <p className="text-gray-500 mb-6">
            შენ უკვე გამოიყენე {subInfo?.limit || 3} უფასო გამოთვლა.
            გამოწერით მიიღებ შეუზღუდავ წვდომას ყველა ფუნქციაზე.
          </p>
          <Link
            href="/pricing"
            className="inline-flex px-8 py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200"
          >
            გამოწერა
          </Link>
          <button
            onClick={() => setBlocked(false)}
            className="block mx-auto mt-4 text-sm text-gray-400 hover:text-gray-600"
          >
            უკან დაბრუნება
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-8">
      {subInfo && subInfo.status !== 'active' && authStatus !== 'loading' && (
        <div className="mb-4 flex items-center justify-between bg-white rounded-lg border border-gray-200 px-4 py-2.5 text-sm">
          <span className="text-gray-500">
            უფასო გამოთვლები: <span className="font-medium text-gray-900">{subInfo.calculationsUsed}/{subInfo.limit}</span>
          </span>
          {!session && (
            <Link
              href="/auth/signin?callbackUrl=/calculator"
              className="text-emerald-600 font-medium hover:text-emerald-700"
            >
              შესვლა
            </Link>
          )}
        </div>
      )}

      <StepIndicator currentStep={step} totalSteps={3} labels={STEP_LABELS} />

      {step === 0 && <Step1BasicData initialData={step1Data} onNext={handleStep1} />}
      {step === 1 && (
        <Step2Lifestyle
          initialData={step2Data}
          onNext={handleStep2}
          onBack={() => setStep(0)}
        />
      )}
      {step === 2 && (
        <Step3HealthScreening onNext={handleStep3} onBack={() => setStep(1)} />
      )}
    </div>
  );
}
