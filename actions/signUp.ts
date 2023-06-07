import { IUser } from '@/types/types';

export const signUp = async ({
  firstname,
  lastname,
  email,
  password,
}: IUser) => {
  // const res = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/signIn`, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({ email: email, password: password }),
  // });

  // const data = await res.json();

  // if (data.status) {
  //   return data.data;
  // }

  // return null;

  return { token: 'uploading-mast' };
};
