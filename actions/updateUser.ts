import { axiosInstance } from '@/lib/axios';

interface IUser {
  userId: string;
  currentPassword?: string;
  newPassword?: string;
  picture?: string;
}

export const updateUser = async ({
  userId,
  currentPassword,
  newPassword,
  picture,
}: IUser) => {
  if (!userId) {
    throw new Error('Request body is missing!');
  }

  const res = await axiosInstance.patch(`/user/${userId}`, {
    currentPassword,
    newPassword,
    picture,
  });

  if (res.status !== 200) {
    throw new Error('Network response was not ok!');
  }

  if (!res.data.status) {
    throw new Error(res.data.message);
  }

  return res.data.message;
};
