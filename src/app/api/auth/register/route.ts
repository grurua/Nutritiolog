import { createUser } from '@/lib/userStore';

export async function POST(request: Request) {
  try {
    const { email, name, password } = await request.json();

    if (!email || !name || !password) {
      return Response.json({ error: 'ყველა ველი სავალდებულოა' }, { status: 400 });
    }

    if (password.length < 6) {
      return Response.json({ error: 'პაროლი მინიმუმ 6 სიმბოლო უნდა იყოს' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json({ error: 'არასწორი ელ-ფოსტის ფორმატი' }, { status: 400 });
    }

    const user = await createUser(email, name, password);

    return Response.json({
      id: user.id,
      email: user.email,
      name: user.name,
    });
  } catch (error: unknown) {
    if (error instanceof Error && error.message === 'USER_EXISTS') {
      return Response.json({ error: 'ეს ელ-ფოსტა უკვე რეგისტრირებულია' }, { status: 409 });
    }
    return Response.json({ error: 'რეგისტრაცია ვერ მოხერხდა' }, { status: 500 });
  }
}
