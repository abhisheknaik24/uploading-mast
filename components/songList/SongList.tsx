import { ISong } from '@/types/types';
import SongListDetails from './SongListDetails';

interface SongListProps {
  songs: ISong[];
}

const SongList: React.FC<SongListProps> = ({ songs }) => {
  return (
    <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3'>
      {songs.map((song) => (
        <SongListDetails
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

export default SongList;
