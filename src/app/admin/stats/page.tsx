'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

interface Stats {
  totalUsers: number;
  todayUsers: number;
  totalCalculations: number;
  activeUsers: number;
}

interface UserRow {
  name: string;
  calculationsUsed: number;
}

export default function AdminStatsPage() {
  const { status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState<Stats | null>(null);
  const [topUsers, setTopUsers] = useState<UserRow[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin?callbackUrl=/admin/stats');
      return;
    }
    if (status === 'authenticated') {
      Promise.all([
        fetch('/api/admin?type=stats').then((r) => {
          if (r.status === 403) throw new Error('forbidden');
          return r.json();
        }),
        fetch('/api/admin?type=users').then((r) => r.json()),
      ])
        .then(([statsData, usersData]) => {
          setStats(statsData.stats);
          const sorted = (usersData.users || [])
            .sort((a: UserRow, b: UserRow) => b.calculationsUsed - a.calculationsUsed)
            .slice(0, 10);
          setTopUsers(sorted);
        })
        .catch(() => setError('წვდომა აკრძალულია'));
    }
  }, [status, router]);

  if (error) {
    return (
      <div className="max-w-lg mx-auto py-16 text-center">
        <div className="bg-white rounded-2xl border border-red-200 p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-2">{error}</h2>
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

  const conversionRate = stats.totalUsers > 0
    ? Math.round((stats.activeUsers / stats.totalUsers) * 100)
    : 0;

  const avgCalcs = stats.activeUsers > 0
    ? (stats.totalCalculations / stats.activeUsers).toFixed(1)
    : '0';

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900">სტატისტიკა</h1>
        <p className="text-sm text-gray-500 mt-1">დეტალური ანალიტიკა</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500 mb-1">კონვერსია</p>
          <p className="text-2xl font-bold text-emerald-700">{conversionRate}%</p>
          <p className="text-xs text-gray-400 mt-1">რეგისტრაცია → გამოთვლა</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500 mb-1">საშუალო გამოთვლები</p>
          <p className="text-2xl font-bold text-blue-700">{avgCalcs}</p>
          <p className="text-xs text-gray-400 mt-1">აქტიურ მომხმარებელზე</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 col-span-2 lg:col-span-1">
          <p className="text-xs text-gray-500 mb-1">დღეს რეგისტრაცია</p>
          <p className="text-2xl font-bold text-purple-700">{stats.todayUsers}</p>
          <p className="text-xs text-gray-400 mt-1">ახალი მომხმარებელი</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-900">ტოპ მომხმარებლები</h2>
        </div>
        <div className="divide-y divide-gray-50">
          {topUsers.map((u, i) => (
            <div key={i} className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-3">
                <span className="text-xs font-medium text-gray-400 w-5">#{i + 1}</span>
                <span className="text-sm text-gray-900">{u.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full"
                    style={{
                      width: `${topUsers[0]?.calculationsUsed ? (u.calculationsUsed / topUsers[0].calculationsUsed) * 100 : 0}%`,
                    }}
                  />
                </div>
                <span className="text-xs font-medium text-gray-600 w-8 text-right">{u.calculationsUsed}</span>
              </div>
            </div>
          ))}
          {topUsers.length === 0 && (
            <p className="text-center text-gray-400 py-8 text-sm">მონაცემები არ არის</p>
          )}
        </div>
      </div>
    </div>
  );
}
