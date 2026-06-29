import type { FoodPreference } from '../health/types';

export interface FoodItem {
  name: string;
  nameKa: string;
  per100g: {
    calories: number;
    protein: number;
    fat: number;
    carbs: number;
    fiber: number;
  };
  category: 'protein' | 'carb' | 'fat' | 'vegetable' | 'fruit' | 'dairy' | 'grain';
  excludeFor?: FoodPreference[];
  spicy?: boolean;
  highFat?: boolean;
}

export const FOOD_DATABASE: FoodItem[] = [
  { name: 'egg', nameKa: 'კვერცხი', per100g: { calories: 155, protein: 13, fat: 11, carbs: 1.1, fiber: 0 }, category: 'protein' },
  { name: 'chicken_breast', nameKa: 'ქათმის მკერდი', per100g: { calories: 165, protein: 31, fat: 3.6, carbs: 0, fiber: 0 }, category: 'protein' },
  { name: 'turkey_breast', nameKa: 'ინდაურის მკერდი', per100g: { calories: 135, protein: 30, fat: 1, carbs: 0, fiber: 0 }, category: 'protein' },
  { name: 'lean_beef', nameKa: 'მჭლე ხორცი (საქონლის)', per100g: { calories: 250, protein: 26, fat: 15, carbs: 0, fiber: 0 }, category: 'protein' },
  { name: 'fish_white', nameKa: 'თეთრი თევზი', per100g: { calories: 96, protein: 20, fat: 1.7, carbs: 0, fiber: 0 }, category: 'protein' },
  { name: 'cottage_cheese', nameKa: 'ხაჭო', per100g: { calories: 98, protein: 11, fat: 4.3, carbs: 3.4, fiber: 0 }, category: 'dairy', excludeFor: ['noDairy'] },
  { name: 'matsoni', nameKa: 'მაწონი (უშაქრო)', per100g: { calories: 56, protein: 3.5, fat: 3.3, carbs: 4, fiber: 0 }, category: 'dairy', excludeFor: ['noDairy'] },
  { name: 'greek_yogurt', nameKa: 'ბერძნული იოგურტი', per100g: { calories: 59, protein: 10, fat: 0.7, carbs: 3.6, fiber: 0 }, category: 'dairy', excludeFor: ['noDairy'] },
  { name: 'lentils', nameKa: 'ოსპი', per100g: { calories: 116, protein: 9, fat: 0.4, carbs: 20, fiber: 7.9 }, category: 'grain' },
  { name: 'beans', nameKa: 'ლობიო', per100g: { calories: 127, protein: 8.7, fat: 0.5, carbs: 22.8, fiber: 6.4 }, category: 'grain' },
  { name: 'buckwheat', nameKa: 'წიწიბურა', per100g: { calories: 92, protein: 3.4, fat: 0.6, carbs: 19.9, fiber: 2.7 }, category: 'grain' },
  { name: 'rice', nameKa: 'ბრინჯი', per100g: { calories: 130, protein: 2.7, fat: 0.3, carbs: 28, fiber: 0.4 }, category: 'grain' },
  { name: 'potato', nameKa: 'კარტოფილი (მოხარშული)', per100g: { calories: 77, protein: 2, fat: 0.1, carbs: 17, fiber: 2.2 }, category: 'carb' },
  { name: 'oats', nameKa: 'შვრიის ფაფა', per100g: { calories: 68, protein: 2.5, fat: 1.4, carbs: 12, fiber: 1.7 }, category: 'grain' },
  { name: 'whole_wheat_bread', nameKa: 'მთლიანმარცვლეული პური', per100g: { calories: 247, protein: 13, fat: 3.4, carbs: 41, fiber: 6.8 }, category: 'grain' },
  { name: 'cucumber', nameKa: 'კიტრი', per100g: { calories: 15, protein: 0.7, fat: 0.1, carbs: 3.6, fiber: 0.5 }, category: 'vegetable' },
  { name: 'tomato', nameKa: 'პამიდორი', per100g: { calories: 18, protein: 0.9, fat: 0.2, carbs: 3.9, fiber: 1.2 }, category: 'vegetable' },
  { name: 'cabbage', nameKa: 'კომბოსტო', per100g: { calories: 25, protein: 1.3, fat: 0.1, carbs: 5.8, fiber: 2.5 }, category: 'vegetable' },
  { name: 'broccoli', nameKa: 'ბროკოლი', per100g: { calories: 34, protein: 2.8, fat: 0.4, carbs: 6.6, fiber: 2.6 }, category: 'vegetable' },
  { name: 'spinach', nameKa: 'ისპანახი', per100g: { calories: 23, protein: 2.9, fat: 0.4, carbs: 3.6, fiber: 2.2 }, category: 'vegetable' },
  { name: 'greens', nameKa: 'მწვანილი (ქინძი, ოხრახუში)', per100g: { calories: 23, protein: 2.1, fat: 0.5, carbs: 3.7, fiber: 2.8 }, category: 'vegetable' },
  { name: 'bell_pepper', nameKa: 'წიწაკა (ტკბილი)', per100g: { calories: 31, protein: 1, fat: 0.3, carbs: 6, fiber: 2.1 }, category: 'vegetable' },
  { name: 'apple', nameKa: 'ვაშლი', per100g: { calories: 52, protein: 0.3, fat: 0.2, carbs: 14, fiber: 2.4 }, category: 'fruit' },
  { name: 'berries', nameKa: 'კენკრა', per100g: { calories: 57, protein: 0.7, fat: 0.3, carbs: 14, fiber: 2.4 }, category: 'fruit' },
  { name: 'orange', nameKa: 'ფორთოხალი', per100g: { calories: 47, protein: 0.9, fat: 0.1, carbs: 12, fiber: 2.4 }, category: 'fruit' },
  { name: 'banana', nameKa: 'ბანანი', per100g: { calories: 89, protein: 1.1, fat: 0.3, carbs: 23, fiber: 2.6 }, category: 'fruit' },
  { name: 'walnuts', nameKa: 'ნიგოზი', per100g: { calories: 654, protein: 15, fat: 65, carbs: 14, fiber: 6.7 }, category: 'fat' },
  { name: 'almonds', nameKa: 'ნუში', per100g: { calories: 579, protein: 21, fat: 50, carbs: 22, fiber: 12.5 }, category: 'fat' },
  { name: 'olive_oil', nameKa: 'ზეითუნის ზეთი', per100g: { calories: 884, protein: 0, fat: 100, carbs: 0, fiber: 0 }, category: 'fat' },
];

export function getAvailableFoods(
  preferences: FoodPreference[],
  digestiveIssues: boolean
): FoodItem[] {
  return FOOD_DATABASE.filter((food) => {
    if (food.excludeFor) {
      for (const pref of preferences) {
        if (food.excludeFor.includes(pref)) return false;
      }
    }
    if (preferences.includes('vegetarian') && ['protein'].includes(food.category)) {
      if (!['egg', 'cottage_cheese', 'matsoni', 'greek_yogurt', 'lentils', 'beans'].includes(food.name)) {
        return false;
      }
    }
    if (preferences.includes('noPork')) {
      // no pork items in database currently
    }
    if (digestiveIssues && food.spicy) return false;
    if (digestiveIssues && food.highFat) return false;
    return true;
  });
}
