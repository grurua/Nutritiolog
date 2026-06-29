'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import StepIndicator from '@/components/forms/StepIndicator';
import Step1BasicData from '@/components/forms/Step1BasicData';
import Step2Lifestyle from '@/components/forms/Step2Lifestyle';
import Step3HealthScreening from '@/components/forms/Step3HealthScreening';
import { useAppState } from '@/lib/context';
import { computeAll } from '@/lib/health/calculations';
import type { UserProfile, HealthScreening } from '@/lib/health/types';

const STEP_LABELS = ['ძირითადი', 'ცხოვრების წესი', 'ჯანმრთელობა'];

export default function CalculatorPage() {
  const [step, setStep] = useState(0);
  const [step1Data, setStep1Data] = useState<Partial<UserProfile>>({});
  const [step2Data, setStep2Data] = useState<Partial<UserProfile>>({});
  const { setProfile, setScreening, setResult } = useAppState();
  const router = useRouter();

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

  function handleStep3(screening: HealthScreening) {
    const profile: UserProfile = {
      age: (step1Data as UserProfile).age,
      sex: (step1Data as UserProfile).sex,
      heightCm: (step1Data as UserProfile).heightCm,
      weightKg: (step1Data as UserProfile).weightKg,
      goalWeightKg: (step1Data as UserProfile).goalWeightKg,
      goal: (step1Data as UserProfile).goal,
      activityLevel: (step2Data as UserProfile).activityLevel,
      trainingType: (step2Data as UserProfile).trainingType,
      mealsPerDay: (step2Data as UserProfile).mealsPerDay,
      foodPreferences: (step2Data as UserProfile).foodPreferences,
    };

    setProfile(profile);
    setScreening(screening);

    const result = computeAll(profile, screening);
    setResult(result);

    router.push('/results');
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-8">
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
