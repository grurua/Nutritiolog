export default function MethodologyPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">მეთოდოლოგია</h1>

      <div className="space-y-8 text-gray-700">
        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-3">რა არის BMI?</h2>
          <p className="text-sm leading-relaxed">
            სხეულის მასის ინდექსი (BMI) არის წონისა და სიმაღლის თანაფარდობაზე
            დაფუძნებული სკრინინგის ინსტრუმენტი. ის გამოითვლება ფორმულით: BMI = წონა
            (კგ) / სიმაღლე (მ)². BMI არ ასხვავებს კუნთს, ცხიმს და ძვალს, ამიტომ ის
            არის მხოლოდ საწყისი მაჩვენებელი და არა დიაგნოზი.
          </p>
          <p className="text-sm leading-relaxed mt-2">
            BMI კატეგორიები (CDC): ნორმაზე დაბალი (&lt;18.5), ჯანსაღი (18.5–24.9),
            ჭარბი წონა (25–29.9), სიმსუქნე I (30–34.9), სიმსუქნე II (35–39.9),
            სიმსუქნე III (≥40).
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-3">წელი-სიმაღლის თანაფარდობა</h2>
          <p className="text-sm leading-relaxed">
            წელის გარშემოწერილობისა და სიმაღლის თანაფარდობა (WHtR) დამატებითი სკრინინგის
            ინსტრუმენტია ცენტრალური ადიპოზიტეტის შესაფასებლად. თანაფარდობა ≥0.5
            მიუთითებს მომატებულ რისკზე. ეს არ არის დიაგნოზი.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-3">რა არის BMR?</h2>
          <p className="text-sm leading-relaxed">
            ბაზალური მეტაბოლიზმის სიჩქარე (BMR) არის კალორიების რაოდენობა, რომელსაც
            ორგანიზმი ხარჯავს სრული მოსვენების დროს ძირითადი ფუნქციების
            შესანარჩუნებლად. ჩვენ ვიყენებთ Mifflin-St Jeor განტოლებას:
          </p>
          <div className="bg-gray-50 rounded-lg p-4 mt-2 text-sm font-mono">
            <p>მამრობითი: BMR = 10 × წონა + 6.25 × სიმაღლე - 5 × ასაკი + 5</p>
            <p>მდედრობითი: BMR = 10 × წონა + 6.25 × სიმაღლე - 5 × ასაკი - 161</p>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-3">რა არის TDEE?</h2>
          <p className="text-sm leading-relaxed">
            დღიური მთლიანი ენერგიის ხარჯვა (TDEE) ითვლის რამდენ კალორიას ხარჯავს
            ორგანიზმი აქტივობის გათვალისწინებით. TDEE = BMR × აქტივობის კოეფიციენტი.
          </p>
          <div className="bg-gray-50 rounded-lg p-4 mt-2 text-sm">
            <p>მჯდომარე: ×1.2</p>
            <p>ოდნავ აქტიური: ×1.375</p>
            <p>საშუალოდ აქტიური: ×1.55</p>
            <p>ძალიან აქტიური: ×1.725</p>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            რატომ უნდა იყოს კალორიული დეფიციტი ზომიერი?
          </h2>
          <p className="text-sm leading-relaxed">
            ძალიან დაბალი კალორიული მიღება შეიძლება გამოიწვიოს კუნთოვანი მასის დაკარგვა,
            მეტაბოლიზმის შენელება, ჰორმონული დარღვევები, საკვები ნივთიერებების
            დეფიციტი და ფსიქოლოგიური პრობლემები. ჩვენ ვიყენებთ TDEE-ს 10%-20%
            დეფიციტს და არასდროს ვრეკომენდებთ 1200 კკალ-ზე ნაკლებს ან 1000 კკალ-ზე
            მეტ დეფიციტს.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-3">რატომ არის ცილა მნიშვნელოვანი?</h2>
          <p className="text-sm leading-relaxed">
            ცილა ხელს უწყობს კუნთოვანი მასის შენარჩუნებას კალორიული დეფიციტის დროს,
            ზრდის დანაყრების შეგრძნებას და ხელს უწყობს სხეულის კომპოზიციის
            გაუმჯობესებას. კალორიული დეფიციტის დროს რეკომენდებულია 1.4-2.0 გ/კგ ცილა.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-3">რატომ არის ბოჭკოვანი მნიშვნელოვანი?</h2>
          <p className="text-sm leading-relaxed">
            ბოჭკოვანი ხელს უწყობს დანაყრებას, საჭმლის მონელების რეგულარობას, სისხლში
            შაქრის სტაბილურობას და ნაწლავის ჯანმრთელობას. რეკომენდებულია 14 გ/1000
            კკალ, ანუ დღეში 25-38 გ უმეტესი ზრდასრულებისთვის.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            დიაბეტი და პრე-დიაბეტი
          </h2>
          <p className="text-sm leading-relaxed">
            დიაბეტისა და პრე-დიაბეტის შემთხვევაში კვებითი მიდგომა ინდივიდუალური უნდა
            იყოს. არ არსებობს ერთი უნივერსალური ნახშირწყლის რეჟიმი. მნიშვნელოვანია
            მაღალბოჭკოიანი, დაბალი გლიკემიური ინდექსის პროდუქტების არჩევა,
            ნახშირწყლების თანაბარი განაწილება კვებებს შორის, და ექიმთან რეგულარული
            კონსულტაცია. ინსულინის ან შაქრის დამწევი მედიკამენტების მიღებისას კალორიების
            შემცირებამ შეიძლება გამოიწვიოს ჰიპოგლიკემია.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            რატომ ვურჩევთ სპეციალისტს მაღალი რისკის შემთხვევაში?
          </h2>
          <p className="text-sm leading-relaxed">
            ქრონიკული დაავადებების, მედიკამენტების, ორსულობისა და სხვა სამედიცინო
            მდგომარეობების დროს კვების ცვლილებამ შეიძლება გამოიწვიოს გვერდითი ეფექტები
            ან გართულებები. ამ შემთხვევებში ალგორითმული მიდგომა არ არის საკმარისი და
            საჭიროა ინდივიდუალური სამედიცინო შეფასება.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-3">წყაროები</h2>
          <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
            <li>
              CDC — Body Mass Index (BMI) categories and healthy weight guidance
            </li>
            <li>
              CDC — Losing Weight: Getting Started — safe weight loss recommendations
            </li>
            <li>
              NIDDK (National Institute of Diabetes and Digestive and Kidney Diseases) —
              safe weight-loss program guidance
            </li>
            <li>
              Mifflin MD, St Jeor ST, et al. &quot;A new predictive equation for
              resting energy expenditure in healthy individuals.&quot; Am J Clin Nutr.
              1990;51(2):241-247
            </li>
            <li>
              Dietary Reference Intakes (DRI) — macronutrient and fiber recommendations
              (National Academies of Sciences, Engineering, and Medicine)
            </li>
            <li>
              American Diabetes Association — Standards of Medical Care in Diabetes,
              nutrition therapy recommendations
            </li>
            <li>
              NICE (National Institute for Health and Care Excellence) — BMI and
              waist-to-height ratio guidance
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
