'use client';

import { addCurrentSongId } from '@/redux/song/songSlice';
import { ISong } from '@/types/types';
import Image from 'next/image';
import { useDispatch } from 'react-redux';

const SongListDetails: React.FC<ISong> = ({
  _id,
  title,
  desc,
  author,
  thumbnail,
  audio,
}) => {
  const dispatch = useDispatch();

  return (
    <div
      className='flex w-full cursor-pointer items-center justify-start gap-4 p-2 transition-all delay-100 ease-linear hover:scale-105'
      onClick={() => dispatch(addCurrentSongId(_id))}
    >
      <div className='relative h-16 w-16'>
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
      </div>
      <div className='flex flex-col items-start justify-start gap-1'>
        <h3 className='text-sm font-medium capitalize text-white'>{title}</h3>
        <p className='truncate text-xs text-neutral-100/50'>{author}</p>
      </div>
    </div>
  );
};

export default SongListDetails;
