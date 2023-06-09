import { ISong } from '@/types/types';
import LibrarySongDetails from './LibrarySongDetails';

interface LibrarySongListProps {
  librarySongs: ISong[];
}

const LibrarySongList: React.FC<LibrarySongListProps> = ({ librarySongs }) => {
  return (
    <div className='grid grid-cols-1 gap-4'>
      {librarySongs.map((librarySong) => (
        <LibrarySongDetails
          key={librarySong._id}
          _id={librarySong._id}
          title={librarySong.title}
          desc={librarySong.desc}
          author={librarySong.author}
          thumbnail={librarySong.thumbnail}
          audio={librarySong.audio}
        />
      ))}
    </div>
  );
};

export default LibrarySongList;
