import bcrypt from 'bcryptjs';

export interface StoredUser {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
  role: 'user' | 'admin';
  createdAt: string;
  calculationsUsed: number;
  stripeCustomerId?: string;
  lastLoginAt?: string;
}

const users = new Map<string, StoredUser>();

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@nutritiolog.ge';

let idCounter = 0;
function generateId(): string {
  idCounter += 1;
  return `user_${Date.now()}_${idCounter}`;
}

export async function createUser(email: string, name: string, password: string): Promise<StoredUser> {
  const existing = getUserByEmail(email);
  if (existing) {
    throw new Error('USER_EXISTS');
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const id = generateId();
  const user: StoredUser = {
    id,
    email: email.toLowerCase().trim(),
    name: name.trim(),
    passwordHash,
    role: email.toLowerCase() === ADMIN_EMAIL.toLowerCase() ? 'admin' : 'user',
    createdAt: new Date().toISOString(),
    calculationsUsed: 0,
  };

  users.set(id, user);
  return user;
}

export async function verifyUser(email: string, password: string): Promise<StoredUser | null> {
  const user = getUserByEmail(email);
  if (!user) return null;

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return null;

  user.lastLoginAt = new Date().toISOString();
  return user;
}

export function getUserByEmail(email: string): StoredUser | undefined {
  for (const user of users.values()) {
    if (user.email === email.toLowerCase().trim()) return user;
  }
  return undefined;
}

export function getUserById(id: string): StoredUser | undefined {
  return users.get(id);
}

export function getAllUsers(): StoredUser[] {
  return Array.from(users.values());
}

export function incrementUserCalculations(userId: string): number {
  const user = users.get(userId);
  if (!user) return 0;
  user.calculationsUsed += 1;
  return user.calculationsUsed;
}

export function getStats() {
  const allUsers = getAllUsers();
  const totalCalculations = allUsers.reduce((sum, u) => sum + u.calculationsUsed, 0);
  const today = new Date().toISOString().split('T')[0];
  const todayUsers = allUsers.filter((u) => u.createdAt.startsWith(today)).length;

  return {
    totalUsers: allUsers.length,
    todayUsers,
    totalCalculations,
    activeUsers: allUsers.filter((u) => u.calculationsUsed > 0).length,
  };
}
