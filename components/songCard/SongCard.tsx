'use client';

import { RootState } from '@/redux/store';
import { ISong } from '@/types/types';
import { useSelector } from 'react-redux';
import SongCardDetails from './SongCardDetails';

const SongCard: React.FC = () => {
  const songs: ISong[] = useSelector((state: RootState) => state.song.songs);

  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-5'>
      {songs &&
        songs.map((song) => (
          <SongCardDetails
            key={song._id}
            _id={song._id}
            title={song.title}
            desc={song.desc}
            author={song.author}
            thumbnail={song.thumbnail}
            audio={song.audio}
          />
        ))}
    </div>
  );
};

export default SongCard;
