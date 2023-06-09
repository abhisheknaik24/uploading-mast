'use client';

import { getLibrarySongs } from '@/actions/getLibrarySongs';
import { addLibrarySongs } from '@/redux/song/songSlice';
import { RootState } from '@/redux/store';
import { IResponse, ISong } from '@/types/types';
import { useEffect } from 'react';
import { TbPlaylist } from 'react-icons/tb';
import { useDispatch, useSelector } from 'react-redux';
import LibrarySongList from './LibrarySongList';

const Library = () => {
  const dispatch = useDispatch();

  const token: string | null = useSelector(
    (state: RootState) => state.user.token
  );

  const librarySongs: ISong[] = useSelector(
    (state: RootState) => state.song.librarySongs
  );

  useEffect(() => {
    if (token) {
      const fetchLibrarySongs = async () => {
        const data: IResponse = await getLibrarySongs({ token: token });

        if (data.success && data.data.librarySongs.length > 0) {
          dispatch(addLibrarySongs(data.data.librarySongs));
        }
      };

      fetchLibrarySongs();
    } else {
      dispatch(addLibrarySongs([]));
    }
  }, [dispatch, token]);

  return (
    <div className='flex h-full w-full flex-col items-start justify-start gap-4'>
      <div className='flex w-full items-center justify-start text-neutral-400'>
        <div className='flex items-center justify-start gap-2'>
          <TbPlaylist size={25} />
          <p className='text-sm font-semibold'>My Library</p>
        </div>
      </div>
      <div>
        {token && librarySongs && (
          <LibrarySongList librarySongs={librarySongs} />
        )}
      </div>
    </div>
  );
};

export default Library;
