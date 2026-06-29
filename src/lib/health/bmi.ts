import { BMI_CATEGORIES, WAIST_HEIGHT_THRESHOLD } from './healthConstants';
import type { BMIResult, WaistHeightResult } from './types';

export function calculateBMI(weightKg: number, heightCm: number): number {
  const heightM = heightCm / 100;
  return weightKg / (heightM * heightM);
}

export function getBMICategory(bmi: number): string {
  if (bmi < BMI_CATEGORIES.UNDERWEIGHT.max) return BMI_CATEGORIES.UNDERWEIGHT.label;
  if (bmi < BMI_CATEGORIES.HEALTHY.max) return BMI_CATEGORIES.HEALTHY.label;
  if (bmi < BMI_CATEGORIES.OVERWEIGHT.max) return BMI_CATEGORIES.OVERWEIGHT.label;
  if (bmi < BMI_CATEGORIES.OBESITY_1.max) return BMI_CATEGORIES.OBESITY_1.label;
  if (bmi < BMI_CATEGORIES.OBESITY_2.max) return BMI_CATEGORIES.OBESITY_2.label;
  return BMI_CATEGORIES.OBESITY_3.label;
}

export function getBMIResult(weightKg: number, heightCm: number): BMIResult {
  const bmi = calculateBMI(weightKg, heightCm);
  return {
    value: Math.round(bmi * 10) / 10,
    category: getBMICategory(bmi),
    explanation:
      'BMI არის საწყისი სკრინინგის მაჩვენებელი და არა დიაგნოზი. ის არ ასხვავებს კუნთს, ცხიმს და ძვალს, ამიტომ შედეგი უნდა შეფასდეს სხვა ფაქტორებთან ერთად.',
  };
}

export function getWaistHeightResult(
  waistCm: number,
  heightCm: number
): WaistHeightResult {
  const ratio = waistCm / heightCm;
  const isIncreased = ratio >= WAIST_HEIGHT_THRESHOLD;
  return {
    ratio: Math.round(ratio * 100) / 100,
    risk: isIncreased ? 'increased' : 'lower',
    message: isIncreased
      ? 'წელის და სიმაღლის თანაფარდობა მიუთითებს ცენტრალური ადიპოზიტეტის მომატებულ რისკზე. რეკომენდებულია პროფესიონალური შეფასება.'
      : 'წელის და სიმაღლის თანაფარდობა ნორმის ფარგლებშია.',
  };
}
