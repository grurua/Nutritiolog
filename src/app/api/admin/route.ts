import { auth } from '@/lib/auth';
import { getAllUsers, getStats, getUserByEmail } from '@/lib/userStore';

async function isAdmin(): Promise<boolean> {
  const session = await auth();
  if (!session?.user?.email) return false;
  const user = getUserByEmail(session.user.email);
  return user?.role === 'admin';
}

export async function GET(request: Request) {
  if (!(await isAdmin())) {
    return Response.json({ error: 'Unauthorized' }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') || 'stats';

  if (type === 'users') {
    const users = getAllUsers().map((u) => ({
      id: u.id,
      email: u.email,
      name: u.name,
      role: u.role,
      createdAt: u.createdAt,
      calculationsUsed: u.calculationsUsed,
      lastLoginAt: u.lastLoginAt,
    }));
    return Response.json({ users });
  }

  const stats = getStats();
  return Response.json({ stats });
}
