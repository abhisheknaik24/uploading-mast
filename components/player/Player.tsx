'use client';

import { ISong } from '@/types/types';
import PlayerControls from './PlayerControls';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';

const Player: React.FC = () => {
  const currentSong: ISong | null = useSelector(
    (state: RootState) => state.song.currentSong
  );

  if (currentSong) {
    return (
      <div className='fixed bottom-0 left-0 right-0 z-10 w-full bg-black px-6 py-1'>
        <div className='grid grid-cols-2 place-content-center place-items-center md:grid-cols-3'>
          <PlayerControls currentSong={currentSong} />
        </div>
      </div>
    );
  }

  return null;
};

export default Player;
