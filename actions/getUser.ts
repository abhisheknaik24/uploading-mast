import { axiosInstance } from '@/lib/axios';

interface IUser {
  userId: string;
}

export const getUser = async ({ userId }: IUser) => {
  if (!userId) {
    throw new Error('Request params is missing!');
  }

  const res = await axiosInstance.get(`/user/${userId}`);

  if (res.status !== 200) {
    throw new Error('Network response was not ok!');
  }

  if (!res.data.status) {
    throw new Error(res.data.message);
  }

  return res.data.data;
};
