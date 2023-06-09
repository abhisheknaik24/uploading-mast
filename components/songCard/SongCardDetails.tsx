'use client';

import { addSongToLibrary } from '@/actions/addSongToLibrary';
import { addCurrentSongId, addLibrarySongs } from '@/redux/song/songSlice';
import { RootState } from '@/redux/store';
import { IResponse, ISong } from '@/types/types';
import Image from 'next/image';
import { BsPlayFill, BsPlus } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../button/Button';

const SongCardDetails: React.FC<ISong> = ({
  _id,
  title,
  desc,
  author,
  thumbnail,
  audio,
}) => {
  const dispatch = useDispatch();

  const token: string | null = useSelector(
    (state: RootState) => state.user.token
  );

  const currentSong: ISong | null = useSelector(
    (state: RootState) => state.song.currentSong
  );

  const handleAddSongToLibrary = async () => {
    if (token) {
      const data: IResponse = await addSongToLibrary({ token: token, id: _id });

      if (data.success && data.data.librarySongs.length > 0) {
        dispatch(addLibrarySongs(data.data.librarySongs));
      }
    }
  };

  return (
    <div
      className={`group flex w-full cursor-pointer flex-col items-start justify-start gap-4 p-4 transition-all delay-100 ease-linear hover:scale-105 ${
        token && currentSong?._id === _id
          ? 'animate-pulse bg-green-800/50 hover:bg-green-800'
          : 'bg-neutral-800/50 hover:bg-neutral-800'
      }`}
    >
      {token && (
        <Button
          type='button'
          className='invisible absolute bottom-0 right-0 flex items-center justify-center p-2 text-white transition-all delay-100 ease-linear hover:scale-110 group-hover:visible'
          onClick={handleAddSongToLibrary}
        >
          <BsPlus size={30} />
        </Button>
      )}
      <div className='relative h-80 w-full sm:h-40'>
        <Image
          src={
            thumbnail
              ? process.env.NEXT_PUBLIC_API + '/images/' + thumbnail
              : '/assets/images/default-img.webp'
          }
          alt={title}
          className='rounded-sm object-cover'
          fill
        />
        {token && currentSong?._id !== _id && (
          <Button
            type='button'
            className='invisible absolute bottom-1 right-1 flex items-center justify-center rounded-full bg-green-500 p-2 transition-all delay-100 ease-linear hover:scale-105 hover:bg-green-400 group-hover:visible'
            onClick={() => dispatch(addCurrentSongId(_id))}
          >
            <BsPlayFill size={30} />
          </Button>
        )}
      </div>
      <div className='flex flex-col items-start justify-start gap-1'>
        <h3 className='text-sm font-medium capitalize text-white'>{title}</h3>
        <p className='truncate text-xs text-neutral-100/50'>{author}</p>
      </div>
    </div>
  );
};

export default SongCardDetails;
