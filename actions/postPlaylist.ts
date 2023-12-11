import { axiosInstance } from '@/lib/axios';

interface IPlaylist {
  name: string;
}

export const postPlaylist = async ({ name }: IPlaylist) => {
  if (!name) {
    throw new Error('Request body is missing!');
  }

  const res = await axiosInstance.post('/playlist', { name });

  if (res.status !== 200) {
    throw new Error('Network response was not ok!');
  }

  if (!res.data.status) {
    throw new Error(res.data.message);
  }

  return res.data.message;
};
