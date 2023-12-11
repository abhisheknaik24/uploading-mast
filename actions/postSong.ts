import { axiosInstance } from '@/lib/axios';

interface ISong {
  playlistId: string;
  title: string;
  description?: string;
  author: string;
  thumbnail?: string;
  audio: string;
}

export const postSong = async ({
  playlistId,
  title,
  description,
  author,
  thumbnail,
  audio,
}: ISong) => {
  if (!playlistId || !title || !author || !audio) {
    throw new Error('Request body is missing!');
  }

  const res = await axiosInstance.post(`/playlist/${playlistId}/song`, {
    title,
    description,
    author,
    thumbnail,
    audio,
  });

  if (res.status !== 200) {
    throw new Error('Network response was not ok!');
  }

  if (!res.data.status) {
    throw new Error(res.data.message);
  }

  return res.data.message;
};
