import { useDispatch, useSelector } from 'react-redux';

import { ISong } from '@/types/types';
import Image from 'next/image';
import { RootState } from '@/redux/store';
import { addCurrentSongId } from '@/redux/song/songSlice';

interface LibrarySongDetailsProps {
  id: string;
  title: string;
  desc: string;
  author: string;
  thumbnail: string;
  audio: string;
  liked?: boolean;
}

const LibrarySongDetails: React.FC<LibrarySongDetailsProps> = ({
  id,
  title,
  desc,
  author,
  thumbnail,
  audio,
  liked,
}) => {
  const dispatch = useDispatch();

  const currentSong: ISong | null = useSelector(
    (state: RootState) => state.song.currentSong
  );

  return (
    <div
      className={`flex w-full cursor-pointer items-center justify-start gap-2 rounded-sm transition-all delay-100 ease-linear hover:scale-105 ${
        currentSong?.id === id &&
        'animate-pulse bg-green-800/50 hover:bg-green-800'
      }`}
      onClick={() => dispatch(addCurrentSongId(id))}
    >
      <div className='relative h-10 w-10'>
        <Image
          src={thumbnail}
          alt={title}
          className='rounded-sm object-cover'
          fill
        />
      </div>
      <div>
        <h3 className='text-xs font-medium capitalize text-neutral-300 hover:font-semibold hover:text-white'>
          {title}
        </h3>
      </div>
    </div>
  );
};

export default LibrarySongDetails;
