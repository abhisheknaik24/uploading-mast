import { IUser } from '@/types/types';

export const signIn = async ({ email, password }: IUser) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/signIn`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: email, password: password }),
  });

  return res.json();
};
