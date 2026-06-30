import { calculateBMI, getBMICategory, getWaistHeightResult } from '../lib/health/bmi';
import { calculateBMR, calculateTDEE, calculateCalorieTarget } from '../lib/health/calories';
import { calculateMacros } from '../lib/health/macros';
import { evaluateSafetyFlags, canGenerateMealPlan, canShowWeightLoss } from '../lib/health/safetyRules';
import type { UserProfile, HealthScreening } from '../lib/health/types';

describe('BMI calculation', () => {
  test('calculates BMI correctly for 80kg, 175cm', () => {
    const bmi = calculateBMI(80, 175);
    expect(bmi).toBeCloseTo(26.12, 1);
  });

  test('calculates BMI correctly for 60kg, 160cm', () => {
    const bmi = calculateBMI(60, 160);
    expect(bmi).toBeCloseTo(23.44, 1);
  });
});

describe('BMI categories', () => {
  test('underweight', () => {
    expect(getBMICategory(17)).toBe('ნორმაზე დაბალი წონა');
  });

  test('healthy weight', () => {
    expect(getBMICategory(22)).toBe('ჯანსაღი წონა');
  });

  test('overweight', () => {
    expect(getBMICategory(27)).toBe('ჭარბი წონა');
  });

  test('obesity class 1', () => {
    expect(getBMICategory(32)).toBe('სიმსუქნე I ხარისხი');
  });

  test('obesity class 2', () => {
    expect(getBMICategory(37)).toBe('სიმსუქნე II ხარისხი');
  });

  test('obesity class 3', () => {
    expect(getBMICategory(42)).toBe('სიმსუქნე III ხარისხი');
  });
});

describe('BMR calculation', () => {
  test('male BMR using Mifflin-St Jeor', () => {
    const result = calculateBMR(80, 175, 30, 'male');
    expect(result.isRange).toBe(false);
    expect(result.value).toBe(Math.round(10 * 80 + 6.25 * 175 - 5 * 30 + 5));
  });

  test('female BMR using Mifflin-St Jeor', () => {
    const result = calculateBMR(60, 165, 25, 'female');
    expect(result.isRange).toBe(false);
    expect(result.value).toBe(Math.round(10 * 60 + 6.25 * 165 - 5 * 25 - 161));
  });

  test('preferNotToSay returns range', () => {
    const result = calculateBMR(70, 170, 30, 'preferNotToSay');
    expect(result.isRange).toBe(true);
    expect(result.male).toBeDefined();
    expect(result.female).toBeDefined();
    expect(result.male!).toBeGreaterThan(result.female!);
  });
});

describe('TDEE calculation', () => {
  test('sedentary multiplier', () => {
    const bmr = { value: 1500, isRange: false };
    const tdee = calculateTDEE(bmr, 'sedentary');
    expect(tdee.value).toBe(Math.round(1500 * 1.2));
  });

  test('very active multiplier', () => {
    const bmr = { value: 1500, isRange: false };
    const tdee = calculateTDEE(bmr, 'veryActive');
    expect(tdee.value).toBe(Math.round(1500 * 1.725));
  });

  test('range TDEE for preferNotToSay', () => {
    const bmr = { male: 1700, female: 1500, isRange: true };
    const tdee = calculateTDEE(bmr, 'lightlyActive');
    expect(tdee.isRange).toBe(true);
    expect(tdee.male).toBe(Math.round(1700 * 1.375));
    expect(tdee.female).toBe(Math.round(1500 * 1.375));
  });
});

describe('Calorie deficit safety', () => {
  test('moderate deficit is 15% below TDEE', () => {
    const tdee = { value: 2000, isRange: false };
    const target = calculateCalorieTarget(tdee, 'moderate');
    expect(target.moderate).toBe(1700);
  });

  test('flags below floor when target < 1200', () => {
    const tdee = { value: 1300, isRange: false };
    const target = calculateCalorieTarget(tdee, 'maximum');
    expect(target.isBelowFloor).toBe(true);
    expect(target.warning).toBeDefined();
  });

  test('caps deficit at 1000 kcal', () => {
    const tdee = { value: 4000, isRange: false };
    const target = calculateCalorieTarget(tdee, 'maximum');
    expect(target.deficit).toBeLessThanOrEqual(1000);
  });
});

