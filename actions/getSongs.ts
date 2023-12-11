import { axiosInstance } from '@/lib/axios';

interface ISong {
  playlistId: string;
  search?: string | null;
  page: number;
}

export const getSongs = async ({ playlistId, search, page }: ISong) => {
  if (!playlistId) {
    throw new Error('Request params is missing!');
  }

  const res = await axiosInstance.get(`/playlist/${playlistId}/song`, {
    params: { search, page },
  });

  if (res.status !== 200) {
    throw new Error('Network response was not ok!');
  }

  if (!res.data.status) {
    throw new Error(res.data.message);
  }

  return res.data.data;
};
