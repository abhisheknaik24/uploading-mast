'use client';

import { RootState } from '@/redux/store';
import { ISong } from '@/types/types';
import { useSelector } from 'react-redux';
import PlayerControls from './PlayerControls';

const Player: React.FC = () => {
  const token: string | null = useSelector(
    (state: RootState) => state.user.token
  );

  const currentSong: ISong | null = useSelector(
    (state: RootState) => state.song.currentSong
  );

  const previousSong: ISong | null = useSelector(
    (state: RootState) => state.song.previousSong
  );

  const nextSong: ISong | null = useSelector(
    (state: RootState) => state.song.nextSong
  );

  if (token && currentSong) {
    return (
      <div className='fixed bottom-0 left-0 right-0 z-10 w-full bg-black px-6 py-1'>
        <div className='grid grid-cols-2 place-content-center place-items-center md:grid-cols-3'>
          <PlayerControls
            currentSong={currentSong}
            previousSong={previousSong}
            nextSong={nextSong}
          />
        </div>
      </div>
    );
  }

  return null;
};

export default Player;
