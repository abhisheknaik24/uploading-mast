import { axiosInstance } from '@/lib/axios';

export const getPlaylists = async () => {
  const res = await axiosInstance.get('/playlist');

  if (res.status !== 200) {
    throw new Error('Network response was not ok!');
  }

  if (!res.data.status) {
    throw new Error(res.data.message);
  }

  return res.data.data;
};
