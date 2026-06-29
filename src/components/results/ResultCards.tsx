'use client';

import type { CalculationResult } from '@/lib/health/types';

interface Props {
  result: CalculationResult;
}

function BMIColor(category: string): string {
  if (category.includes('ჯანსაღი')) return 'text-emerald-600';
  if (category.includes('ჭარბი')) return 'text-amber-600';
  if (category.includes('სიმსუქნე')) return 'text-red-600';
  if (category.includes('დაბალი')) return 'text-blue-600';
  return 'text-gray-700';
}

export default function ResultCards({ result }: Props) {
  const { bmi, waistHeight, bmr, tdee, calorieTarget, macros, safetyFlags } = result;

  const blockingFlags = safetyFlags.filter((f) => f.level === 'block');
  const warningFlags = safetyFlags.filter((f) => f.level === 'warn');
  const infoFlags = safetyFlags.filter((f) => f.level === 'info');

  return (
    <div className="space-y-4">
      <div className="text-xs text-gray-500 bg-gray-50 rounded-xl p-4 leading-relaxed">
        ეს კალკულატორი გაძლევს ზოგად რეკომენდაციას და არ ცვლის ექიმის, ენდოკრინოლოგის ან
        ნუტრიციოლოგის კონსულტაციას.
      </div>

      {blockingFlags.length > 0 && (
        <div className="space-y-2">
          {blockingFlags.map((flag) => (
            <div key={flag.id} className="bg-red-50 border border-red-200 rounded-xl p-4">
              <div className="flex items-start gap-2">
                <svg className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <p className="text-sm text-red-800">{flag.message}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {warningFlags.length > 0 && (
        <div className="space-y-2">
          {warningFlags.map((flag) => (
            <div key={flag.id} className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <div className="flex items-start gap-2">
                <svg className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <p className="text-sm text-amber-800">{flag.message}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {infoFlags.length > 0 && (
        <div className="space-y-2">
          {infoFlags.map((flag) => (
            <div key={flag.id} className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-start gap-2">
                <svg className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm text-blue-800">{flag.message}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div>
            <h3 className="font-medium text-gray-800">BMI</h3>
            <p className={`text-2xl font-bold ${BMIColor(bmi.category)}`}>{bmi.value}</p>
          </div>
        </div>
        <p className={`text-sm font-medium ${BMIColor(bmi.category)} mb-2`}>{bmi.category}</p>
        <p className="text-xs text-gray-500">{bmi.explanation}</p>
      </div>

      {waistHeight && (
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="font-medium text-gray-800 mb-2">წელი-სიმაღლის თანაფარდობა</h3>
          <p className="text-2xl font-bold text-gray-800 mb-1">{waistHeight.ratio}</p>
          <p className={`text-sm ${waistHeight.risk === 'increased' ? 'text-amber-600' : 'text-emerald-600'}`}>
            {waistHeight.message}
          </p>
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
            </svg>
          </div>
          <h3 className="font-medium text-gray-800">სავარაუდო დღიური კალორიები (TDEE)</h3>
        </div>
        {tdee.isRange ? (
          <p className="text-2xl font-bold text-gray-800">
            {tdee.female} – {tdee.male} კკალ
          </p>
        ) : (
          <p className="text-2xl font-bold text-gray-800">{tdee.value} კკალ</p>
        )}
        <p className="text-xs text-gray-500 mt-1">
          BMR: {bmr.isRange ? `${bmr.female} – ${bmr.male}` : bmr.value} კკალ
        </p>
      </div>

      {calorieTarget && result.canShowWeightLoss && (
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <h3 className="font-medium text-gray-800">რეკომენდებული კალორიები წონის კლებისთვის</h3>
          </div>
          {calorieTarget.isBelowFloor ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-sm text-red-800">{calorieTarget.warning}</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-3 gap-2 mb-3">
                <div className="text-center p-2 rounded-lg bg-emerald-50">
                  <p className="text-xs text-gray-500">კონსერვატიული</p>
                  <p className="font-bold text-emerald-700">{calorieTarget.conservative}</p>
                </div>
                <div className="text-center p-2 rounded-lg bg-emerald-100">
                  <p className="text-xs text-gray-500">ზომიერი</p>
                  <p className="font-bold text-emerald-800">{calorieTarget.moderate}</p>
                </div>
                <div className="text-center p-2 rounded-lg bg-amber-50">
                  <p className="text-xs text-gray-500">მაქსიმალური</p>
                  <p className="font-bold text-amber-700">{calorieTarget.maximum}</p>
                </div>
              </div>
              {calorieTarget.isDeficitCapped && calorieTarget.warning && (
                <p className="text-xs text-amber-600 mb-2">{calorieTarget.warning}</p>
              )}
              <p className="text-xs text-gray-500">
                თანდათანობითი წონის კლება უფრო უსაფრთხო და მდგრადია, ვიდრე სწრაფი. მიზნად
                დაისახეთ სხეულის წონის 0.5%-1% კლება კვირაში.
              </p>
            </>
          )}
        </div>
      )}

      {macros && (
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="font-medium text-gray-800 mb-4">მაკრონუტრიენტები</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-baseline mb-1">
                <span className="text-sm text-gray-600">ცილა</span>
                <span className="font-bold text-gray-800">{macros.proteinGrams}გ</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div
                  className="bg-red-400 h-2 rounded-full"
                  style={{ width: `${Math.min((macros.proteinGrams * 4 / (calorieTarget?.selected || (tdee.value || 2000))) * 100, 100)}%` }}
                />
              </div>
              <p className="text-xs text-gray-400 mt-1">
                დიაპაზონი: {macros.proteinRange.low}–{macros.proteinRange.high}გ
              </p>
            </div>
            <div>
              <div className="flex justify-between items-baseline mb-1">
                <span className="text-sm text-gray-600">ცხიმი</span>
                <span className="font-bold text-gray-800">{macros.fatGrams}გ</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div
                  className="bg-amber-400 h-2 rounded-full"
                  style={{ width: `${Math.min((macros.fatGrams * 9 / (calorieTarget?.selected || (tdee.value || 2000))) * 100, 100)}%` }}
                />
              </div>
              <p className="text-xs text-gray-400 mt-1">
                დიაპაზონი: {macros.fatRange.low}–{macros.fatRange.high}გ
              </p>
            </div>
            <div>
              <div className="flex justify-between items-baseline mb-1">
                <span className="text-sm text-gray-600">ნახშირწყლები</span>
                <span className="font-bold text-gray-800">{macros.carbGrams}გ</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div
                  className="bg-blue-400 h-2 rounded-full"
                  style={{ width: `${Math.min((macros.carbGrams * 4 / (calorieTarget?.selected || (tdee.value || 2000))) * 100, 100)}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between items-baseline mb-1">
                <span className="text-sm text-gray-600">ბოჭკოვანი</span>
                <span className="font-bold text-gray-800">{macros.fiberGrams}გ</span>
              </div>
              <p className="text-xs text-gray-400">
                დიაპაზონი: {macros.fiberRange.low}–{macros.fiberRange.high}გ
              </p>
            </div>
          </div>

          <div className="mt-4 space-y-2 text-xs text-gray-500">
            <p>ცილა ეხმარება დანაყრებას და კუნთოვანი მასის შენარჩუნებას, განსაკუთრებით მაშინ, როცა კალორიულ დეფიციტთან ერთად არის ძალოვანი ვარჯიში.</p>
            <p>ცხიმი საჭიროა ჰორმონების, უჯრედების, ნერვული სისტემის და ცხიმში ხსნადი ვიტამინების შეწოვისთვის.</p>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="font-medium text-gray-800 mb-3">კანის ჩამოშვება და სხეულის კომპოზიცია</h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          კანის ჩამოშვება დამოკიდებულია ასაკზე, გენეტიკაზე, რამდენი კილოგრამი იკლება,
          რამდენად სწრაფად იკლება და რამდენ ხანს იყო კანი გაჭიმული. ამის სრული პრევენცია
          გარანტირებული არ არის.
        </p>
        <div className="mt-3 space-y-1 text-xs text-gray-500">
          <p>• მოერიდეთ სწრაფ წონის კლებას</p>
          <p>• შეინარჩუნეთ საკმარისი ცილის მიღება</p>
          <p>• დაამატეთ ძალოვანი ვარჯიში კვირაში 2-4 ჯერ (თუ სამედიცინოდ ნებადართულია)</p>
          <p>• დალიეთ საკმარისი წყალი</p>
          <p>• იძინეთ 7-9 საათი</p>
          <p>• აკონტროლეთ წელის გარშემოწერილობა, ძალა და ენერგია — არა მხოლოდ სასწორი</p>
        </div>
      </div>
    </div>
  );
}
