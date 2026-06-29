import {
  BMI_REFERENCE,
  ADJUSTED_WEIGHT_FACTOR,
  PROTEIN_PER_KG_LOW,
  PROTEIN_PER_KG_BASE,
  PROTEIN_PER_KG_HIGH,
  FAT_PERCENT_MIN,
  FAT_PERCENT_MAX,
  FAT_MINIMUM_PER_KG_IDEAL,
  FIBER_PER_1000_KCAL,
  FIBER_MIN,
  FIBER_MAX,
} from './healthConstants';
import { calculateBMI } from './bmi';
import type { MacroTargets } from './types';

export function calculateIdealWeight(heightCm: number): number {
  const heightM = heightCm / 100;
  return BMI_REFERENCE * heightM * heightM;
}

export function calculateAdjustedWeight(
  currentWeight: number,
  heightCm: number
): number {
  const ideal = calculateIdealWeight(heightCm);
  return ideal + ADJUSTED_WEIGHT_FACTOR * (currentWeight - ideal);
}

export function calculateMacros(
  totalCalories: number,
  weightKg: number,
  heightCm: number,
  goalWeightKg?: number
): MacroTargets {
  const bmi = calculateBMI(weightKg, heightCm);
  const idealWeight = calculateIdealWeight(heightCm);
  const adjustedWeight = calculateAdjustedWeight(weightKg, heightCm);

  let proteinBase: number;
  let proteinLow: number;
  let proteinHigh: number;

  if (bmi >= 30) {
    proteinBase = Math.round(PROTEIN_PER_KG_BASE * adjustedWeight);
    proteinLow = Math.round(PROTEIN_PER_KG_LOW * adjustedWeight);
    proteinHigh = Math.round(PROTEIN_PER_KG_HIGH * adjustedWeight);
  } else {
    const referenceWeight = goalWeightKg || weightKg;
    proteinBase = Math.round(PROTEIN_PER_KG_BASE * referenceWeight);
    proteinLow = Math.round(PROTEIN_PER_KG_LOW * referenceWeight);
    proteinHigh = Math.round(PROTEIN_PER_KG_HIGH * referenceWeight);
  }

  const proteinCalories = proteinBase * 4;

  const fatPercent = (FAT_PERCENT_MIN + FAT_PERCENT_MAX) / 2;
  let fatCalories = Math.round(totalCalories * fatPercent);
  let fatGrams = Math.round(fatCalories / 9);

  const fatMinimum = Math.round(FAT_MINIMUM_PER_KG_IDEAL * idealWeight);
  if (fatGrams < fatMinimum) {
    fatGrams = fatMinimum;
    fatCalories = fatGrams * 9;
  }

  const fatLow = Math.round((totalCalories * FAT_PERCENT_MIN) / 9);
  const fatHigh = Math.round((totalCalories * FAT_PERCENT_MAX) / 9);

  const carbCalories = totalCalories - proteinCalories - fatCalories;
  const carbGrams = Math.max(0, Math.round(carbCalories / 4));

  const fiberFromCalories = Math.round((totalCalories / 1000) * FIBER_PER_1000_KCAL);
  const fiberGrams = Math.min(Math.max(fiberFromCalories, FIBER_MIN), FIBER_MAX);

  return {
    proteinGrams: proteinBase,
    proteinRange: { low: proteinLow, high: proteinHigh },
    fatGrams,
    fatRange: { low: Math.max(fatLow, fatMinimum), high: fatHigh },
    carbGrams,
    fiberGrams,
    fiberRange: { low: FIBER_MIN, high: FIBER_MAX },
  };
}
