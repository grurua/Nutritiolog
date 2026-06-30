import type { MacroTargets, MealPlan, Meal, MealIngredient, FoodPreference } from '../health/types';
import { getAvailableFoods, type FoodItem } from './foodDatabase';

interface MealTemplate {
  name: string;
  proteinSource: string[];
  carbSource: string[];
  vegSource: string[];
  fatSource?: string[];
  fruitSource?: string[];
  explanation: string;
}

const MEAL_TEMPLATES: Record<string, MealTemplate[]> = {
  breakfast: [
    {
      name: 'საუზმე',
      proteinSource: ['egg', 'cottage_cheese', 'greek_yogurt'],
      carbSource: ['oats', 'whole_wheat_bread'],
      vegSource: ['cucumber', 'tomato'],
      fruitSource: ['apple', 'berries', 'banana'],
      explanation: 'ცილით მდიდარი საუზმე ხელს უწყობს დანაყრებას და ენერგიის სტაბილურ დონეს.',
    },
  ],
  lunch: [
    {
      name: 'სადილი',
      proteinSource: ['chicken_breast', 'turkey_breast', 'lean_beef', 'fish_white', 'lentils', 'beans'],
      carbSource: ['buckwheat', 'rice', 'potato'],
      vegSource: ['broccoli', 'cabbage', 'spinach', 'bell_pepper', 'tomato'],
      fatSource: ['olive_oil'],
      explanation: 'სრულფასოვანი სადილი ცილის, ნახშირწყლებისა და ბოსტნეულის კომბინაციით.',
    },
  ],
  dinner: [
    {
      name: 'ვახშამი',
      proteinSource: ['chicken_breast', 'fish_white', 'turkey_breast', 'egg', 'cottage_cheese'],
      carbSource: ['buckwheat', 'rice'],
      vegSource: ['cucumber', 'tomato', 'spinach', 'broccoli', 'greens'],
      fatSource: ['olive_oil'],
      explanation: 'მსუბუქი ვახშამი ცილით და ბოსტნეულით, კონტროლირებული ნახშირწყლებით.',
    },
  ],
  snack: [
    {
      name: 'წასახემსებელი',
      proteinSource: ['greek_yogurt', 'matsoni', 'cottage_cheese'],
      carbSource: [],
      vegSource: [],
      fruitSource: ['apple', 'berries', 'orange'],
      fatSource: ['walnuts', 'almonds'],
      explanation: 'მსუბუქი წასახემსებელი ცილითა და ბოჭკოვანით, რომელიც ეხმარება ენერგიის შენარჩუნებას.',
    },
  ],
};

const PORTION_LIMITS: Record<string, { min: number; max: number }> = {
  egg: { min: 100, max: 120 },
  chicken_breast: { min: 120, max: 200 },
  turkey_breast: { min: 120, max: 200 },
  lean_beef: { min: 100, max: 180 },
  fish_white: { min: 120, max: 200 },
  cottage_cheese: { min: 100, max: 200 },
  matsoni: { min: 100, max: 200 },
  greek_yogurt: { min: 100, max: 200 },
  lentils: { min: 100, max: 200 },
  beans: { min: 100, max: 200 },
  buckwheat: { min: 100, max: 200 },
  rice: { min: 100, max: 200 },
  potato: { min: 100, max: 200 },
  oats: { min: 100, max: 200 },
  whole_wheat_bread: { min: 40, max: 80 },
  cucumber: { min: 100, max: 200 },
  tomato: { min: 100, max: 200 },
  cabbage: { min: 100, max: 200 },
  broccoli: { min: 100, max: 200 },
  spinach: { min: 80, max: 150 },
  greens: { min: 30, max: 50 },
  bell_pepper: { min: 80, max: 150 },
  apple: { min: 100, max: 180 },
  berries: { min: 80, max: 150 },
  orange: { min: 100, max: 180 },
  banana: { min: 80, max: 130 },
  walnuts: { min: 15, max: 30 },
  almonds: { min: 15, max: 30 },
  olive_oil: { min: 5, max: 15 },
};

