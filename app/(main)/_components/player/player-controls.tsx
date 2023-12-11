'use client';

import { useSong } from '@/hooks/use-song-store';
import {
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from 'lucide-react';
import Image from 'next/image';
import { memo, useEffect, useState } from 'react';
import useSound from 'use-sound';
import { Button } from '../../../../components/ui/button';

interface PlayerControlsProps {
  id: string;
  title: string;
  desc: string;
  author: string;
  thumbnail: string;
  audio: string;
  previousSongId: string | null;
  nextSongId: string | null;
}

const PlayerControls = ({
  id,
  title,
  desc,
  author,
  thumbnail,
  audio,
  previousSongId,
  nextSongId,
}: PlayerControlsProps) => {
  const { setSongId } = useSong();

  const [isPlaying, setPlaying] = useState<boolean>(false);

  const [volume, setVolume] = useState<0 | 1>(1);

  const [play, { sound, pause }] = useSound(audio, {
    volume: volume,
    format: ['mp3'],
    onplay: () => setPlaying(true),
    onpause: () => setPlaying(false),
    onend: () => {
      setPlaying(false);
    },
  });

  useEffect(() => {
    setTimeout(() => {
      sound?.play();
    }, 1000);

    return () => {
      sound?.unload();
    };
  }, [sound]);

  return (
    <>
      <div className='w-full'>
        <div className='flex w-full cursor-pointer items-center justify-start gap-4 p-2'>
          <div className='relative h-16 w-16 transition-all delay-100 ease-linear hover:scale-105'>
            <Image
              src={thumbnail || '/assets/images/default-img.webp'}
              alt={title}
              className='rounded-sm object-cover'
              fill
            />
          </div>
          <div className='flex flex-col items-start justify-start gap-1'>
            <h3 className='text-sm font-medium capitalize text-white'>
              {title}
            </h3>
            <p className='truncate text-xs capitalize text-neutral-100/50'>
              {author}
            </p>
          </div>
        </div>
      </div>
      <div className='flex items-center justify-center gap-4'>
        {previousSongId ? (
          <Button
            type='button'
            className='rounded-full'
            variant='secondary'
            size='icon'
            onClick={() => setSongId(previousSongId)}
          >
            <SkipBack size={20} strokeWidth={3} />
          </Button>
        ) : (
          <Button
            type='button'
            className='rounded-full'
            variant='secondary'
            size='icon'
            disabled
          >
            <SkipBack size={20} strokeWidth={3} />
          </Button>
        )}
        <Button
          type='button'
          className='h-12 w-12 p-2 rounded-full'
          variant='secondary'
          size='icon'
          onClick={() => {
            isPlaying ? pause() : play();
          }}
        >
          {isPlaying ? (
            <Pause className='ml-[2px]' size={25} fill='#fff' />
          ) : (
            <Play className='ml-1' size={25} fill='#fff' />
          )}
        </Button>
        {nextSongId ? (
          <Button
            type='button'
            className='rounded-full'
            variant='secondary'
            size='icon'
            onClick={() => setSongId(nextSongId)}
          >
            <SkipForward size={20} strokeWidth={3} />
          </Button>
        ) : (
          <Button
            type='button'
            className='rounded-full'
            variant='secondary'
            size='icon'
            disabled
          >
            <SkipForward size={20} strokeWidth={3} />
          </Button>
        )}
      </div>
      <div className='flex items-center justify-center'>
        <Button
          type='button'
          className='rounded-full'
          variant='secondary'
          size='icon'
          onClick={() => setVolume((prev) => (prev === 1 ? 0 : 1))}
        >
          {volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </Button>
      </div>
    </>
  );
};

export default memo(PlayerControls);
