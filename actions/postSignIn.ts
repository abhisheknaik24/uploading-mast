import { axiosInstance } from '@/lib/axios';

interface IUser {
  password: string;
}

export const postSignIn = async ({ password }: IUser) => {
  if (!password) {
    throw new Error('Request body is missing!');
  }

  const res = await axiosInstance.post('/user', {
    password,
  });

  if (res.status !== 200) {
    throw new Error('Network response was not ok!');
  }

  if (!res.data.status) {
    throw new Error(res.data.message);
  }

  return res.data.message;
};