function getPortionLimits(foodName: string): { min: number; max: number } {
  return PORTION_LIMITS[foodName] ?? { min: 50, max: 200 };
}

function pickFood(candidates: string[], available: FoodItem[]): FoodItem | null {
  for (const name of candidates) {
    const found = available.find((f) => f.name === name);
    if (found) return found;
  }
  return null;
}

function createIngredient(food: FoodItem, grams: number): MealIngredient {
  const factor = grams / 100;
  return {
    name: food.nameKa,
    grams: Math.round(grams),
    calories: Math.round(food.per100g.calories * factor),
    protein: Math.round(food.per100g.protein * factor * 10) / 10,
    fat: Math.round(food.per100g.fat * factor * 10) / 10,
    carbs: Math.round(food.per100g.carbs * factor * 10) / 10,
    fiber: Math.round(food.per100g.fiber * factor * 10) / 10,
  };
}

function clampPortion(foodName: string, idealGrams: number): number {
  const limits = getPortionLimits(foodName);
  return Math.round(Math.min(limits.max, Math.max(limits.min, idealGrams)));
}

function buildMeal(
  template: MealTemplate,
  available: FoodItem[],
  targetCal: number,
  targetProtein: number,
  targetFat: number,
  targetCarbs: number
): Meal {
  const ingredients: MealIngredient[] = [];
  let remainCal = targetCal;
  let remainProtein = targetProtein;
  let remainFat = targetFat;
  let remainCarbs = targetCarbs;

  const protein = pickFood(template.proteinSource, available);
  if (protein) {
    let idealGrams: number;
    if (protein.per100g.protein > 5) {
      idealGrams = (targetProtein * 0.65 / protein.per100g.protein) * 100;
    } else {
      idealGrams = 150;
    }
    const grams = clampPortion(protein.name, idealGrams);
    const ing = createIngredient(protein, grams);
    ingredients.push(ing);
    remainCal -= ing.calories;
    remainProtein -= ing.protein;
    remainFat -= ing.fat;
    remainCarbs -= ing.carbs;
  }

  if (template.carbSource.length > 0 && remainCarbs > 10) {
    const carb = pickFood(template.carbSource, available);
    if (carb) {
      const idealGrams = (remainCarbs * 0.6 / Math.max(carb.per100g.carbs, 1)) * 100;
      const grams = clampPortion(carb.name, idealGrams);
      const ing = createIngredient(carb, grams);
      ingredients.push(ing);
      remainCal -= ing.calories;
      remainProtein -= ing.protein;
      remainFat -= ing.fat;
      remainCarbs -= ing.carbs;
    }
  }

  const veg = pickFood(template.vegSource, available);
  if (veg) {
    const grams = clampPortion(veg.name, 150);
    const ing = createIngredient(veg, grams);
    ingredients.push(ing);
    remainCal -= ing.calories;
    remainProtein -= ing.protein;
    remainFat -= ing.fat;
  }

  if (template.fatSource && remainFat > 3) {
    const fat = pickFood(template.fatSource, available);
    if (fat) {
      const idealGrams = (remainFat * 0.3 / Math.max(fat.per100g.fat, 1)) * 100;
      const grams = clampPortion(fat.name, idealGrams);
      const ing = createIngredient(fat, grams);
      ingredients.push(ing);
      remainCal -= ing.calories;
    }
  }

  if (template.fruitSource && remainCarbs > 5) {
    const fruit = pickFood(template.fruitSource, available);
    if (fruit) {
      const idealGrams = (remainCarbs * 0.4 / Math.max(fruit.per100g.carbs, 1)) * 100;
      const grams = clampPortion(fruit.name, idealGrams);
      const ing = createIngredient(fruit, grams);
      ingredients.push(ing);
    }
  }

  const totals = ingredients.reduce(
    (acc, i) => ({
      calories: acc.calories + i.calories,
      protein: acc.protein + i.protein,
      fat: acc.fat + i.fat,
      carbs: acc.carbs + i.carbs,
      fiber: acc.fiber + i.fiber,
    }),
    { calories: 0, protein: 0, fat: 0, carbs: 0, fiber: 0 }
  );

  return {
    name: template.name,
    ingredients,
    totalCalories: Math.round(totals.calories),
    totalProtein: Math.round(totals.protein * 10) / 10,
    totalFat: Math.round(totals.fat * 10) / 10,
    totalCarbs: Math.round(totals.carbs * 10) / 10,
    totalFiber: Math.round(totals.fiber * 10) / 10,
    explanation: template.explanation,
  };
}

