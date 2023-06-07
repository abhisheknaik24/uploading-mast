'use client';

import { RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { ICurrentSong } from '@/types/types';
import PanelControls from './PanelControls';
import { updateSongMute, updateSongPlay } from '@/redux/song/songSlice';

const Panel: React.FC = () => {
  const dispatch = useDispatch();

  const currentSong: ICurrentSong | null = useSelector(
    (state: RootState) => state.song.currentSong
  );

  const handleUpdateSongPlay = () => {
    dispatch(updateSongPlay());
  };

  const handleupdateSongMute = () => {
    dispatch(updateSongMute());
  };

  if (currentSong) {
    return (
      <div className='fixed bottom-0 left-0 right-0 z-10 w-full bg-black px-6 py-4'>
        <div className='grid grid-cols-2 place-content-center place-items-center md:grid-cols-3'>
          <PanelControls
            id={currentSong.id}
            title={currentSong.title}
            desc={currentSong.desc}
            author={currentSong.author}
            thumbnail={currentSong.thumbnail}
            audioLink={currentSong.audioLink}
            liked={currentSong.liked}
            isPlay={currentSong.isPlay}
            isMute={currentSong.isMute}
            handleUpdateSongPlay={handleUpdateSongPlay}
            handleupdateSongMute={handleupdateSongMute}
          />
        </div>
      </div>
    );
  }

  return null;
};

export default Panel;
