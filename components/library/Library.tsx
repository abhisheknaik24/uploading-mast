'use client';

import { BsPlus } from 'react-icons/bs';
import LibrarySongList from './LibrarySongList';
import { TbPlaylist } from 'react-icons/tb';
import { getLibrarySongs } from '@/actions/getLibrarySongs';
import { use, useCallback, useEffect, useState } from 'react';
import { ISong } from '@/types/types';

const Library = () => {
  const [songs, setSongs] = useState<ISong[]>([]);

  const fetchLibrarySongs = useCallback(async () => {
    const librarySongs: ISong[] = await getLibrarySongs();

    setSongs(librarySongs);
  }, []);

  useEffect(() => {
    fetchLibrarySongs();
  }, []);

  return (
    <div className='flex h-full w-full flex-col items-start justify-start gap-4'>
      <div className='flex w-full items-center justify-between text-neutral-400'>
        <div className='flex items-center justify-start gap-2'>
          <TbPlaylist size={25} />
          <p className='text-sm font-semibold'>Your Library</p>
        </div>
        <button className='hover:scale-110'>
          <BsPlus size={30} />
        </button>
      </div>
      <div>{songs && <LibrarySongList songs={songs} />}</div>
    </div>
  );
};

export default Library;
