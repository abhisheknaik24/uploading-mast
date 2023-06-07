'use client';

import { ISong } from '@/types/types';
import { RootState } from '@/redux/store';
import SongCardDetails from './SongCardDetails';
import { useSelector } from 'react-redux';

const SongCard: React.FC = () => {
  const songs: ISong[] = useSelector((state: RootState) => state.song.songs);

  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-5'>
      {songs.map((song) => (
        <SongCardDetails
          key={song.id}
          id={song.id}
          title={song.title}
          desc={song.desc}
          author={song.author}
          thumbnail={song.thumbnail}
          audio={song.audio}
          liked={song.liked}
        />
      ))}
    </div>
  );
};

export default SongCard;
