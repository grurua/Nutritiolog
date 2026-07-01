'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: session, status } = useSession();
  const userRole = (session?.user as { role?: string } | undefined)?.role;

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
          <Link href="/pricing" className="hover:text-emerald-600 transition-colors">
            გამოწერა
          </Link>
          <Link href="/methodology" className="hover:text-emerald-600 transition-colors">
            მეთოდოლოგია
          </Link>
          {userRole === 'admin' && (
            <Link href="/admin" className="hover:text-emerald-600 transition-colors font-medium">
              ადმინი
            </Link>
          )}
          {status === 'loading' ? (
            <div className="w-8 h-8 rounded-full bg-gray-100 animate-pulse" />
          ) : session ? (
            <div className="flex items-center gap-3">
              {session.user?.image ? (
                <Image
                  src={session.user.image}
                  alt=""
                  width={32}
                  height={32}
                  className="rounded-full"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 text-sm font-medium">
                  {session.user?.name?.[0] || '?'}
                </div>
              )}
              <button
                onClick={() => signOut()}
                className="text-gray-400 hover:text-gray-600 transition-colors text-xs"
              >
                გასვლა
              </button>
            </div>
          ) : (
            <Link
              href="/auth/signin"
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors"
            >
              შესვლა
            </Link>
          )}
        </div>
      </nav>

      {menuOpen && (
        <div className="md:hidden bg-white border-t border-emerald-100 px-4 py-3 space-y-3">
          <Link href="/calculator" className="block text-gray-600 hover:text-emerald-600" onClick={() => setMenuOpen(false)}>
            კალკულატორი
          </Link>
          <Link href="/pricing" className="block text-gray-600 hover:text-emerald-600" onClick={() => setMenuOpen(false)}>
            გამოწერა
          </Link>
          <Link href="/methodology" className="block text-gray-600 hover:text-emerald-600" onClick={() => setMenuOpen(false)}>
            მეთოდოლოგია
          </Link>
          <Link href="/disclaimer" className="block text-gray-600 hover:text-emerald-600" onClick={() => setMenuOpen(false)}>
            სამედიცინო დისკლეიმერი
          </Link>
          {userRole === 'admin' && (
            <Link href="/admin" className="block text-emerald-700 font-medium hover:text-emerald-600" onClick={() => setMenuOpen(false)}>
              ადმინ პანელი
            </Link>
          )}
          <div className="pt-2 border-t border-gray-100">
            {session ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {session.user?.image ? (
                    <Image
                      src={session.user.image}
                      alt=""
                      width={28}
                      height={28}
                      className="rounded-full"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 text-xs font-medium">
                      {session.user?.name?.[0] || '?'}
                    </div>
                  )}
                  <span className="text-sm text-gray-700">{session.user?.name}</span>
                </div>
                <button
                  onClick={() => { signOut(); setMenuOpen(false); }}
                  className="text-sm text-gray-400 hover:text-gray-600"
                >
                  გასვლა
                </button>
              </div>
            ) : (
              <Link
                href="/auth/signin"
                onClick={() => setMenuOpen(false)}
                className="block w-full py-2.5 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors text-center"
              >
                შესვლა
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
