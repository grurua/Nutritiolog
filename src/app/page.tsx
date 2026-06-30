import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <section className="px-4 py-16 md:py-24 max-w-3xl mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-6">
          გამოთვალე შენი კალორიები და მიიღე უსაფრთხო კვების გეგმა
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed mb-10 max-w-2xl mx-auto">
          შეიყვანე ასაკი, სიმაღლე, წონა და ჯანმრთელობის ძირითადი ინფორმაცია. სისტემა
          დაგითვლის რეკომენდაციულ კალორიებს, მაკროებს და დაგიგენერირებს დღიურ კვების
          გეგმას.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/calculator"
            className="inline-flex items-center justify-center px-8 py-4 bg-emerald-600 text-white rounded-xl font-medium text-lg hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200"
          >
            დაიწყე გამოთვლა
          </Link>
          <Link
            href="/methodology"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-emerald-700 rounded-xl font-medium text-lg border border-emerald-200 hover:bg-emerald-50 transition-colors"
          >
            როგორ ითვლის სისტემა?
          </Link>
        </div>
      </section>

      <section className="px-4 pb-16 max-w-4xl mx-auto">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-5 flex gap-4">
            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium text-gray-800 mb-1">არ სვამს დიაგნოზს</h3>
              <p className="text-sm text-gray-500">
                კალკულატორი გაძლევს ზოგად ინფორმაციას, არ ცვლის ექიმის კონსულტაციას.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5 flex gap-4">
            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium text-gray-800 mb-1">არ გთავაზობს ექსტრემალურ დიეტას</h3>
              <p className="text-sm text-gray-500">
                კალორიული დეფიციტი ზომიერია, მინიმალური ზღვარი დაცულია.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5 flex gap-4">
            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium text-gray-800 mb-1">
                ითვალისწინებს BMI-ს, ასაკს, აქტივობას და რისკებს
              </h3>
              <p className="text-sm text-gray-500">
                რეკომენდაციები პერსონალიზირებულია თქვენი მონაცემების მიხედვით.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5 flex gap-4">
            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium text-gray-800 mb-1">
                მაღალი რისკის დროს გირჩევს სპეციალისტს
              </h3>
              <p className="text-sm text-gray-500">
                დიაბეტის, ორსულობის, თირკმლის პრობლემებისა და სხვა შემთხვევებში გამოჩნდება
                სათანადო გაფრთხილება.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
