import { axiosInstance } from '@/lib/axios';

interface ISong {
  playlistId: string;
  songId: string;
}

export const getSong = async ({ playlistId, songId }: ISong) => {
  if (!playlistId || !songId) {
    throw new Error('Request params is missing!');
  }

  const res = await axiosInstance.get(`/playlist/${playlistId}/song/${songId}`);

  if (res.status !== 200) {
    throw new Error('Network response was not ok!');
  }

  if (!res.data.status) {
    throw new Error(res.data.message);
  }

  return res.data.data;
};
