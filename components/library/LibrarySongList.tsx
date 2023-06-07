import { ISong } from '@/types/types';
import LibrarySongDetails from './LibrarySongDetails';

interface LibrarySongListProps {
  songs: ISong[];
}

const LibrarySongList: React.FC<LibrarySongListProps> = ({ songs }) => {
  return (
    <div className='grid grid-cols-1 gap-4'>
      {songs.map((song) => (
        <LibrarySongDetails
          key={song.id}
          title={song.title}
          desc={song.desc}
          author={song.author}
          thumbnail={song.thumbnail}
          audioLink={song.audioLink}
          liked={song.liked}
        />
      ))}
    </div>
  );
};

export default LibrarySongList;
