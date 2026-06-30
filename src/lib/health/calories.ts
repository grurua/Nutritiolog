import {
  ACTIVITY_MULTIPLIERS,
  DEFICIT_LEVELS,
  CALORIE_FLOOR,
  MAX_DEFICIT_KCAL,
} from './healthConstants';
import type { Sex, ActivityLevel, BMRResult, TDEEResult, CalorieTarget } from './types';

export function calculateBMR(
  weightKg: number,
  heightCm: number,
  age: number,
  sex: Sex
): BMRResult {
  const base = 10 * weightKg + 6.25 * heightCm - 5 * age;

  if (sex === 'male') {
    return { value: Math.round(base + 5), isRange: false };
  }
  if (sex === 'female') {
    return { value: Math.round(base - 161), isRange: false };
  }

  return {
    male: Math.round(base + 5),
    female: Math.round(base - 161),
    isRange: true,
  };
}

export function calculateTDEE(bmr: BMRResult, activityLevel: ActivityLevel): TDEEResult {
  const multiplier = ACTIVITY_MULTIPLIERS[activityLevel];

  if (bmr.isRange) {
    return {
      male: Math.round(bmr.male! * multiplier),
      female: Math.round(bmr.female! * multiplier),
      isRange: true,
    };
  }

  return {
    value: Math.round(bmr.value! * multiplier),
    isRange: false,
  };
}

export function calculateCalorieTarget(
  tdee: TDEEResult,
  deficitLevel: keyof typeof DEFICIT_LEVELS = 'moderate'
): CalorieTarget {
  const tdeeValue = tdee.isRange
    ? Math.round((tdee.male! + tdee.female!) / 2)
    : tdee.value!;

  const conservativeTarget = Math.round(tdeeValue * (1 - DEFICIT_LEVELS.conservative));
  const moderateTarget = Math.round(tdeeValue * (1 - DEFICIT_LEVELS.moderate));
  const maximumTarget = Math.round(tdeeValue * (1 - DEFICIT_LEVELS.maximum));

  let selected: number;
  switch (deficitLevel) {
    case 'conservative':
      selected = conservativeTarget;
      break;
    case 'moderate':
      selected = moderateTarget;
      break;
    case 'maximum':
      selected = maximumTarget;
      break;
  }

  const deficit = tdeeValue - selected;
  let isBelowFloor = false;
  let isDeficitCapped = false;
  let warning: string | undefined;

  if (selected < CALORIE_FLOOR) {
    isBelowFloor = true;
    warning =
      'გამოთვლილი კალორიული მიზანი ძალიან დაბალია და შეიძლება არ იყოს უსაფრთხო. გთხოვთ, მიმართოთ ექიმს ან ნუტრიციოლოგს.';
  }

  if (deficit > MAX_DEFICIT_KCAL) {
    isDeficitCapped = true;
    selected = tdeeValue - MAX_DEFICIT_KCAL;
    warning =
      'კალორიული დეფიციტი შეზღუდულია მაქსიმუმ 1000 კკალ-ით დღეში უსაფრთხოების მიზნით.';
  }

  return {
    conservative: conservativeTarget,
    moderate: moderateTarget,
    maximum: maximumTarget,
    selected,
    deficit: tdeeValue - selected,
    isBelowFloor,
    isDeficitCapped,
    warning,
  };
}
