'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

interface UserRow {
  id: string;
  email: string;
  name: string;
  role: string;
  createdAt: string;
  calculationsUsed: number;
  lastLoginAt?: string;
}

export default function AdminUsersPage() {
  const { status } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState<UserRow[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin?callbackUrl=/admin/users');
      return;
    }
    if (status === 'authenticated') {
      fetch('/api/admin?type=users')
        .then((r) => {
          if (r.status === 403) {
            setError('წვდომა აკრძალულია');
            return null;
          }
          return r.json();
        })
        .then((d) => d && setUsers(d.users || []))
        .catch(() => setError('მონაცემების ჩატვირთვა ვერ მოხერხდა'))
        .finally(() => setLoading(false));
    }
  }, [status, router]);

  if (error) {
    return (
      <div className="max-w-lg mx-auto py-16 text-center">
        <div className="bg-white rounded-2xl border border-red-200 p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-2">{error}</h2>
          <p className="text-gray-500 text-sm">მხოლოდ ადმინისტრატორს აქვს წვდომა.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="w-8 h-8 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">მომხმარებლები</h1>
          <p className="text-sm text-gray-500 mt-1">სულ {users.length} მომხმარებელი</p>
        </div>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {users.map((u) => (
          <div key={u.id} className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 text-sm font-medium">
                  {u.name[0]?.toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{u.name}</p>
                  <p className="text-xs text-gray-500">{u.email}</p>
                </div>
              </div>
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                  u.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600'
                }`}
              >
                {u.role === 'admin' ? 'ადმინი' : 'მომხმარებელი'}
              </span>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-3 pt-3 border-t border-gray-100">
              <span>გამოთვლები: {u.calculationsUsed}</span>
              <span>{new Date(u.createdAt).toLocaleDateString('ka-GE')}</span>
            </div>
          </div>
        ))}
        {users.length === 0 && (
          <p className="text-center text-gray-400 py-8">მომხმარებლები არ არის</p>
        )}
      </div>

      {/* Desktop table */}
      <div className="hidden md:block bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">სახელი</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">ელ-ფოსტა</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">როლი</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">გამოთვლები</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">რეგისტრაცია</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 text-xs font-medium">
                      {u.name[0]?.toUpperCase()}
                    </div>
                    <span className="text-sm font-medium text-gray-900">{u.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">{u.email}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      u.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {u.role === 'admin' ? 'ადმინი' : 'მომხმარებელი'}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">{u.calculationsUsed}</td>
                <td className="px-4 py-3 text-sm text-gray-500">{new Date(u.createdAt).toLocaleDateString('ka-GE')}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {users.length === 0 && (
          <p className="text-center text-gray-400 py-8">მომხმარებლები არ არის</p>
        )}
      </div>
    </div>
  );
}
