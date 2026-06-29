import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <p className="text-xs text-gray-500 leading-relaxed mb-4">
          ეს კალკულატორი გაძლევს ზოგად რეკომენდაციას და არ ცვლის ექიმის,
          ენდოკრინოლოგის ან ნუტრიციოლოგის კონსულტაციას. თუ გაქვს დიაბეტი,
          პრე-დიაბეტი, გულ-სისხლძარღვთა დაავადება, თირკმლის/ღვიძლის პრობლემა,
          ორსულობა, ძუძუთი კვება ან იღებ მედიკამენტებს, კვების გეგმის
          დაწყებამდე გაიარე კონსულტაცია სპეციალისტთან.
        </p>
        <div className="flex flex-wrap gap-4 text-xs text-gray-400">
          <Link href="/disclaimer" className="hover:text-emerald-600 transition-colors">
            სამედიცინო დისკლეიმერი
          </Link>
          <Link href="/methodology" className="hover:text-emerald-600 transition-colors">
            მეთოდოლოგია
          </Link>
        </div>
      </div>
    </footer>
  );
}
