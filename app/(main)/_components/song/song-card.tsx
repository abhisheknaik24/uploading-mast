'use client';

import { Button } from '@/components/ui/button';
import { useSong } from '@/hooks/use-song-store';
import { cn } from '@/lib/utils';
import { Play } from 'lucide-react';
import Image from 'next/image';
import { memo } from 'react';

interface SongCardProps {
  id: string;
  playlistId: string;
  title: string;
  description: string;
  author: string;
  thumbnail: string;
  audio: string;
}

const SongCard = ({
  id,
  playlistId,
  title,
  description,
  author,
  thumbnail,
  audio,
}: SongCardProps) => {
  const { songId, setSongId } = useSong();

  return (
    <div
      className={cn(
        'group flex w-full cursor-pointer flex-col items-start justify-start gap-4 p-4 transition-all delay-100 ease-linear hover:scale-[1.025]',
        songId === id
          ? 'animate-pulse bg-green-800/50 hover:bg-green-800'
          : 'bg-neutral-800/50 hover:bg-neutral-800'
      )}
    >
      <div className='relative h-24 w-full sm:h-40'>
        <Image
          src={thumbnail || '/assets/images/default-img.webp'}
          alt={title}
          className='rounded-sm object-cover'
          fill
        />
        {songId !== id && (
          <Button
            type='button'
            className='invisible h-12 w-12 absolute bottom-1 right-1 p-0 rounded-full hover:scale-105 group-hover:visible'
            variant='success'
            onClick={() => setSongId(id)}
          >
            <Play className='ml-1' size={20} strokeWidth={3} fill='#fff' />
          </Button>
        )}
      </div>
      <div className='w-full flex flex-col items-start justify-start gap-1'>
        <h3 className='truncate w-[-webkit-fill-available] text-sm font-medium capitalize text-white'>
          {title}
        </h3>
        <p className='truncate w-[-webkit-fill-available] text-xs capitalize text-neutral-100/50'>
          {author}
        </p>
      </div>
    </div>
  );
};

export default memo(SongCard);
