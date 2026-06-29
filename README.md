# ნუტრიციოლოგი — Georgian Nutrition & Weight-Loss Calculator

A production-quality, responsive, health-focused nutrition calculator website built with Next.js, React, TypeScript, and Tailwind CSS. The entire UI is in Georgian language.

## Features

- **BMI Analysis** — Calculates BMI with CDC categories, explains limitations
- **Calorie Estimation** — Mifflin-St Jeor BMR → TDEE with activity multipliers
- **Safe Weight-Loss Targets** — Conservative/moderate/maximum deficit levels with floor (1200 kcal) and cap (1000 kcal deficit)
- **Macro Targets** — Protein (adjusted for BMI), fat, carbs, fiber
- **Personalized Meal Plan** — Georgian-friendly food database, respects dietary preferences
- **Health Safety Screening** — Blocks or warns for minors, pregnancy, eating disorders, kidney/liver disease, diabetes with medication, very high BMI
- **Waist-to-Height Ratio** — Optional central adiposity screening
- **Mobile-first responsive design** — Works on phones, tablets, and desktops

## Safety Philosophy

This app prioritizes safety over conversion:
- Never recommends extreme calorie restriction, fasting, detox, or keto as universal solutions
- Never diagnoses diseases or replaces medical consultation
- Blocks weight-loss plans for minors (<18), pregnant/breastfeeding users, and users with eating disorder history
- Warns and recommends specialists for diabetes with medication, kidney/liver disease, very high BMI

## Tech Stack

- **Next.js 16** (App Router)
- **React 19** + **TypeScript**
- **Tailwind CSS 4**
- All calculations run client-side — no data is sent to any server

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Testing

```bash
npm test
```

28 unit tests covering BMI, BMR, TDEE, calorie safety, macros, and all safety rules.

## Project Structure

```
src/
├── app/                    # Next.js pages
│   ├── page.tsx            # Landing page
│   ├── calculator/         # Multi-step calculator form
│   ├── results/            # Calculation results
│   ├── meal-plan/          # Generated meal plan
│   ├── disclaimer/         # Medical disclaimer
│   └── methodology/        # How the system calculates
├── components/
│   ├── forms/              # Step1, Step2, Step3, StepIndicator
│   ├── results/            # ResultCards, MealPlanDisplay
│   └── layout/             # Header, Footer
├── lib/
│   ├── health/
│   │   ├── types.ts        # TypeScript types
│   │   ├── healthConstants.ts # All constants (no magic numbers)
│   │   ├── bmi.ts          # BMI calculation & categories
│   │   ├── calories.ts     # BMR, TDEE, calorie targets
│   │   ├── macros.ts       # Protein, fat, carb, fiber
│   │   ├── safetyRules.ts  # Safety flag evaluation
│   │   └── calculations.ts # Orchestrator
│   ├── meal-plan/
│   │   ├── foodDatabase.ts # Georgian food items with macros
│   │   └── mealGenerator.ts # Meal plan generation
│   └── context.tsx         # React context for state
└── __tests__/
    └── health.test.ts      # Unit tests
```

## Methodology Sources

- CDC BMI categories and healthy weight guidance
- CDC safe weight loss recommendations
- NIDDK safe weight-loss program guidance
- Mifflin-St Jeor equation (Am J Clin Nutr. 1990)
- Dietary Reference Intakes for macronutrients and fiber
- American Diabetes Association nutrition therapy guidance
- NICE guidance on BMI and waist-to-height ratio
