'use client';

import { useEffect } from 'react';

import Box from '@/components/box/Box';
import Header from '@/components/header/Header';
import { IPlaylist, ISong } from '@/types/types';
import { addCurrentPlaylist, addSongs } from '@/redux/song/songSlice';
import dynamic from 'next/dynamic';
import { getSongs } from '@/actions/getSongs';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const Playlist = dynamic(() => import('@/components/playlist/Playlist'), {
  loading: () => (
    <div className='h-16 w-full animate-pulse rounded-sm bg-neutral-500/50'></div>
  ),
  ssr: false,
});

const SongCard = dynamic(() => import('@/components/songCard/SongCard'), {
  loading: () => (
    <div className='grid h-full w-full animate-pulse grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-5'>
      <div className='h-56 w-full rounded-sm bg-neutral-500/50'></div>
      <div className='h-56 w-full rounded-sm bg-neutral-500/50'></div>
      <div className='h-56 w-full rounded-sm bg-neutral-500/50'></div>
      <div className='h-56 w-full rounded-sm bg-neutral-500/50'></div>
      <div className='h-56 w-full rounded-sm bg-neutral-500/50'></div>
      <div className='h-56 w-full rounded-sm bg-neutral-500/50'></div>
      <div className='h-56 w-full rounded-sm bg-neutral-500/50'></div>
      <div className='h-56 w-full rounded-sm bg-neutral-500/50'></div>
      <div className='h-56 w-full rounded-sm bg-neutral-500/50'></div>
      <div className='h-56 w-full rounded-sm bg-neutral-500/50'></div>
    </div>
  ),
  ssr: false,
});

const Home = () => {
  const dispatch = useDispatch();

  const currentPlaylist: IPlaylist = useSelector(
    (state: RootState) => state.song.currentPlaylist
  );

  const handlePlaylist = (category: string, label: string) => {
    dispatch(addCurrentPlaylist({ category: category, label: label }));
  };

  useEffect(() => {
    const fetchSongs = async () => {
      const songs: ISong[] = await getSongs({
        category: currentPlaylist.category,
      });

      dispatch(addSongs(songs));
    };

    fetchSongs();
  }, [currentPlaylist, dispatch]);

  const playlist: IPlaylist[] = [
    {
      category: 'newest-songs',
      image:
        'https://images.unsplash.com/photo-1682687221323-6ce2dbc803ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80',
      label: 'Newest Songs',
    },
    {
      category: 'liked-songs',
      image:
        'https://images.unsplash.com/photo-1682687221323-6ce2dbc803ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80',
      label: 'Liked Songs',
    },
    {
      category: 'popular-songs',
      image:
        'https://images.unsplash.com/photo-1682687221323-6ce2dbc803ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80',
      label: 'Popular Songs',
    },
  ];

  return (
    <div className='h-full w-full overflow-y-auto'>
      <Box className='min-h-full'>
        <Header>
          <div>
            <div>
              <h1 className='mb-6 text-4xl font-bold'>Welcome Back</h1>
            </div>
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3'>
              {playlist.map((i) => (
                <Playlist
                  key={i.label}
                  category={i.category}
                  image={i.image}
                  label={i.label}
                  handlePlaylist={handlePlaylist}
                />
              ))}
            </div>
          </div>
        </Header>
        <div className='p-4'>
          <div className='flex h-full w-full flex-col items-start justify-start gap-4'>
            <div>
              <h3 className='text-2xl font-bold'>Newest Songs</h3>
            </div>
            <div className='w-full'>
              <SongCard />
            </div>
          </div>
        </div>
      </Box>
    </div>
  );
};

export default Home;
