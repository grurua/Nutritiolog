export type Sex = 'male' | 'female' | 'preferNotToSay';

export type Goal = 'loseWeight' | 'maintainWeight' | 'healthierHabits';

export type ActivityLevel = 'sedentary' | 'lightlyActive' | 'moderatelyActive' | 'veryActive';

export type TrainingType = 'none' | 'walking' | 'strength' | 'cardio' | 'mixed';

export type FoodPreference =
  | 'omnivore'
  | 'noPork'
  | 'vegetarian'
  | 'noDairy'
  | 'lowBudget'
  | 'georgianFriendly';

export interface UserProfile {
  age: number;
  sex: Sex;
  heightCm: number;
  weightKg: number;
  goalWeightKg?: number;
  goal: Goal;
  activityLevel: ActivityLevel;
  trainingType: TrainingType;
  mealsPerDay: number;
  foodPreferences: FoodPreference[];
}

export interface HealthScreening {
  diabetes: boolean;
  prediabetes: boolean;
  highBloodPressure: boolean;
  cardiovascularDisease: boolean;
  kidneyDisease: boolean;
  liverDisease: boolean;
  pregnantOrBreastfeeding: boolean;
  eatingDisorderHistory: boolean;
  medicationAffectingWeight: boolean;
  digestiveIssues: boolean;
  waistCm?: number;
}

export type SafetyFlagLevel = 'block' | 'warn' | 'info';

export interface SafetyFlag {
  id: string;
  level: SafetyFlagLevel;
  message: string;
  blockPlan: boolean;
  blockWeightLoss: boolean;
}

export interface BMIResult {
  value: number;
  category: string;
  explanation: string;
}

export interface WaistHeightResult {
  ratio: number;
  risk: 'lower' | 'increased';
  message: string;
}

export interface BMRResult {
  male?: number;
  female?: number;
  value?: number;
  isRange: boolean;
}

export interface TDEEResult {
  male?: number;
  female?: number;
  value?: number;
  isRange: boolean;
}

export interface CalorieTarget {
  conservative: number;
  moderate: number;
  maximum: number;
  selected: number;
  deficit: number;
  isBelowFloor: boolean;
  isDeficitCapped: boolean;
  warning?: string;
}

export interface MacroTargets {
  proteinGrams: number;
  proteinRange: { low: number; high: number };
  fatGrams: number;
  fatRange: { low: number; high: number };
  carbGrams: number;
  fiberGrams: number;
  fiberRange: { low: number; high: number };
}

export interface CalculationResult {
  bmi: BMIResult;
  waistHeight?: WaistHeightResult;
  bmr: BMRResult;
  tdee: TDEEResult;
  calorieTarget?: CalorieTarget;
  macros?: MacroTargets;
  safetyFlags: SafetyFlag[];
  canGeneratePlan: boolean;
  canShowWeightLoss: boolean;
}

export interface MealIngredient {
  name: string;
  grams: number;
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
  fiber: number;
}

export interface Meal {
  name: string;
  ingredients: MealIngredient[];
  totalCalories: number;
  totalProtein: number;
  totalFat: number;
  totalCarbs: number;
  totalFiber: number;
  explanation: string;
}

export interface MealPlan {
  meals: Meal[];
  totalCalories: number;
  totalProtein: number;
  totalFat: number;
  totalCarbs: number;
  totalFiber: number;
  notes: string[];
}
