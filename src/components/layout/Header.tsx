'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-emerald-100 sticky top-0 z-50">
      <nav className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-emerald-700">
          ნუტრიციოლოგი
        </Link>

        <button
          className="md:hidden p-2 text-emerald-700"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="მენიუ"
          aria-expanded={menuOpen}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        <div className="hidden md:flex items-center gap-6 text-sm text-gray-600">
          <Link href="/calculator" className="hover:text-emerald-600 transition-colors">
            კალკულატორი
          </Link>
          <Link href="/methodology" className="hover:text-emerald-600 transition-colors">
            მეთოდოლოგია
          </Link>
          <Link href="/disclaimer" className="hover:text-emerald-600 transition-colors">
            სამედიცინო დისკლეიმერი
          </Link>
        </div>
      </nav>

      {menuOpen && (
        <div className="md:hidden bg-white border-t border-emerald-100 px-4 py-3 space-y-3">
          <Link
            href="/calculator"
            className="block text-gray-600 hover:text-emerald-600"
            onClick={() => setMenuOpen(false)}
          >
            კალკულატორი
          </Link>
          <Link
            href="/methodology"
            className="block text-gray-600 hover:text-emerald-600"
            onClick={() => setMenuOpen(false)}
          >
            მეთოდოლოგია
          </Link>
          <Link
            href="/disclaimer"
            className="block text-gray-600 hover:text-emerald-600"
            onClick={() => setMenuOpen(false)}
          >
            სამედიცინო დისკლეიმერი
          </Link>
        </div>
      )}
    </header>
  );
}
