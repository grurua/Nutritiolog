'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

const NAV_ITEMS = [
  { href: '/admin', label: 'დეშბორდი', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { href: '/admin/users', label: 'მომხმარებლები', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
  { href: '/admin/stats', label: 'სტატისტიკა', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { status } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50">
      <div className="md:hidden sticky top-[57px] z-40 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-gray-900">ადმინ პანელი</h2>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-1.5 text-gray-500 hover:text-gray-700"
          aria-label="მენიუ"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {sidebarOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      <div className="flex">
        <aside
          className={`${
            sidebarOpen ? 'block' : 'hidden'
          } md:block fixed md:sticky top-[105px] md:top-[57px] left-0 w-64 bg-white border-r border-gray-200 h-[calc(100vh-105px)] md:h-[calc(100vh-57px)] z-30 overflow-y-auto`}
        >
          <div className="hidden md:block p-4 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-gray-900">ადმინ პანელი</h2>
          </div>
          <nav className="p-2 space-y-1">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                  </svg>
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="p-4 mt-auto border-t border-gray-100">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              მთავარ გვერდზე
            </Link>
          </div>
        </aside>

        {sidebarOpen && (
          <div
            className="md:hidden fixed inset-0 bg-black/20 z-20"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <main className="flex-1 p-4 md:p-6 min-w-0">{children}</main>
      </div>
    </div>
  );
}
