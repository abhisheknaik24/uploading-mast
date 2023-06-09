import { addCurrentSongId } from '@/redux/song/songSlice';
import { RootState } from '@/redux/store';
import { ISong } from '@/types/types';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';

const LibrarySongDetails: React.FC<ISong> = ({
  _id,
  title,
  desc,
  author,
  thumbnail,
  audio,
}) => {
  const dispatch = useDispatch();

  const currentSong: ISong | null = useSelector(
    (state: RootState) => state.song.currentSong
  );

  return (
    <div
      className={`flex w-full cursor-pointer items-center justify-start gap-2 rounded-sm transition-all delay-100 ease-linear hover:scale-105 ${
        currentSong?._id === _id &&
        'animate-pulse bg-green-800/50 hover:bg-green-800'
      }`}
      onClick={() => dispatch(addCurrentSongId(_id))}
    >
      <div className='relative h-10 w-10'>
        <Image
          src={process.env.NEXT_PUBLIC_API + '/images/' + thumbnail}
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
