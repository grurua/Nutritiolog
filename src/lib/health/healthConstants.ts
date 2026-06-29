export const BMI_CATEGORIES = {
  UNDERWEIGHT: { max: 18.5, label: 'ნორმაზე დაბალი წონა' },
  HEALTHY: { min: 18.5, max: 25, label: 'ჯანსაღი წონა' },
  OVERWEIGHT: { min: 25, max: 30, label: 'ჭარბი წონა' },
  OBESITY_1: { min: 30, max: 35, label: 'სიმსუქნე I ხარისხი' },
  OBESITY_2: { min: 35, max: 40, label: 'სიმსუქნე II ხარისხი' },
  OBESITY_3: { min: 40, label: 'სიმსუქნე III ხარისხი' },
} as const;

export const ACTIVITY_MULTIPLIERS = {
  sedentary: 1.2,
  lightlyActive: 1.375,
  moderatelyActive: 1.55,
  veryActive: 1.725,
} as const;

export const DEFICIT_LEVELS = {
  conservative: 0.10,
  moderate: 0.15,
  maximum: 0.20,
} as const;

export const CALORIE_FLOOR = 1200;
export const MAX_DEFICIT_KCAL = 1000;

export const PROTEIN_PER_KG_LOW = 1.4;
export const PROTEIN_PER_KG_BASE = 1.6;
export const PROTEIN_PER_KG_HIGH = 2.0;
export const PROTEIN_MINIMUM_PER_KG = 0.8;

export const FAT_PERCENT_MIN = 0.25;
export const FAT_PERCENT_MAX = 0.30;
export const FAT_MINIMUM_PER_KG_IDEAL = 0.6;

export const FIBER_PER_1000_KCAL = 14;
export const FIBER_MIN = 25;
export const FIBER_MAX = 38;

export const BMI_REFERENCE = 22;
export const ADJUSTED_WEIGHT_FACTOR = 0.25;

export const AGE_MIN = 1;
export const AGE_MAX = 80;
export const AGE_ADULT = 18;
export const HEIGHT_MIN = 120;
export const HEIGHT_MAX = 230;
export const WEIGHT_MIN = 35;
export const WEIGHT_MAX = 300;

export const WAIST_HEIGHT_THRESHOLD = 0.5;