export function generateMealPlan(
  macros: MacroTargets,
  totalCalories: number,
  mealsPerDay: number,
  preferences: FoodPreference[],
  digestiveIssues: boolean
): MealPlan {
  const available = getAvailableFoods(preferences, digestiveIssues);
  const notes: string[] = [];
  const meals: Meal[] = [];

  const mealSlots: string[] = [];
  if (mealsPerDay >= 2) {
    mealSlots.push('breakfast', 'lunch');
  }
  if (mealsPerDay >= 3) {
    mealSlots.push('dinner');
  }
  if (mealsPerDay >= 4) {
    mealSlots.push('snack');
  }
  if (mealsPerDay >= 5) {
    mealSlots.push('snack');
  }

  const mainMealCount = mealSlots.filter((s) => s !== 'snack').length;
  const snackCount = mealSlots.filter((s) => s === 'snack').length;

  const snackCalories = snackCount > 0 ? Math.round(totalCalories * 0.12) : 0;
  const mainCalories = Math.round((totalCalories - snackCalories * snackCount) / mainMealCount);

  const calPerSlot = (slot: string) => (slot === 'snack' ? snackCalories : mainCalories);

  const proteinPerMeal = macros.proteinGrams / mealSlots.length;
  const fatPerMeal = macros.fatGrams / mealSlots.length;
  const carbsPerMeal = macros.carbGrams / mealSlots.length;

  let snackIndex = 0;
  for (const slot of mealSlots) {
    const templates = MEAL_TEMPLATES[slot];
    const template = templates[0];

    const isSnack = slot === 'snack';
    const cal = calPerSlot(slot);
    const prot = isSnack ? proteinPerMeal * 0.6 : proteinPerMeal * 1.1;
    const fat = isSnack ? fatPerMeal * 0.6 : fatPerMeal * 1.1;
    const carbs = isSnack ? carbsPerMeal * 0.5 : carbsPerMeal * 1.1;

    let mealTemplate = { ...template };
    if (isSnack && snackIndex > 0) {
      mealTemplate = { ...template, name: 'წასახემსებელი 2' };
    }
    snackIndex += slot === 'snack' ? 1 : 0;

    meals.push(buildMeal(mealTemplate, available, cal, prot, fat, carbs));
  }

  if (digestiveIssues) {
    notes.push('საჭმლის მომნელებლის პრობლემების გათვალისწინებით, ბოჭკოვანი თანდათანობით გაზარდეთ.');
    notes.push('დალიეთ საკმარისი წყალი (მინიმუმ 1.5-2 ლიტრი დღეში).');
  }

  if (preferences.includes('vegetarian')) {
    notes.push('ვეგეტარიანული კვების დროს დარწმუნდით, რომ მიიღებთ საკმარის ცილას მრავალფეროვანი წყაროებიდან.');
  }

  const totals = meals.reduce(
    (acc, m) => ({
      calories: acc.calories + m.totalCalories,
      protein: acc.protein + m.totalProtein,
      fat: acc.fat + m.totalFat,
      carbs: acc.carbs + m.totalCarbs,
      fiber: acc.fiber + m.totalFiber,
    }),
    { calories: 0, protein: 0, fat: 0, carbs: 0, fiber: 0 }
  );

  return {
    meals,
    totalCalories: Math.round(totals.calories),
    totalProtein: Math.round(totals.protein * 10) / 10,
    totalFat: Math.round(totals.fat * 10) / 10,
    totalCarbs: Math.round(totals.carbs * 10) / 10,
    totalFiber: Math.round(totals.fiber * 10) / 10,
    notes,
  };
}
