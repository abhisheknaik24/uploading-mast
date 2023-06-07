'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import Box from '@/components/box/Box';
import Header from '@/components/header/Header';
import dynamic from 'next/dynamic';
import { getSearchSongs } from '@/actions/getSearchSongs';
import { useEffect, useState } from 'react';
import { ISong } from '@/types/types';

const Input = dynamic(() => import('@/components/input/Input'), {
  loading: () => (
    <div className='h-12 w-full animate-pulse rounded-sm bg-neutral-500/50'></div>
  ),
  ssr: false,
});

const SongList = dynamic(() => import('@/components/songList/SongList'), {
  loading: () => (
    <div className='grid animate-pulse grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3'>
      <div className='h-16 w-full rounded-sm bg-neutral-500/50'></div>
      <div className='h-16 w-full rounded-sm bg-neutral-500/50'></div>
      <div className='h-16 w-full rounded-sm bg-neutral-500/50'></div>
      <div className='h-16 w-full rounded-sm bg-neutral-500/50'></div>
      <div className='h-16 w-full rounded-sm bg-neutral-500/50'></div>
      <div className='h-16 w-full rounded-sm bg-neutral-500/50'></div>
      <div className='h-16 w-full rounded-sm bg-neutral-500/50'></div>
      <div className='h-16 w-full rounded-sm bg-neutral-500/50'></div>
      <div className='h-16 w-full rounded-sm bg-neutral-500/50'></div>
      <div className='h-16 w-full rounded-sm bg-neutral-500/50'></div>
      <div className='h-16 w-full rounded-sm bg-neutral-500/50'></div>
      <div className='h-16 w-full rounded-sm bg-neutral-500/50'></div>
    </div>
  ),
  ssr: false,
});

const Home = async () => {
  const [songs, setSongs] = useState<ISong[]>([]);

  const pathname = usePathname();

  const router = useRouter();

  const searchParams = useSearchParams()!;

  const search = searchParams.get('search');

  useEffect(() => {
    const fetchSearchSongs = async () => {
      const songs: ISong[] = await getSearchSongs({ search: search });

      setSongs(songs);
    };

    fetchSearchSongs();
  }, [search]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    router.push(`${pathname}?search=${e.target.value}`);
  };

  return (
    <div className='h-full w-full'>
      <Box className='min-h-full'>
        <Header>
          <div>
            <h1 className='mb-6 text-4xl font-bold'>Search</h1>
          </div>
          <div>
            <Input
              type='text'
              id='search'
              name='search'
              className='h-12'
              placeholder='What do you want to listen to?'
              onChange={handleChange}
            />
          </div>
        </Header>
        <div className='p-4'>{songs && <SongList songs={songs} />}</div>
      </Box>
    </div>
  );
};

export default Home;
