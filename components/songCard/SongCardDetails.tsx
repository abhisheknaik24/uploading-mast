'use client';

import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';

import { BsPlayFill } from 'react-icons/bs';
import { ISong } from '@/types/types';
import Image from 'next/image';
import { RootState } from '@/redux/store';
import { addCurrentSongId } from '@/redux/song/songSlice';
import { postSongLike } from '@/actions/postSongLike';

interface SongCardDetailsProps {
  id: string;
  title: string;
  desc: string;
  author: string;
  thumbnail: string;
  audio: string;
  liked?: boolean;
}

const SongCardDetails: React.FC<SongCardDetailsProps> = ({
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
      className={`group flex w-full cursor-pointer flex-col items-start justify-start gap-4 p-4 transition-all delay-100 ease-linear hover:scale-105 ${
        currentSong?.id === id
          ? 'animate-pulse bg-green-800/50 hover:bg-green-800'
          : 'bg-neutral-800/50 hover:bg-neutral-800'
      }`}
    >
      <button
        className={`invisible absolute bottom-0 right-0 flex items-center justify-center p-2 transition-all delay-100 ease-linear hover:scale-105 group-hover:visible ${
          liked ? 'text-red-700' : 'text-white'
        }`}
        onClick={() => postSongLike({ id: id })}
      >
        {liked ? <AiFillHeart size={30} /> : <AiOutlineHeart size={30} />}
      </button>
      <div className='relative h-80 w-full sm:h-40'>
        <Image
          src={thumbnail}
          alt={title}
          className='rounded-sm object-cover'
          fill
        />
        {currentSong?.id !== id && (
          <button
            className='invisible absolute bottom-1 right-1 flex items-center justify-center rounded-full bg-green-500 p-2 transition-all delay-100 ease-linear hover:scale-105 hover:bg-green-400 group-hover:visible'
            onClick={() => dispatch(addCurrentSongId(id))}
          >
            <BsPlayFill size={30} />
          </button>
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
