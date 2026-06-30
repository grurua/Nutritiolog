import { getBMIResult, getWaistHeightResult } from './bmi';
import { calculateBMR, calculateTDEE, calculateCalorieTarget } from './calories';
import { calculateMacros } from './macros';
import { evaluateSafetyFlags, canGenerateMealPlan, canShowWeightLoss } from './safetyRules';
import type { UserProfile, HealthScreening, CalculationResult } from './types';

export function computeAll(
  profile: UserProfile,
  screening: HealthScreening
): CalculationResult {
  const bmi = getBMIResult(profile.weightKg, profile.heightCm);
  const safetyFlags = evaluateSafetyFlags(profile, screening);
  const canPlan = canGenerateMealPlan(safetyFlags);
  const canWeightLoss = canShowWeightLoss(safetyFlags);

  const waistHeight =
    screening.waistCm != null
      ? getWaistHeightResult(screening.waistCm, profile.heightCm)
      : undefined;

  const bmr = calculateBMR(profile.weightKg, profile.heightCm, profile.age, profile.sex);
  const tdee = calculateTDEE(bmr, profile.activityLevel);

  let calorieTarget;
  let macros;

  if (canWeightLoss && profile.goal === 'loseWeight') {
    calorieTarget = calculateCalorieTarget(tdee, 'moderate');
    if (!calorieTarget.isBelowFloor && canPlan) {
      macros = calculateMacros(
        calorieTarget.selected,
        profile.weightKg,
        profile.heightCm,
        profile.goalWeightKg
      );
    }
  } else if (profile.goal === 'maintainWeight' || profile.goal === 'healthierHabits') {
    const maintenanceCalories = tdee.isRange
      ? Math.round((tdee.male! + tdee.female!) / 2)
      : tdee.value!;

    if (canPlan) {
      macros = calculateMacros(
        maintenanceCalories,
        profile.weightKg,
        profile.heightCm,
        profile.goalWeightKg
      );
    }
  }

  return {
    bmi,
    waistHeight,
    bmr,
    tdee,
    calorieTarget,
    macros,
    safetyFlags,
    canGeneratePlan: canPlan,
    canShowWeightLoss: canWeightLoss,
  };
}
