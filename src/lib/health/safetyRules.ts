import { AGE_ADULT } from './healthConstants';
import { calculateBMI } from './bmi';
import type { UserProfile, HealthScreening, SafetyFlag } from './types';

export function evaluateSafetyFlags(
  profile: UserProfile,
  screening: HealthScreening
): SafetyFlag[] {
  const flags: SafetyFlag[] = [];

  if (profile.age < AGE_ADULT) {
    flags.push({
      id: 'under18',
      level: 'block',
      message:
        '18 წლამდე კვების გეგმა უნდა შედგეს პედიატრთან ან ბავშვთა ნუტრიციოლოგთან ერთად. ზრდასრულების BMI და კალორიული ფორმულები ბავშვებზე პირდაპირ არ გამოიყენება.',
      blockPlan: true,
      blockWeightLoss: true,
    });
  }

  if (profile.age > 80) {
    flags.push({
      id: 'over80',
      level: 'warn',
      message:
        '80 წელზე მეტი ასაკის შემთხვევაში რეკომენდებულია პროფესიონალური კონსულტაცია კვების გეგმის დაწყებამდე.',
      blockPlan: false,
      blockWeightLoss: false,
    });
  }

  if (screening.pregnantOrBreastfeeding) {
    flags.push({
      id: 'pregnant',
      level: 'block',
      message:
        'ორსულობის ან ძუძუთი კვების პერიოდში კალორიების შეზღუდვა უნდა მოხდეს მხოლოდ ექიმის რეკომენდაციით.',
      blockPlan: true,
      blockWeightLoss: true,
    });
  }

  if (screening.eatingDisorderHistory) {
    flags.push({
      id: 'eatingDisorder',
      level: 'block',
      message:
        'კვების აშლილობის ისტორიის არსებობისას კალორიულ შეზღუდვას შეიძლება უარყოფითი გავლენა ჰქონდეს ფსიქიკურ ჯანმრთელობაზე. გირჩევთ მიმართოთ ფსიქოლოგს ან ნუტრიციოლოგს, რომელსაც აქვს გამოცდილება ამ სფეროში.',
      blockPlan: true,
      blockWeightLoss: true,
    });
  }

  const bmi = calculateBMI(profile.weightKg, profile.heightCm);

  if (screening.kidneyDisease) {
    flags.push({
      id: 'kidney',
      level: 'warn',
      message:
        'თირკმლის დაავადების შემთხვევაში ცილის რაოდენობა და კვების გეგმა ინდივიდუალურად უნდა შეირჩეს ნეფროლოგთან ან ნუტრიციოლოგთან კონსულტაციით.',
      blockPlan: true,
      blockWeightLoss: false,
    });
  }

  if (screening.liverDisease) {
    flags.push({
      id: 'liver',
      level: 'warn',
      message:
        'ღვიძლის დაავადების შემთხვევაში კვების გეგმა უნდა შეთანხმდეს ექიმთან.',
      blockPlan: true,
      blockWeightLoss: false,
    });
  }

  if (screening.diabetes && screening.medicationAffectingWeight) {
    flags.push({
      id: 'diabetesMedication',
      level: 'warn',
      message:
        'დიაბეტით და მედიკამენტებით მკურნალობისას კვების ცვლილება უნდა შეთანხმდეს ენდოკრინოლოგთან. კალორიების შემცირებამ შეიძლება გამოიწვიოს ჰიპოგლიკემია.',
      blockPlan: true,
      blockWeightLoss: false,
    });
  } else if (screening.diabetes) {
    flags.push({
      id: 'diabetes',
      level: 'warn',
      message:
        'დიაბეტის შემთხვევაში ნახშირწყლების განაწილება და კვების გეგმა უნდა შეირჩეს ინდივიდუალურად. რეკომენდებულია ექიმთან კონსულტაცია.',
      blockPlan: false,
      blockWeightLoss: false,
    });
  }

  if (screening.prediabetes) {
    flags.push({
      id: 'prediabetes',
      level: 'info',
      message:
        'პრე-დიაბეტის შემთხვევაში არჩევანი უნდა გაკეთდეს მაღალბოჭკოიან, დაბალი გლიკემიური ინდექსის პროდუქტებზე. რეკომენდებულია ექიმთან კონსულტაცია.',
      blockPlan: false,
      blockWeightLoss: false,
    });
  }

  if (screening.cardiovascularDisease) {
    flags.push({
      id: 'cardiovascular',
      level: 'warn',
      message:
        'გულ-სისხლძარღვთა დაავადების შემთხვევაში ინტენსიური ვარჯიშის დაწყებამდე საჭიროა ექიმის ნებართვა. ყურადღება მიაქციეთ მარილის რაოდენობას და უპირატესობა მიანიჭეთ არაგაჯერებულ ცხიმებს.',
      blockPlan: false,
      blockWeightLoss: false,
    });
  }

  if (screening.highBloodPressure) {
    flags.push({
      id: 'bloodPressure',
      level: 'info',
      message:
        'მაღალი წნევის შემთხვევაში ყურადღება მიაქციეთ მარილის მოხმარებას და ინტენსიური ვარჯიში შეათანხმეთ ექიმთან.',
      blockPlan: false,
      blockWeightLoss: false,
    });
  }

  if (screening.medicationAffectingWeight && !screening.diabetes) {
    flags.push({
      id: 'medication',
      level: 'warn',
      message:
        'მედიკამენტების მიღებისას კვების გეგმის ცვლილება უნდა შეთანხმდეს ექიმთან.',
      blockPlan: false,
      blockWeightLoss: false,
    });
  }

  if (screening.digestiveIssues) {
    flags.push({
      id: 'digestive',
      level: 'info',
      message:
        'საჭმლის მომნელებლის პრობლემების შემთხვევაში ბოჭკოვანი თანდათანობით უნდა გაიზარდოს. მოერიდეთ ძალიან ცხარე, ცხიმიან და შემწვარ კერძებს. დალიეთ საკმარისი წყალი.',
      blockPlan: false,
      blockWeightLoss: false,
    });
  }

  if (bmi >= 40) {
    flags.push({
      id: 'veryHighBMI',
      level: 'warn',
      message:
        'ძალიან მაღალი BMI-ის შემთხვევაში კვების გეგმის დაწყება რეკომენდებულია ექიმის ან ნუტრიციოლოგის მეთვალყურეობით.',
      blockPlan: true,
      blockWeightLoss: false,
    });
  }

  return flags;
}

export function canGenerateMealPlan(flags: SafetyFlag[]): boolean {
  return !flags.some((f) => f.blockPlan);
}

export function canShowWeightLoss(flags: SafetyFlag[]): boolean {
  return !flags.some((f) => f.blockWeightLoss);
}
