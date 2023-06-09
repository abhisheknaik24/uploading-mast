import { IUser } from '@/types/types';

export const signUp = async ({
  firstName,
  lastName,
  email,
  password,
}: IUser) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/signUp`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    }),
  });

  return res.json();
};
