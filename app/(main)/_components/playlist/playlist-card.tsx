'use client';

import { useSong } from '@/hooks/use-song-store';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { memo } from 'react';

interface PlaylistCardProps {
  id: string;
  name: string;
}

const PlaylistCard = ({ id, name }: PlaylistCardProps) => {
  const { playlistId, setPlaylistId } = useSong();

  if (!playlistId) {
    setPlaylistId(id);
  }

  return (
    <div
      className={cn(
        'group flex w-full cursor-pointer items-center justify-start gap-2 rounded-sm transition-all delay-100 ease-linear',
        playlistId === id
          ? 'bg-emerald-900 hover:bg-emerald-800/80'
          : 'bg-secondary hover:bg-secondary/80'
      )}
      onClick={() => setPlaylistId(id)}
    >
      <div className='relative h-10 w-10'>
        <Image
          src='/assets/images/default-img.webp'
          alt={name}
          className='rounded-sm object-cover'
          fill
        />
      </div>
      <p
        className={cn(
          'text-xs font-semibold truncate capitalize group-hover:scale-105',
          playlistId === id
            ? 'text-white font-semibold'
            : 'text-neutral-400 group-hover:text-white group-hover:font-semibold'
        )}
      >
        {name}
      </p>
    </div>
  );
};

export default memo(PlaylistCard);
