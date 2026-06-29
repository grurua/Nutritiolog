'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';
import type {
  UserProfile,
  HealthScreening,
  CalculationResult,
  MealPlan,
} from './health/types';

interface AppState {
  profile: UserProfile | null;
  screening: HealthScreening | null;
  result: CalculationResult | null;
  mealPlan: MealPlan | null;
  setProfile: (p: UserProfile) => void;
  setScreening: (s: HealthScreening) => void;
  setResult: (r: CalculationResult) => void;
  setMealPlan: (m: MealPlan) => void;
}

const AppContext = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [screening, setScreening] = useState<HealthScreening | null>(null);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [mealPlan, setMealPlan] = useState<MealPlan | null>(null);

  return (
    <AppContext.Provider
      value={{
        profile,
        screening,
        result,
        mealPlan,
        setProfile,
        setScreening,
        setResult,
        setMealPlan,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppState() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppState must be used within AppProvider');
  return ctx;
}
