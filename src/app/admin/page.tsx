'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface Stats {
  totalUsers: number;
  todayUsers: number;
  totalCalculations: number;
  activeUsers: number;
}

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin?callbackUrl=/admin');
      return;
    }
    if (status === 'authenticated') {
      fetch('/api/admin?type=stats')
        .then((r) => {
          if (r.status === 403) {
            setError('წვდომა აკრძალულია');
            return null;
          }
          return r.json();
        })
        .then((d) => d && setStats(d.stats))
        .catch(() => setError('მონაცემების ჩატვირთვა ვერ მოხერხდა'));
    }
  }, [status, router]);

  if (error) {
    return (
      <div className="max-w-lg mx-auto py-16 text-center">
        <div className="bg-white rounded-2xl border border-red-200 p-8">
          <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-7 h-7 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">{error}</h2>
          <p className="text-gray-500 text-sm">მხოლოდ ადმინისტრატორს აქვს წვდომა ამ გვერდზე.</p>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="w-8 h-8 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const cards = [
    { label: 'სულ მომხმარებლები', value: stats.totalUsers, color: 'bg-blue-50 text-blue-700', iconBg: 'bg-blue-100' },
    { label: 'დღეს დარეგისტრირებული', value: stats.todayUsers, color: 'bg-green-50 text-green-700', iconBg: 'bg-green-100' },
    { label: 'სულ გამოთვლები', value: stats.totalCalculations, color: 'bg-purple-50 text-purple-700', iconBg: 'bg-purple-100' },
    { label: 'აქტიური მომხმარებლები', value: stats.activeUsers, color: 'bg-amber-50 text-amber-700', iconBg: 'bg-amber-100' },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900">დეშბორდი</h1>
        <p className="text-sm text-gray-500 mt-1">მოგესალმებით, {session?.user?.name || 'ადმინ'}</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {cards.map((card) => (
          <div key={card.label} className={`rounded-xl p-4 ${card.color}`}>
            <p className="text-xs font-medium opacity-75 mb-1">{card.label}</p>
            <p className="text-2xl font-bold">{card.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