describe('Macro calculation', () => {
  test('returns protein, fat, carb, and fiber targets', () => {
    const macros = calculateMacros(1800, 80, 175);
    expect(macros.proteinGrams).toBeGreaterThan(0);
    expect(macros.fatGrams).toBeGreaterThan(0);
    expect(macros.carbGrams).toBeGreaterThan(0);
    expect(macros.fiberGrams).toBeGreaterThanOrEqual(25);
    expect(macros.fiberGrams).toBeLessThanOrEqual(38);
  });

  test('uses adjusted weight for BMI >= 30', () => {
    const macrosHigh = calculateMacros(1800, 120, 170);
    const macrosNormal = calculateMacros(1800, 70, 170);
    expect(macrosHigh.proteinGrams).not.toBe(macrosNormal.proteinGrams);
  });
});

describe('Safety rules', () => {
  const baseProfile: UserProfile = {
    age: 30,
    sex: 'male',
    heightCm: 175,
    weightKg: 80,
    goal: 'loseWeight',
    activityLevel: 'sedentary',
    trainingType: 'none',
    mealsPerDay: 3,
    foodPreferences: ['omnivore'],
  };

  const baseScreening: HealthScreening = {
    diabetes: false,
    prediabetes: false,
    highBloodPressure: false,
    cardiovascularDisease: false,
    kidneyDisease: false,
    liverDisease: false,
    pregnantOrBreastfeeding: false,
    eatingDisorderHistory: false,
    medicationAffectingWeight: false,
    digestiveIssues: false,
  };

  test('under 18 blocks plan and weight loss', () => {
    const flags = evaluateSafetyFlags({ ...baseProfile, age: 16 }, baseScreening);
    const under18 = flags.find((f) => f.id === 'under18');
    expect(under18).toBeDefined();
    expect(under18!.blockPlan).toBe(true);
    expect(under18!.blockWeightLoss).toBe(true);
    expect(canGenerateMealPlan(flags)).toBe(false);
    expect(canShowWeightLoss(flags)).toBe(false);
  });

  test('pregnancy blocks plan and weight loss', () => {
    const flags = evaluateSafetyFlags(baseProfile, {
      ...baseScreening,
      pregnantOrBreastfeeding: true,
    });
    expect(flags.some((f) => f.id === 'pregnant')).toBe(true);
    expect(canShowWeightLoss(flags)).toBe(false);
  });

  test('eating disorder history blocks plan', () => {
    const flags = evaluateSafetyFlags(baseProfile, {
      ...baseScreening,
      eatingDisorderHistory: true,
    });
    expect(flags.some((f) => f.id === 'eatingDisorder')).toBe(true);
    expect(canGenerateMealPlan(flags)).toBe(false);
  });

  test('kidney disease blocks plan generation', () => {
    const flags = evaluateSafetyFlags(baseProfile, {
      ...baseScreening,
      kidneyDisease: true,
    });
    expect(flags.some((f) => f.id === 'kidney')).toBe(true);
    expect(canGenerateMealPlan(flags)).toBe(false);
  });

  test('healthy adult has no blocking flags', () => {
    const flags = evaluateSafetyFlags(baseProfile, baseScreening);
    expect(canGenerateMealPlan(flags)).toBe(true);
    expect(canShowWeightLoss(flags)).toBe(true);
  });

  test('diabetes with medication warns and blocks plan', () => {
    const flags = evaluateSafetyFlags(baseProfile, {
      ...baseScreening,
      diabetes: true,
      medicationAffectingWeight: true,
    });
    expect(flags.some((f) => f.id === 'diabetesMedication')).toBe(true);
    expect(canGenerateMealPlan(flags)).toBe(false);
  });

  test('very high BMI blocks plan', () => {
    const flags = evaluateSafetyFlags(
      { ...baseProfile, weightKg: 200, heightCm: 170 },
      baseScreening
    );
    expect(flags.some((f) => f.id === 'veryHighBMI')).toBe(true);
    expect(canGenerateMealPlan(flags)).toBe(false);
  });
});

describe('Waist-to-height ratio', () => {
  test('ratio below 0.5 is lower risk', () => {
    const result = getWaistHeightResult(80, 180);
    expect(result.risk).toBe('lower');
  });

  test('ratio at or above 0.5 is increased risk', () => {
    const result = getWaistHeightResult(90, 170);
    expect(result.risk).toBe('increased');
  });
});
