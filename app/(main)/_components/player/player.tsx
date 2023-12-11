'use client';

import { getSong } from '@/actions/getSong';
import { Skeleton } from '@/components/ui/skeleton';
import { useSong } from '@/hooks/use-song-store';
import { memo } from 'react';
import { useQuery } from 'react-query';
import PlayerControls from './player-controls';

const Player = () => {
  const { playlistId, songId } = useSong();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['song', playlistId, songId],
    queryFn: ({ queryKey }) =>
      getSong({
        playlistId: queryKey[1] as string,
        songId: queryKey[2] as string,
      }),
    enabled: !!playlistId && !!songId,
  });

  if (isLoading) {
    return (
      <Skeleton className='h-20 w-full fixed bottom-0 left-0 right-0 z-10' />
    );
  }

  if (isError) {
    return null;
  }

  if (!playlistId || !songId || !data) {
    return null;
  }

  return (
    <div className='fixed bottom-0 left-0 right-0 z-10 h-20 w-full bg-black px-6'>
      <div className='grid grid-cols-2 place-content-center place-items-center md:grid-cols-3'>
        <PlayerControls
          previousSongId={data.previousSongId}
          nextSongId={data.nextSongId}
          {...data.song}
        />
      </div>
    </div>
  );
};

export default memo(Player);
